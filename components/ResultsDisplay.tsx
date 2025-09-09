import React, { useMemo } from 'react';
import { AnalysisResult, Metal, QualityClass } from '../types';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from 'react-leaflet';
import {
    HPI_CLASSIFICATION, HEI_CLASSIFICATION, CD_CLASSIFICATION, getQualityClass,
    QUALITY_INFO, AVAILABLE_METALS
} from '../constants';

type View = 'reports' | 'map' | 'ai';

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
    const mapCenter: [number, number] = useMemo(() => {
        if (results.length > 0) {
            const latitudes = results.map(r => r.sample.latitude);
            const longitudes = results.map(r => r.sample.longitude);
            const avgLat = latitudes.reduce((a, b) => a + b, 0) / latitudes.length;
            const avgLon = longitudes.reduce((a, b) => a + b, 0) / longitudes.length;
            return [avgLat, avgLon];
        }
        return [20.5937, 78.9629]; // Default to India center
    }, [results]);

    const getQualityInfoForMap = (result: AnalysisResult) => {
        const value = result.indices.hpi;
        const classification = HPI_CLASSIFICATION;
        const quality = getQualityClass(value, classification);
        return { quality, color: QUALITY_INFO[quality].mapColor };
    };

    return (
        <div className="h-[600px] w-full bg-gray-200 rounded-lg overflow-hidden border border-gray-300 shadow-inner">
            <MapContainer center={mapCenter} zoom={results.length > 1 ? 5 : 10} style={{ height: '100%', width: '100%' }}>
                <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'/>
                {results.map(result => {
                        const { quality, color } = getQualityInfoForMap(result);
                    return (
                    <CircleMarker
                        key={result.sample.id}
                        center={[result.sample.latitude, result.sample.longitude]}
                        radius={8}
                        pathOptions={{ color: 'white', weight: 1.5, fillColor: color, fillOpacity: 0.9 }}
                    >
                            <Tooltip>{`ID: ${result.sample.id.substring(result.sample.id.length - 4)} | HPI: ${result.indices.hpi} | Quality: ${quality}`}</Tooltip>
                            <Popup>
                                <div className="text-gray-800">
                                    <h4 className="font-bold">Sample ID: {result.sample.id.substring(result.sample.id.length - 4)}</h4>
                                    <p><strong>Coords:</strong> {result.sample.latitude.toFixed(4)}, {result.sample.longitude.toFixed(4)}</p>
                                    <p><strong>HPI:</strong> {result.indices.hpi}</p>
                                    <p><strong>HEI:</strong> {result.indices.hei}</p>
                                    <p><strong>Cd:</strong> {result.indices.cd}</p>
                                </div>
                            </Popup>
                    </CircleMarker>
                    );
                })}
            </MapContainer>
        </div>
    );
};

const AiAnalysisView: React.FC<{ geminiAnalysis: string, isLoading: boolean }> = ({ geminiAnalysis, isLoading }) => {
    return (
        <div className="prose prose-sm max-w-none bg-white p-6 rounded-lg border border-gray-200 h-[600px] overflow-y-auto shadow-sm">
          {isLoading && geminiAnalysis === "" ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              <p className="ml-4 text-lg">Generating AI Analysis...</p>
            </div>
          ) : (
            <pre className="whitespace-pre-wrap font-sans text-gray-700">{geminiAnalysis}</pre>
          )}
        </div>
    );
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, geminiAnalysis, isLoading, activeView }) => {
  const renderContent = () => {
    if (isLoading && results.length === 0) {
      return (
        <div className="flex flex-col justify-center items-center h-64 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          <p className="ml-4 text-lg mt-4 text-gray-600">Calculating Indices...</p>
        </div>
      );
    }

    if (results.length === 0) {
      return (
          <div className="text-center text-gray-500 py-10 px-6 bg-white rounded-lg border-2 border-dashed border-gray-300">
              <h3 className="text-lg font-semibold text-gray-800">No Data to Display</h3>
              <p>Upload a file or add a sample to begin your analysis.</p>
          </div>
      );
    }

    switch(activeView) {
        case 'reports':
            return <ReportsView results={results} />;
        case 'map':
            return <MapViewComponent results={results} />;
        case 'ai':
            return <AiAnalysisView geminiAnalysis={geminiAnalysis} isLoading={isLoading} />;
        default:
            return <ReportsView results={results} />;
    }
  };

  return (
    <div>
        {renderContent()}
    </div>
  );
};

export default ResultsDisplay;
