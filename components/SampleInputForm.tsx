import React, { useState } from 'react';
import { SampleData, Metal, ConcentrationValue } from '../types';
import { AVAILABLE_METALS } from '../constants';
import { Unit, convertToMgL } from '../utils/unitConversion';

interface SampleInputFormProps {
  onAddSample: (sample: SampleData) => void;
}

const SampleInputForm: React.FC<SampleInputFormProps> = ({ onAddSample }) => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [concentrations, setConcentrations] = useState<Partial<Record<Metal, { value: string; unit: Unit }>>>(
    AVAILABLE_METALS.reduce((acc, metal) => ({ ...acc, [metal]: { value: '', unit: Unit.MG_L } }), {})
  );

  const handleConcentrationChange = (metal: Metal, field: 'value' | 'unit', newValue: string) => {
    setConcentrations(prev => ({
      ...prev,
      [metal]: {
        ...prev[metal]!,
        [field]: newValue,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      alert('Please enter valid latitude (-90 to 90) and longitude (-180 to 180).');
      return;
    }

    const sampleConcentrations: Record<Metal, number | undefined> = {} as any;
    const originalConcentrations: Record<Metal, ConcentrationValue | undefined> = {} as any;
    let hasData = false;

    Object.entries(concentrations).forEach(([metal, data]) => {
      const value = parseFloat(data.value);
      if (!isNaN(value) && value > 0) {
        hasData = true;
        const mgLValue = convertToMgL({ value, unit: data.unit });
        sampleConcentrations[metal as Metal] = mgLValue;
        originalConcentrations[metal as Metal] = {
          value: value,
          unit: data.unit,
          mgLValue: mgLValue
        };
      }
    });

    if (!hasData) {
      alert('Please enter at least one metal concentration.');
      return;
    }
    
    const newSample: SampleData = {
      id: `manual-${new Date().getTime()}`,
      latitude: lat,
      longitude: lon,
      concentrations: sampleConcentrations,
      originalConcentrations: originalConcentrations,
    };

    onAddSample(newSample);
  };

  return (
    <div className="bg-white p-8 rounded-lg w-full max-h-[90vh] overflow-y-auto">
      <h3 className="text-xl font-bold mb-1 text-slate-800">Add Sample Manually</h3>
      <p className="text-sm text-slate-500 mb-6">Enter the geographic coordinates and heavy metal concentrations for your sample.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Location Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="latitude" className="block text-sm font-medium text-slate-700 mb-1">Latitude</label>
            <input
              type="number"
              id="latitude"
              value={latitude}
              onChange={e => setLatitude(e.target.value)}
              placeholder="e.g., 28.6139"
              required
              className="w-full bg-slate-50 border border-slate-300 rounded-md p-2 text-sm text-slate-800 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div>
            <label htmlFor="longitude" className="block text-sm font-medium text-slate-700 mb-1">Longitude</label>
            <input
              type="number"
              id="longitude"
              value={longitude}
              onChange={e => setLongitude(e.target.value)}
              placeholder="e.g., 77.2090"
              required
              className="w-full bg-slate-50 border border-slate-300 rounded-md p-2 text-sm text-slate-800 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
        </div>

        {/* Metal Concentrations Table */}
        <div>
            <h4 className="text-md font-semibold text-slate-800 mb-3">Metal Concentrations</h4>
            <div className="space-y-3">
              {AVAILABLE_METALS.map(metal => (
                <div key={metal} className="grid grid-cols-3 gap-3 items-center">
                  <label htmlFor={`value-${metal}`} className="text-sm font-medium text-slate-700">{metal}</label>
                  <input
                    type="number"
                    step="any"
                    id={`value-${metal}`}
                    placeholder="Value"
                    value={concentrations[metal]?.value || ''}
                    onChange={e => handleConcentrationChange(metal, 'value', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-md p-2 text-sm text-slate-800 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                  <select
                    id={`unit-${metal}`}
                    value={concentrations[metal]?.unit}
                    onChange={e => handleConcentrationChange(metal, 'unit', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-md p-2 text-sm text-slate-800 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    {Object.values(Unit).map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
        </div>
        
        {/* Submit Button */}
        <div className="pt-4 border-t border-slate-200">
          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg transition-colors text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 shadow-md shadow-purple-500/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
            <span>Add Sample and Analyze</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SampleInputForm;
