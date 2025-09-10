import React, { useState, useCallback } from 'react';
import { SampleData, Metal } from '../types';
import { AVAILABLE_METALS } from '../constants';

interface DataUploaderProps {
  onDataLoaded: (data: SampleData[]) => void;
  setErrorMessage: (message: string) => void;
}

const DataUploader: React.FC<DataUploaderProps> = ({ onDataLoaded, setErrorMessage }) => {
  const [fileName, setFileName] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      parseCSV(file);
    }
     event.target.value = ''; // Reset file input
  };
  
  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
  };
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file && file.type === "text/csv") {
        setFileName(file.name);
        parseCSV(file);
      } else {
        setErrorMessage("Please drop a valid .csv file.");
      }
  };


  const parseCSV = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (!text) {
        setErrorMessage("File is empty or could not be read.");
        return;
      }

      try {
        const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
        if (lines.length < 2) {
            setErrorMessage("CSV must have a header row and at least one data row.");
            return;
        }

        const header = lines[0].split(',').map(h => h.trim());
        const latIndex = header.indexOf('latitude');
        const lonIndex = header.indexOf('longitude');

        if (latIndex === -1 || lonIndex === -1) {
            setErrorMessage("CSV header must contain 'latitude' and 'longitude' columns.");
            return;
        }

        const metalIndices: Partial<Record<Metal, number>> = {};
        AVAILABLE_METALS.forEach(metal => {
            const index = header.findIndex(h => h.toLowerCase() === metal.toLowerCase());
            if (index !== -1) {
                metalIndices[metal] = index;
            }
        });

        const samples: SampleData[] = [];
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',');
          const concentrations: Record<Metal, number | undefined> = {} as Record<Metal, number | undefined>;
          
          Object.entries(metalIndices).forEach(([metal, index]) => {
            const value = parseFloat(values[index]);
            if (!isNaN(value)) {
              concentrations[metal as Metal] = value;
            }
          });
          
          const latitude = parseFloat(values[latIndex]);
          const longitude = parseFloat(values[lonIndex]);

          if (isNaN(latitude) || isNaN(longitude)) {
              console.warn(`Skipping row ${i+1} due to invalid coordinates.`);
              continue;
          }

          samples.push({
            id: `sample-${Date.now()}-${i}`,
            latitude,
            longitude,
            concentrations,
          });
        }
        onDataLoaded(samples);
        setErrorMessage("");
      } catch (error) {
        console.error("CSV Parsing error:", error);
        setErrorMessage(`Failed to parse CSV. Please check the file format. Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        setFileName('');
      }
    };
    reader.onerror = () => {
        setErrorMessage("Error reading the file.");
        setFileName('');
    };
    reader.readAsText(file);
  }, [onDataLoaded, setErrorMessage]);

  return (
    <div className="bg-white p-8 rounded-lg w-full">
      <h3 className="text-xl font-bold mb-1 text-slate-800">Upload CSV Data</h3>
      <p className="text-sm text-slate-500 mb-6">Get started by uploading your groundwater sample data.</p>
      <div className="flex items-center justify-center w-full">
        <label 
            htmlFor="csv-upload" 
            className={`flex flex-col items-center justify-center w-full h-48 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-slate-50 transition-colors ${isDragging ? 'bg-purple-100 border-purple-400' : 'hover:bg-slate-100'}`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
            <svg className="w-10 h-10 mb-4 text-slate-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
            </svg>
            <p className="mb-2 text-sm text-slate-500"><span className="font-semibold text-purple-600">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-slate-400">CSV file with latitude, longitude & metals</p>
          </div>
          <input id="csv-upload" type="file" className="hidden" accept=".csv" onChange={handleFileChange} />
        </label>
      </div>
      {fileName && <p className="text-sm mt-4 text-center text-green-700 font-medium bg-green-100 py-2 px-4 rounded-md">Successfully loaded: {fileName}</p>}
    </div>
  );
};

export default DataUploader;