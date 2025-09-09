import React from 'react';

type View = 'reports' | 'map' | 'ai';

interface HeaderProps {
    activeView: View;
    setActiveView: (view: View) => void;
    onUploadClick: () => void;
    onManualClick: () => void;
}

const NavButton: React.FC<{
    icon: React.ReactNode;
    label: string;
    isActive?: boolean;
    onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
    <button 
        onClick={onClick}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
            isActive
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-200'
        }`}
    >
        {icon}
        <span>{label}</span>
    </button>
);


const Header: React.FC<HeaderProps> = ({ activeView, setActiveView, onUploadClick, onManualClick }) => {
  return (
    <header className="bg-white/80 backdrop-blur-sm p-3 sticky top-0 z-40 border-b border-gray-200">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-800 tracking-tight">
            Aqua-Assess
          </h1>
        </div>

        <div className="hidden md:flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
             <NavButton
                label="Reports"
                isActive={activeView === 'reports'}
                onClick={() => setActiveView('reports')}
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" /></svg>}
            />
            <NavButton
                label="Map View"
                isActive={activeView === 'map'}
                onClick={() => setActiveView('map')}
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>}
            />
             <NavButton
                label="AI Analysis"
                isActive={activeView === 'ai'}
                onClick={() => setActiveView('ai')}
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>}
            />
        </div>
        
        <div className="flex items-center space-x-2">
            <button onClick={onUploadClick} className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium text-gray-600 bg-gray-200 hover:bg-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                <span className="hidden sm:inline">Upload Data</span>
            </button>
             <button onClick={onManualClick} className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium text-blue-600 bg-blue-100 hover:bg-blue-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
                <span className="hidden sm:inline">Single Test</span>
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
