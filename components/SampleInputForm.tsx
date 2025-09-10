import React, { useState } from 'react';
import { SampleData, Metal } from '../types';
import { AVAILABLE_METALS } from '../constants';

interface SampleInputFormProps {
  onAddSample: (sample: SampleData) => void;
}

const SampleInputForm: React.FC<SampleInputFormProps> = ({ onAddSample }) => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [concentrations, setConcentrations] = useState<Record<Metal, string>>({
    Pb: '', As: '', Hg: '', Cd: '', Cr: '', Ni: '', Zn: '', Fe: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lon)) {
      alert('Please enter valid latitude and longitude.');
      return;
    }
    
    const numericConcentrations: Record<Metal, number | undefined> = {} as Record<Metal, number | undefined>;
    let hasConcentration = false;
    for (const metal of AVAILABLE_METALS) {
        const val = parseFloat(concentrations[metal]);
        if (!isNaN(val) && val > 0) { // Only add if it's a valid positive number
            numericConcentrations[metal] = val;
            hasConcentration = true;
        }
    }
    
    if (!hasConcentration) {
        alert('Please enter at least one metal concentration.');
        return;
    }

    const newSample: SampleData = {
      id: `manual-${Date.now()}`,
      latitude: lat,
      longitude: lon,
      concentrations: numericConcentrations,
    };

    onAddSample(newSample);
    
    // Reset form
    setLatitude('');
    setLongitude('');
    setConcentrations({ Pb: '', As: '', Hg: '', Cd: '', Cr: '', Ni: '', Zn: '', Fe: '' });
  };

  const handleConcentrationChange = (metal: Metal, value: string) => {
    setConcentrations(prev => ({ ...prev, [metal]: value }));
  };

  return (
    <div className="bg-white p-8 rounded-lg w-full">
      <h3 className="text-xl font-bold mb-1 text-slate-800">Add Sample Manually</h3>
       <p className="text-sm text-slate-500 mb-6">Enter the coordinates and metal concentrations for a single sample.</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
             <label className="block text-sm font-medium text-slate-600 mb-2">Coordinates</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="number" value={latitude} onChange={e => setLatitude(e.target.value)} required step="any" className="w-full bg-slate-50 border border-slate-300 rounded-md p-2.5 text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500" placeholder="Latitude, e.g., 28.6139" />
                <input type="number" value={longitude} onChange={e => setLongitude(e.target.value)} required step="any" className="w-full bg-slate-50 border border-slate-300 rounded-md p-2.5 text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500" placeholder="Longitude, e.g., 77.2090" />
            </div>
        </div>
        <div>
            <label className="text-sm font-medium text-slate-600 mb-2 block">Metal Concentrations (mg/L)</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {AVAILABLE_METALS.map(metal => (
                <div key={metal}>
                  <label htmlFor={metal} className="block text-xs font-medium text-slate-500 mb-1">{metal}</label>
                  <input type="number" id={metal} value={concentrations[metal]} onChange={e => handleConcentrationChange(metal, e.target.value)} step="any" min="0" className="w-full bg-slate-50 border border-slate-300 rounded-md p-2 text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500" placeholder="0.00" />
                </div>
              ))}
            </div>
        </div>
        <button type="submit" className="w-full bg-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-purple-500 transition duration-150 shadow-sm">
          Add Sample
        </button>
      </form>
    </div>
  );
};

export default SampleInputForm;