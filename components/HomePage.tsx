import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="bg-white text-gray-800">
      <main className="flex flex-col justify-center items-center text-center px-4 py-20 md:py-32">
        <div className="mb-6">
            <svg width="100" height="100" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="drop-gradient" x1="50%" y1="0%" x2="50%" y2="100%">
                        <stop offset="0%" stopColor="#6EE7B7" />
                        <stop offset="100%" stopColor="#10B981" />
                    </linearGradient>
                </defs>
                <path d="M32 2C19.7 2 10 11.7 10 24c0 10.3 11.2 21.3 20.2 28.5.8 1.1 2.7 1.1 3.5 0C42.8 45.3 54 34.3 54 24 54 11.7 44.3 2 32 2z" fill="url(#drop-gradient)"/>
                <circle cx="28" cy="20" r="4" fill="white" fillOpacity="0.3"/>
            </svg>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          <span style={{color: '#654321'}}>Assess Your Groundwater Quality</span>
          <br/>
          <span className="text-blue-600">with Confidence</span>
        </h1>

        <p className="max-w-xl mx-auto text-base md:text-lg text-gray-500 mb-8">
          Our platform provides comprehensive analysis and visualization of groundwater quality data, helping you make informed decisions.
        </p>
        
      </main>
    </div>
  );
};

export default HomePage;