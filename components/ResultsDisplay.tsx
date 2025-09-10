import React, { useMemo, useRef, useState } from 'react';
import { AnalysisResult, Metal } from '../types';
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

const ReportCard: React.FC<{result: AnalysisResult}> = ({result}) => {
    const { sample, indices } = result;
    const qualityClass = getQualityClass(indices.hpi, HPI_CLASSIFICATION);
    const qualityInfo = QUALITY_INFO[qualityClass];
    
    const relevantMetals = AVAILABLE_METALS.filter(metal => sample.concentrations[metal] !== undefined && sample.concentrations[metal]! > 0);

    return (
        <div className="bg-white rounded-xl shadow-lg shadow-slate-900/5 border border-slate-200/80 p-5 mb-4 transition-shadow hover:shadow-xl hover:-translate-y-0.5">
           <div className="flex items-start justify-between">
                <div>
                    <h3 className="font-bold text-slate-800 text-lg">Sample_{sample.id.substring(sample.id.length - 4)}</h3>
                    <p className="text-sm text-slate-500 font-mono">{sample.latitude.toFixed(4)}, {sample.longitude.toFixed(4)}</p>
                </div>
                <div className={`px-2.5 py-0.5 text-xs font-bold rounded-full border ${qualityInfo.className}`}>
                    {qualityInfo.text}
                </div>
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                <div className="space-y-2">
                     <div className="flex justify-between items-baseline">
                        <span className="font-semibold text-slate-500">HPI</span>
                        <span className="font-bold text-2xl text-purple-600">{indices.hpi.toFixed(1)}</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="text-slate-500">HEI</span>
                        <span className="font-medium text-slate-700">{indices.hei.toFixed(2)}</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="text-slate-500">Cd</span>
                        <span className="font-medium text-slate-700">{indices.cd.toFixed(2)}</span>
                    </div>
                </div>
                <div className="space-y-1 pt-2 border-t border-slate-100 sm:border-none sm:pt-0">
                    {relevantMetals.length > 0 ? relevantMetals.map(metal => (
                        <div key={metal} className="flex justify-between">
                            <span className="text-slate-500">{metal}</span>
                            <span className="font-mono text-slate-700">{sample.concentrations[metal]?.toFixed(4)} mg/L</span>
                        </div>
                    )) : <p className="text-slate-400 text-xs italic text-center pt-2">No heavy metals recorded.</p>}
                </div>
            </div>
        </div>
    );
};


export const ReportsView: React.FC<{results: AnalysisResult[]}> = ({ results }) => (
    <div>
        {results.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {results.map(result => <ReportCard key={result.sample.id} result={result} />)}
            </div>
        ) : (
             <div className="flex justify-center items-center py-20">
                <div className="text-center text-slate-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  <p className="mt-2 font-semibold">No Reports Available</p>
                  <p className="text-sm">Please upload or enter sample data to generate reports.</p>
                </div>
            </div>
        )}
    </div>
);

type MapMetric = 'hpi' | 'hei' | 'cd' | Metal.As | Metal.Fe | 'none';

