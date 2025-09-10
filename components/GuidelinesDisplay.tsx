import React from 'react';

const GuidelinesDisplay: React.FC = () => {
  return (
    <div className="bg-white border border-slate-200/80 p-6 rounded-xl shadow-lg shadow-slate-900/5">
      <h2 className="text-lg font-semibold mb-4 text-slate-800 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        How to Use This Tool
      </h2>
      <div className="space-y-4 text-slate-600 text-sm">
        <p>
          This application automates the computation of Heavy Metal Pollution Indices (HMPI) for groundwater analysis.
        </p>
        <ol className="list-decimal list-inside space-y-2 pl-2">
          <li>
            <strong>Select a Standard:</strong> Choose a regulatory standard (e.g., WHO, BIS) to assess your data against.
          </li>
          <li>
            <strong>Provide Data:</strong> Use the buttons in the header to:
            <ul className="list-disc list-inside ml-4 mt-1 text-slate-500">
              <li><strong>Upload a CSV file:</strong> The file must contain headers: `latitude`, `longitude`, and columns for metal concentrations (e.g., `Pb`, `As`, `Cd`).</li>
              <li><strong>Enter manually:</strong> Use the form to add one sample at a time.</li>
            </ul>
          </li>
          <li>
            <strong>Review Results:</strong> The tool will calculate HPI, HEI, and Cd. View the detailed reports, plot samples on the map, or get an AI-powered summary.
          </li>
        </ol>
      </div>
    </div>
  );
};

export default GuidelinesDisplay;