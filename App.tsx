
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Header from './components/Header';
import GuidelinesDisplay from './components/GuidelinesDisplay';
import DataUploader from './components/DataUploader';
import SampleInputForm from './components/SampleInputForm';
import StandardsEditor from './components/StandardsEditor';
import ResultsDisplay from './components/ResultsDisplay';
import { SampleData, Standard, AnalysisResult } from './types';
import { STANDARDS } from './constants';
import { calculateIndices } from './services/calculationService';
import { getAnalysisFromGemini } from './services/geminiService';
import HomePage from './components/HomePage';
import { PRELOADED_SAMPLES } from './services/preloadedData';

type View = 'reports' | 'map' | 'ai';

const App: React.FC = () => {
  const [sampleData, setSampleData] = useState<SampleData[]>(PRELOADED_SAMPLES);
  const dashboardVisible = sampleData.length > 0;
  const dashboardRef = useRef<HTMLDivElement>(null);

  const [activeView, setActiveView] = useState<View>('map');
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const [selectedStandard, setSelectedStandard] = useState<Standard>(STANDARDS.WHO);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [geminiAnalysis, setGeminiAnalysis] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showManualModal, setShowManualModal] = useState(false);

  const scrollToDashboard = useCallback(() => {
    setTimeout(() => {
      dashboardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }, []);

  const handleViewChange = (view: View) => {
    setActiveView(view);
    if (dashboardVisible) {
      scrollToDashboard();
    }
  };

  const handleUploadClick = () => {
    setShowUploadModal(true);
  };

  const handleManualClick = () => {
    setShowManualModal(true);
  };

  const processData = useCallback((data: SampleData[], standard: Standard) => {
    setIsLoading(true);
    setGeminiAnalysis('');
    
    const results: AnalysisResult[] = data.map(sample => ({
      sample,
      indices: calculateIndices(sample, standard),
    }));
    
    setAnalysisResults(results);
    
    getAnalysisFromGemini(results).then(analysis => {
      setGeminiAnalysis(analysis);
      setIsLoading(false);
    }).catch(err => {
        console.error("Gemini analysis failed", err);
        setGeminiAnalysis("Failed to load AI analysis.");
        setIsLoading(false);
    });

  }, []);

  useEffect(() => {
    if (sampleData.length > 0) {
      processData(sampleData, selectedStandard);
    } else {
        setAnalysisResults([]);
        setGeminiAnalysis('');
    }
  }, [sampleData, selectedStandard, processData]);

  const handleDataLoaded = (data: SampleData[]) => {
    setSampleData(data);
    setShowUploadModal(false);
  };
  
  const handleAddSample = (sample: SampleData) => {
      setSampleData(prevData => [...prevData, sample]);
      setShowManualModal(false);
  };
  
  const handleStandardChange = (standard: Standard) => {
      setSelectedStandard(standard);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
        <Header 
            activeView={activeView}
            setActiveView={handleViewChange}
            onUploadClick={handleUploadClick}
            onManualClick={handleManualClick}
        />
        
        {!dashboardVisible && <HomePage />}

        {dashboardVisible && (
            <div ref={dashboardRef}>
                <main className="container mx-auto p-4 lg:p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <aside className="lg:col-span-1 space-y-8">
                        <StandardsEditor selectedStandard={selectedStandard} onStandardChange={handleStandardChange}/>
                        <GuidelinesDisplay />
                        {errorMessage && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
                                <strong className="font-bold">Error: </strong>
                                <span className="block sm:inline">{errorMessage}</span>
                            </div>
                        )}
                    </aside>
                    <div className="lg:col-span-2">
                        <ResultsDisplay 
                            results={analysisResults} 
                            geminiAnalysis={geminiAnalysis} 
                            isLoading={isLoading} 
                            activeView={activeView}
                        />
                    </div>
                    </div>
                </main>
            </div>
        )}

        {/* Modals */}
        {showUploadModal && (
            <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
                <div className="bg-gray-50 p-1 rounded-lg shadow-xl relative w-full max-w-lg">
                    <button onClick={() => setShowUploadModal(false)} className="absolute -top-2 -right-2 text-white bg-gray-700 rounded-full h-8 w-8 flex items-center justify-center hover:bg-red-500 transition-colors z-10" aria-label="Close modal">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                    </button>
                    <DataUploader onDataLoaded={handleDataLoaded} setErrorMessage={setErrorMessage} />
                </div>
            </div>
        )}
        {showManualModal && (
                <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
                    <div className="bg-gray-50 p-1 rounded-lg shadow-xl relative w-full max-w-2xl">
                        <button onClick={() => setShowManualModal(false)} className="absolute -top-2 -right-2 text-white bg-gray-700 rounded-full h-8 w-8 flex items-center justify-center hover:bg-red-500 transition-colors z-10" aria-label="Close modal">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                        </button>
                        <SampleInputForm onAddSample={handleAddSample} />
                    </div>
                </div>
        )}
    </div>
  );
};

export default App;
