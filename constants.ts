import { Metal, Standard, QualityClass } from './types';

export const AVAILABLE_METALS: Metal[] = [
  Metal.Pb,
  Metal.As,
  Metal.Hg,
  Metal.Cd,
  Metal.Cr,
  Metal.Ni,
  Metal.Zn,
  Metal.Fe,
];

export const STANDARDS: Record<string, Standard> = {
  WHO: {
    name: 'WHO (World Health Organization)',
    limits: {
      [Metal.Pb]: { permissible: 0.01, ideal: 0 },
      [Metal.As]: { permissible: 0.01, ideal: 0 },
      [Metal.Hg]: { permissible: 0.006, ideal: 0 },
      [Metal.Cd]: { permissible: 0.003, ideal: 0 },
      [Metal.Cr]: { permissible: 0.05, ideal: 0 },
      [Metal.Ni]: { permissible: 0.07, ideal: 0 },
      [Metal.Zn]: { permissible: 5.0, ideal: 0 },
      [Metal.Fe]: { permissible: 0.3, ideal: 0 },
    },
  },
  BIS: {
    name: 'BIS (Bureau of Indian Standards)',
    limits: {
      [Metal.Pb]: { permissible: 0.01, ideal: 0 },
      [Metal.As]: { permissible: 0.01, ideal: 0 },
      [Metal.Hg]: { permissible: 0.001, ideal: 0 },
      [Metal.Cd]: { permissible: 0.003, ideal: 0 },
      [Metal.Cr]: { permissible: 0.05, ideal: 0 },
      [Metal.Ni]: { permissible: 0.02, ideal: 0 },
      [Metal.Zn]: { permissible: 5.0, ideal: 0 },
      [Metal.Fe]: { permissible: 0.3, ideal: 0 },
    },
  },
  CGWB: {
    name: 'CGWB (Central Ground Water Board)',
    limits: {
      [Metal.Pb]: { permissible: 0.01, ideal: 0 },
      [Metal.As]: { permissible: 0.01, ideal: 0 },
      [Metal.Hg]: { permissible: 0.001, ideal: 0 },
      [Metal.Cd]: { permissible: 0.003, ideal: 0 },
      [Metal.Cr]: { permissible: 0.05, ideal: 0 },
      [Metal.Ni]: { permissible: 0.02, ideal: 0 },
      [Metal.Zn]: { permissible: 5.0, ideal: 0 },
      [Metal.Fe]: { permissible: 0.3, ideal: 0 },
    },
  },
};

export const HPI_CLASSIFICATION = {
    excellent: 25,
    good: 50,
    fair: 75,
    poor: 100,
    veryPoor: 150,
};

export const HEI_CLASSIFICATION = {
    excellent: 5,
    good: 10,
    fair: 15,
    poor: 20,
    veryPoor: 40,
};

export const CD_CLASSIFICATION = {
    excellent: 0.5,
    good: 1,
    fair: 2,
    poor: 3,
    veryPoor: 4,
};

export const getQualityClass = (value: number, classification: Record<string, number>): QualityClass => {
    if (value < classification.excellent) return QualityClass.Excellent;
    if (value < classification.good) return QualityClass.Good;
    if (value < classification.fair) return QualityClass.Fair;
    if (value < classification.poor) return QualityClass.Poor;
    if (value < classification.veryPoor) return QualityClass.VeryPoor;
    return QualityClass.Unsuitable;
};

export const QUALITY_INFO: Record<QualityClass, { text: string; className: string; mapColor: string; }> = {
    [QualityClass.Excellent]: { text: 'EXCELLENT', className: 'bg-green-100 text-green-800 border-green-200', mapColor: '#22c55e'},
    [QualityClass.Good]: { text: 'GOOD', className: 'bg-green-100 text-green-800 border-green-200', mapColor: '#22c55e' },
    [QualityClass.Fair]: { text: 'FAIR', className: 'bg-yellow-100 text-yellow-800 border-yellow-200', mapColor: '#facc15' },
    [QualityClass.Poor]: { text: 'POOR', className: 'bg-orange-100 text-orange-800 border-orange-200', mapColor: '#fb923c' },
    [QualityClass.VeryPoor]: { text: 'VERY POOR', className: 'bg-red-100 text-red-800 border-red-200', mapColor: '#f87171' },
    [QualityClass.Unsuitable]: { text: 'UNSUITABLE', className: 'bg-red-200 text-red-900 border-red-300', mapColor: '#ef4444' },
};