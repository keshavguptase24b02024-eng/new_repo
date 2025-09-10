
import React, { useMemo, useRef, useState, useCallback } from 'react';
import { AnalysisResult, Metal, QualityClass } from '../types';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from 'react-leaflet';
import {
    HPI_CLASSIFICATION, HEI_CLASSIFICATION, CD_CLASSIFICATION, getQualityClass,
    QUALITY_INFO, AVAILABLE_METALS
} from '../constants';


// Tell TypeScript about the global variables from the CDN scripts
declare var marked: {
    parse(markdownString: string): string;
};
declare var jspdf: {
    jsPDF: new (options?: any) => any;
};
declare var html2canvas: (element: HTMLElement, options?: any) => Promise<HTMLCanvasElement>;

type View = 'reports' | 'map' | 'ai';
type MapMetric = 'hpi' | 'hei' | 'cd' | Metal.As | Metal.Fe;

interface ResultsDisplayProps {
  results: AnalysisResult[];
  geminiAnalysis: string;
  isLoading: boolean;
  activeView: View;
}

const ReportCard: React.FC<{result: AnalysisResult}> = ({result}) => {
    const { sample, indices } = result;
    const qualityClass = getQualityClass(indices.hpi, HPI_CLASSIFICATION);
    const qualityInfo = QUALITY_INFO[qualityClass];

    return (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 mb-4 flex flex-col md:flex-row items-start md:items-center justify-between transition-shadow hover:shadow-lg">
            <div className="flex-grow w-full md:w-auto">
                <h3 className="font-bold text-gray-800 text-lg">Sample_{sample.id.substring(sample.id.length - 4)}</h3>
                <p className="text-sm text-gray-500 mb-3 font-mono">{sample.latitude.toFixed(4)}, {sample.longitude.toFixed(4)}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-2 text-sm">
                    {AVAILABLE_METALS.map(metal => (
                        <div key={metal} className="flex justify-between border-b border-gray-100 py-1">
                            <span className="font-semibold text-gray-600">{metal}</span>
                            <span className="text-gray-800">{sample.concentrations[metal]?.toFixed(3) ?? '0.00'} <span className="text-gray-400">mg/L</span></span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex-shrink-0 mt-4 md:mt-0 md:ml-6 text-center w-full md:w-auto">
                <div className="text-5xl font-bold text-gray-700">{indices.hpi.toFixed(1)}</div>
                <div className={`mt-2 px-3 py-1 text-xs font-bold rounded-full inline-block ${qualityInfo.className}`}>
                    {qualityInfo.text}
                </div>
                 <div className="text-xs text-gray-500 mt-2 font-mono">
                    <span>HEI: {indices.hei.toFixed(2)}</span> | <span>Cd: {indices.cd.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};


const ReportsView: React.FC<{results: AnalysisResult[]}> = ({ results }) => (
    <div>
        {results.map(result => <ReportCard key={result.sample.id} result={result} />)}
    </div>
);

const MapViewComponent: React.FC<{results: AnalysisResult[]}> = ({ results }) => {
    const [mapMetric, setMapMetric] = useState<MapMetric>('hpi');
    
    const mapCenter: [number, number] = [20.5937, 78.9629]; // Default to India center

    const metricDomains = useMemo(() => {
        const metrics: Record<MapMetric, number[]> = {
            hpi: [], hei: [], cd: [], As: [], Fe: []
        };
        results.forEach(r => {
            metrics.hpi.push(r.indices.hpi);
            metrics.hei.push(r.indices.hei);
            metrics.cd.push(r.indices.cd);
            if (r.sample.concentrations.As) metrics.As.push(r.sample.concentrations.As);
            if (r.sample.concentrations.Fe) metrics.Fe.push(r.sample.concentrations.Fe);
        });

        const domains: Record<MapMetric, { min: number; max: number }> = {} as any;
        for (const key in metrics) {
            const metricKey = key as MapMetric;
            const values = metrics[metricKey];
            domains[metricKey] = {
                min: values.length > 0 ? Math.min(...values) : 0,
                max: values.length > 0 ? Math.max(...values) : 1,
            };
        }
        return domains;
    }, [results]);

    const getColor = useCallback((value: number, domain: {min: number, max: number}) => {
        const { min, max } = domain;
        const range = max - min;
        if (range === 0 || value <= min) return '#22c55e'; // Green for no range or min value

        const ratio = (value - min) / range;
        if (ratio < 0.25) return '#22c55e'; // Excellent (Green)
        if (ratio < 0.5) return '#eab308';  // Fair (Yellow)
        if (ratio < 0.75) return '#f97316';  // Poor (Orange)
        return '#ef4444'; // Very Poor/Unsuitable (Red)
    }, []);
    
    const metricLabels: Record<MapMetric, string> = {
        hpi: 'HPI (Pollution Index)',
        hei: 'HEI (Evaluation Index)',
        cd: 'Cd (Contamination Index)',
        As: 'Arsenic (As) mg/L',
        Fe: 'Iron (Fe) mg/L'
    };
    
    const currentDomain = metricDomains[mapMetric];

    return (
        <div className="h-[600px] w-full bg-gray-200 rounded-lg overflow-hidden border border-gray-300 shadow-inner relative">
            <MapContainer center={mapCenter} zoom={5} style={{ height: '100%', width: '100%' }}>
                <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'/>
                {results.map(result => {
                    let value: number;
                    if (mapMetric === 'hpi' || mapMetric === 'hei' || mapMetric === 'cd') {
                        value = result.indices[mapMetric];
                    } else {
                        value = result.sample.concentrations[mapMetric] ?? 0;
                    }
                    const color = getColor(value, currentDomain);

                    return (
                        <CircleMarker
                            key={result.sample.id}
                            center={[result.sample.latitude, result.sample.longitude]}
                            radius={5}
                            pathOptions={{ color: 'white', weight: 0.5, fillColor: color, fillOpacity: 0.8 }}
                        >
                            <Tooltip>{`${metricLabels[mapMetric]}: ${value.toFixed(3)}`}</Tooltip>
                            <Popup>
                                <div className="text-gray-800 -m-1">
                                    <h4 className="font-bold p-2 bg-gray-100 rounded-t-sm">Sample: {result.sample.id.replace('preloaded-','')}</h4>
                                    <div className="p-2 space-y-1 text-xs">
                                      <p><strong>Coords:</strong> {result.sample.latitude.toFixed(4)}, {result.sample.longitude.toFixed(4)}</p>
                                      <hr className="my-1"/>
                                      <p><strong>HPI:</strong> {result.indices.hpi.toFixed(2)}</p>
                                      <p><strong>HEI:</strong> {result.indices.hei.toFixed(2)}</p>
                                      <p><strong>Cd:</strong> {result.indices.cd.toFixed(2)}</p>
                                      <hr className="my-1"/>
                                      {Object.entries(result.sample.concentrations).map(([metal, val]) => (
                                          <p key={metal}><strong>{metal}:</strong> {val?.toFixed(4)} mg/L</p>
                                      ))}
                                    </div>
                                </div>
                            </Popup>
                        </CircleMarker>
                    );
                })}
            </MapContainer>
            
            <div className="absolute top-2 right-2 z-[1000] bg-white bg-opacity-80 backdrop-blur-sm p-2 rounded-md shadow-lg">
                <label htmlFor="metric-select" className="block text-xs font-medium text-gray-700 mb-1">Metric</label>
                <select id="metric-select" value={mapMetric} onChange={e => setMapMetric(e.target.value as MapMetric)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-xs py-1 pl-2 pr-8">
                    {Object.keys(metricLabels).map(key => (
                        <option key={key} value={key}>{metricLabels[key as MapMetric]}</option>
                    ))}
                </select>
            </div>
            
            <div className="absolute bottom-2 left-2 z-[1000] bg-white bg-opacity-80 backdrop-blur-sm p-2 rounded-md shadow-lg text-xs w-40">
                <p className="font-bold text-center mb-1">{metricLabels[mapMetric]}</p>
                <div className="flex w-full h-3 rounded-sm overflow-hidden">
                    <div className="w-1/4 h-full bg-green-500"></div>
                    <div className="w-1/4 h-full bg-yellow-500"></div>
                    <div className="w-1/4 h-full bg-orange-500"></div>
                    <div className="w-1/4 h-full bg-red-500"></div>
                </div>
                <div className="flex justify-between mt-1 text-gray-600">
                    <span>{currentDomain.min.toFixed(2)}</span>
                    <span>{currentDomain.max.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};

const AiAnalysisView: React.FC<{ geminiAnalysis: string; isLoading: boolean }> = ({ geminiAnalysis, isLoading }) => {
  const reportContentRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    const element = reportContentRef.current;
    if (!element) return;

    setIsDownloading(true);
    try {
      const { jsPDF } = jspdf;
      const pdf = new jsPDF({ orientation: 'p', unit: 'px', format: 'a4' });

      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      
      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = canvasWidth / canvasHeight;
      const canvasHeightInPdf = pdfWidth / ratio;
      
      let heightLeft = canvasHeightInPdf;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, canvasHeightInPdf);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position -= pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, canvasHeightInPdf);
        heightLeft -= pdfHeight;
      }
      
      pdf.save('aqua-assess-ai-report.pdf');
    } catch (error) {
        console.error("Failed to generate PDF:", error);
        alert("Sorry, there was an error generating the PDF.");
    } finally {
        setIsDownloading(false);
    }
  };
  
  const formattedHtml = useMemo(() => {
    if (typeof marked !== 'undefined' && geminiAnalysis) {
        return marked.parse(geminiAnalysis);
    }
    return '';
  }, [geminiAnalysis]);

  const hasContent = !isLoading && !!geminiAnalysis && !geminiAnalysis.toLowerCase().startsWith("error") && !geminiAnalysis.toLowerCase().startsWith("an error occurred");

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col h-[600px]">
      <div className="p-4 flex justify-between items-center border-b border-gray-200 flex-shrink-0">
        <h3 className="font-semibold text-gray-800">AI Analysis Report</h3>
        <button
            onClick={handleDownloadPDF}
            disabled={!hasContent || isDownloading}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-colors text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          {isDownloading ? (
                <svg className="animate-spin h-4 w-4 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
          )}
          <span>{isDownloading ? 'Downloading...' : 'Download PDF'}</span>
        </button>
      </div>
      <div ref={reportContentRef} className="prose prose-sm max-w-none p-4 overflow-y-auto flex-grow">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="text-center">
              <svg className="animate-spin h-8 w-8 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              <p className="mt-2 text-gray-500">Generating AI analysis...</p>
            </div>
          </div>
        ) : hasContent ? (
          <div dangerouslySetInnerHTML={{ __html: formattedHtml }} />
        ) : (
          <div className="flex justify-center items-center h-full">
            <div className="text-center text-gray-500">
              <p>No data available for analysis.</p>
              <p className="text-sm">Please upload or enter sample data to generate a report.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


// FIX: Add the ResultsDisplay component to act as a view switcher and export it as default.
const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, geminiAnalysis, isLoading, activeView }) => {
  if (activeView === 'map') {
    return <MapViewComponent results={results} />;
  }

  if (activeView === 'ai') {
    return <AiAnalysisView geminiAnalysis={geminiAnalysis} isLoading={isLoading} />;
  }

  return (
    <ReportsView results={results} />
  );
};

export default ResultsDisplay;
