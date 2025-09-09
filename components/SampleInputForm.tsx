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
    Pb: '', As: '', Hg: '', Cd: '', Cr: '', Ni: '', Zn: '',
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
        if (!isNaN(val)) {
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
    setConcentrations({ Pb: '', As: '', Hg: '', Cd: '', Cr: '', Ni: '', Zn: '' });
  };

  const handleConcentrationChange = (metal: Metal, value: string) => {
    setConcentrations(prev => ({ ...prev, [metal]: value }));
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-blue-600">Add Sample Manually</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
            <input type="number" id="latitude" value={latitude} onChange={e => setLatitude(e.target.value)} required step="any" className="w-full bg-gray-50 border border-gray-300 rounded-md p-2 text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., 28.6139" />
          </div>
          <div>
            <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
            <input type="number" id="longitude" value={longitude} onChange={e => setLongitude(e.target.value)} required step="any" className="w-full bg-gray-50 border border-gray-300 rounded-md p-2 text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., 77.2090" />
          </div>
        </div>
        <p className="text-sm font-medium text-gray-700">Metal Concentrations (mg/L)</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {AVAILABLE_METALS.map(metal => (
            <div key={metal}>
              <label htmlFor={metal} className="block text-xs font-medium text-gray-500 mb-1">{metal}</label>
              <input type="number" id={metal} value={concentrations[metal]} onChange={e => handleConcentrationChange(metal, e.target.value)} step="any" min="0" className="w-full bg-gray-50 border border-gray-300 rounded-md p-2 text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500" placeholder="0.00" />
            </div>
          ))}
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-500 transition duration-150">
          Add Sample
        </button>
      </form>
    </div>
  );
};

export default SampleInputForm;