export const MapView: React.FC<{results: AnalysisResult[]}> = ({ results }) => {
    const [selectedMetric, setSelectedMetric] = useState<MapMetric>('none');

    const mapCenter: [number, number] = useMemo(() => {
        if (results.length > 0) {
            const latitudes = results.map(r => r.sample.latitude);
            const longitudes = results.map(r => r.sample.longitude);
            return [
                latitudes.reduce((a, b) => a + b, 0) / latitudes.length,
                longitudes.reduce((a, b) => a + b, 0) / longitudes.length
            ];
        }
        return [20.5937, 78.9629]; // Default to India
    }, [results]);

    const metalRanges = useMemo(() => {
        if (!results || results.length === 0) return {};
        const asValues = results.map(r => r.sample.concentrations[Metal.As]).filter(v => v !== undefined) as number[];
        const feValues = results.map(r => r.sample.concentrations[Metal.Fe]).filter(v => v !== undefined) as number[];
        return {
            [Metal.As]: { min: Math.min(...asValues), max: Math.max(...asValues) },
            [Metal.Fe]: { min: Math.min(...feValues), max: Math.max(...feValues) },
        }
    }, [results]);

    const getColorForMetric = (result: AnalysisResult, metric: MapMetric): string => {
        if (metric === 'none') return '#22c55e';

        if (metric === 'hpi') return QUALITY_INFO[getQualityClass(result.indices.hpi, HPI_CLASSIFICATION)].mapColor;
        if (metric === 'hei') return QUALITY_INFO[getQualityClass(result.indices.hei, HEI_CLASSIFICATION)].mapColor;
        if (metric === 'cd') return QUALITY_INFO[getQualityClass(result.indices.cd, CD_CLASSIFICATION)].mapColor;

        const concentration = result.sample.concentrations[metric as Metal];
        if (concentration === undefined) return '#9ca3af'; // gray for no data

        const range = metalRanges[metric as Metal];
        if (!range || range.max <= range.min) return '#22c55e';

        const ratio = (concentration - range.min) / (range.max - range.min);
        if (ratio < 0.33) return '#22c55e';
        if (ratio < 0.66) return '#facc15';
        return '#ef4444';
    };

    return (
        <div className="h-full w-full bg-slate-200 rounded-xl overflow-hidden border border-slate-200/80 shadow-lg shadow-slate-900/5 relative">
            <div className="absolute top-3 right-3 z-[1000] bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-lg border border-slate-200/60">
                <label htmlFor="metric-select" className="block text-xs font-medium text-slate-500 mb-1 px-1">Metric</label>
                <select
                    id="metric-select"
                    value={selectedMetric}
                    onChange={e => setSelectedMetric(e.target.value as MapMetric)}
                    className="w-48 bg-white border border-slate-300 rounded-md py-1.5 px-2 text-slate-800 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                >
                    <option value="none">All Samples (Green)</option>
                    <option value="hpi">HPI (Pollution Index)</option>
                    <option value="hei">HEI (Evaluation Index)</option>
                    <option value="cd">Cd (Contamination Index)</option>
                    <option value={Metal.As}>Arsenic (As) mg/L</option>
                    <option value={Metal.Fe}>Iron (Fe) mg/L</option>
                </select>
            </div>
            <MapContainer center={mapCenter} zoom={5} style={{ height: '100%', width: '100%' }}>
                <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'/>
                {results.map(result => {
                    const color = getColorForMetric(result, selectedMetric);
                    return (
                        <CircleMarker
                            key={result.sample.id}
                            center={[result.sample.latitude, result.sample.longitude]}
                            radius={6}
                            pathOptions={{ color: '#fff', weight: 1.5, fillColor: color, fillOpacity: 0.8 }}
                        >
                            <Tooltip>HPI: {result.indices.hpi.toFixed(2)}</Tooltip>
                            <Popup>
                                <div className="w-64 -m-3 text-slate-800">
                                    <div className="p-3 bg-slate-100 rounded-t-lg">
                                        <h4 className="font-semibold text-slate-800 text-base">Sample: {result.sample.id.split('-').pop()}</h4>
                                    </div>
                                    <div className="p-3 flex flex-col space-y-2 text-sm">
                                        <div className="flex justify-between"><span><strong>Coords:</strong></span><span className="font-mono text-slate-600">{result.sample.latitude.toFixed(4)}, {result.sample.longitude.toFixed(4)}</span></div>
                                        <div className="flex justify-between"><span><strong>HPI:</strong></span><span>{result.indices.hpi.toFixed(2)}</span></div>
                                        <div className="flex justify-between"><span><strong>HEI:</strong></span><span>{result.indices.hei.toFixed(2)}</span></div>
                                        <div className="flex justify-between"><span><strong>Cd:</strong></span><span>{result.indices.cd.toFixed(2)}</span></div>
                                        
                                        <hr className="!my-2 border-slate-200" />

                                        <div className="flex flex-col space-y-1 text-xs">
                                            {(() => {
                                                const relevantMetals = AVAILABLE_METALS.filter(metal => result.sample.concentrations[metal] !== undefined);
                                                if (relevantMetals.length > 0) {
                                                    return relevantMetals.map(metal => (
                                                        <div className="flex justify-between" key={metal}>
                                                            <span className="text-slate-500">{metal}:</span>
                                                            <span className="font-mono text-slate-600">{result.sample.concentrations[metal]?.toFixed(4)} mg/L</span>
                                                        </div>
                                                    ));
                                                }
                                                return <p className="text-slate-400 italic text-center pt-1">No concentration data.</p>;
                                            })()}
                                        </div>
                                    </div>
                                </div>
                            </Popup>
                        </CircleMarker>
                    );
                })}
            </MapContainer>
        </div>
    );
};


export const AiAnalysisView: React.FC<{ geminiAnalysis: string; isLoading: boolean }> = ({ geminiAnalysis, isLoading }) => {
  const reportContentRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    const element = reportContentRef.current;
    if (!element) return;

    setIsDownloading(true);
    try {
      const { jsPDF } = jspdf;
      const pdf = new jsPDF({ orientation: 'p', unit: 'px', format: 'a4' });

      const canvas = await html2canvas(element, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
      
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
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-lg shadow-slate-900/5">
      <div className="p-4 flex justify-between items-center border-b border-slate-200 flex-shrink-0">
        <h3 className="font-semibold text-slate-800">AI Analysis Report</h3>
        <button
            onClick={handleDownloadPDF}
            disabled={!hasContent || isDownloading}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-md transition-colors text-sm font-medium bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
        >
          {isDownloading ? (
                <svg className="animate-spin h-4 w-4 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
          )}
          <span>{isDownloading ? 'Downloading...' : 'Download PDF'}</span>
        </button>
      </div>
      <div className="prose prose-sm max-w-none p-6 prose-headings:font-semibold prose-headings:text-slate-800 prose-p:text-slate-600 prose-li:text-slate-600 prose-strong:text-slate-700">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <svg className="animate-spin h-8 w-8 text-purple-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              <p className="mt-3 text-slate-500 font-semibold">Generating AI analysis...</p>
              <p className="text-xs text-slate-400">This may take a moment.</p>
            </div>
          </div>
        ) : hasContent ? (
          <div ref={reportContentRef} dangerouslySetInnerHTML={{ __html: formattedHtml }} />
        ) : (
          <div className="flex justify-center items-center py-20">
            <div className="text-center text-slate-500">
               <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <p className="mt-2 font-semibold">No data for AI analysis</p>
              <p className="text-sm">Please upload or enter sample data to generate a report.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};