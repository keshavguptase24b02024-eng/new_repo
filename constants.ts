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
    [QualityClass.Excellent]: { text: 'EXCELLENT', className: 'bg-green-500 text-white', mapColor: '#22c55e'},
    [QualityClass.Good]: { text: 'GOOD', className: 'bg-green-500 text-white', mapColor: '#22c55e' },
    [QualityClass.Fair]: { text: 'FAIR', className: 'bg-yellow-500 text-black', mapColor: '#eab308' },
    [QualityClass.Poor]: { text: 'POOR', className: 'bg-orange-500 text-white', mapColor: '#f97316' },
    [QualityClass.VeryPoor]: { text: 'VERY POOR', className: 'bg-red-500 text-white', mapColor: '#ef4444' },
    [QualityClass.Unsuitable]: { text: 'UNSUITABLE', className: 'bg-red-700 text-white', mapColor: '#b91c1c' },
};