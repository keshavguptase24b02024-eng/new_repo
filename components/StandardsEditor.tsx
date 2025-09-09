import React from 'react';
import { Standard } from '../types';
import { STANDARDS } from '../constants';

interface StandardsEditorProps {
  selectedStandard: Standard;
  onStandardChange: (standard: Standard) => void;
}

const StandardsEditor: React.FC<StandardsEditorProps> = ({ selectedStandard, onStandardChange }) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-blue-600">Regulatory Standard</h3>
        <select
          value={selectedStandard.name}
          onChange={(e) => {
              const newStandard = Object.values(STANDARDS).find(s => s.name === e.target.value);
              if (newStandard) {
                  onStandardChange(newStandard);
              }
          }}
          className="bg-gray-50 border border-gray-300 rounded-md p-2 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
        >
          {Object.values(STANDARDS).map(std => (
            <option key={std.name} value={std.name}>{std.name}</option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-4 py-2">Metal</th>
              <th scope="col" className="px-4 py-2">Permissible Limit (mg/L)</th>
              <th scope="col" className="px-4 py-2">Ideal Value (mg/L)</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(selectedStandard.limits).map(([metal, limits]) => (
              <tr key={metal} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-2 font-medium text-gray-900">{metal}</td>
                <td className="px-4 py-2">{limits.permissible}</td>
                <td className="px-4 py-2">{limits.ideal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StandardsEditor;