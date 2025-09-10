
export enum Metal {
  Pb = 'Pb',
  As = 'As',
  Hg = 'Hg',
  Cd = 'Cd',
  Cr = 'Cr',
  Ni = 'Ni',
  Zn = 'Zn',
  Fe = 'Fe',
}

export type SampleData = {
  id: string;
  latitude: number;
  longitude: number;
  concentrations: Record<Metal, number | undefined>;
};

export type StandardLimits = {
  permissible: number; // S_i
  ideal: number;       // I_i
};

export type Standard = {
  name: string;
  limits: Record<Metal, StandardLimits>;
};

export type PollutionIndices = {
  hpi: number;
  hei: number;
  cd: number;
};

export type AnalysisResult = {
  sample: SampleData;
  indices: PollutionIndices;
};

export enum QualityClass {
    Excellent = 'Excellent',
    Good = 'Good',
    Fair = 'Fair',
    Poor = 'Poor',
    VeryPoor = 'Very Poor',
    Unsuitable = 'Unsuitable',
}