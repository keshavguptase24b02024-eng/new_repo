import { SampleData } from '../types';

export enum Unit {
  MG_L = 'mg/L',
  PPM = 'ppm',
  PPB = 'ppb',
  UG_L = 'μg/L',
}

export const parseUnit = (unitStr: string): Unit | null => {
    const lowerUnit = unitStr.toLowerCase().trim();
    if (lowerUnit === 'mg/l') return Unit.MG_L;
    if (lowerUnit === 'ppm') return Unit.PPM;
    if (lowerUnit === 'μg/l' || lowerUnit === 'ug/l') return Unit.UG_L;
    if (lowerUnit === 'ppb') return Unit.PPB;
    return null;
};

export const convertToMgL = ({ value, unit }: { value: number; unit: Unit | string }): number => {
  switch (unit) {
    case Unit.MG_L:
    case Unit.PPM:
      return value;
    case Unit.PPB:
    case Unit.UG_L:
      return value / 1000;
    default:
      console.warn(`Unknown unit for conversion to mg/L: ${unit}`);
      return value;
  }
};

export const convertUnit = ({ value, from, to }: { value: number; from: Unit; to: Unit }): number => {
  if (from === to) return value;
  const valueInMgL = convertToMgL({ value, unit: from });

  switch (to) {
    case Unit.MG_L:
    case Unit.PPM:
      return valueInMgL;
    case Unit.PPB:
    case Unit.UG_L:
      return valueInMgL * 1000;
    default:
       console.warn(`Unknown unit for conversion from mg/L: ${to}`);
      return valueInMgL;
  }
};

/**
 * Heuristically detects the most likely unit for an entire dataset
 * based on the magnitude of the concentration values. This is useful
 * when units are not specified in the CSV headers.
 */
export const detectUnitForDataset = (samples: Partial<Pick<SampleData, 'concentrations'>>[]): Unit => {
    const allValues: number[] = [];
    samples.forEach(sample => {
        if (sample.concentrations) {
            Object.values(sample.concentrations).forEach(val => {
                if (val !== undefined) {
                    allValues.push(val);
                }
            });
        }
    });

    if (allValues.length === 0) {
        return Unit.MG_L; // Default
    }

    // Calculate average magnitude
    const avg = allValues.reduce((sum, val) => sum + val, 0) / allValues.length;
    
    // Heuristics:
    // If average value is > 10, it's very likely ppb/μg/L.
    // If it's between 0.1 and 10, could be either, but mg/L is a safer default.
    // If it's very small (< 0.1), it's likely mg/L.
    if (avg > 10) {
        return Unit.UG_L; // Interpreted as μg/L (ppb)
    }
    
    return Unit.MG_L; // Default to mg/L (ppm)
};
