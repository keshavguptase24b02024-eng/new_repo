
import { SampleData, Standard, PollutionIndices, Metal } from '../types';
import { AVAILABLE_METALS } from '../constants';

export const calculateIndices = (sample: SampleData, standard: Standard): PollutionIndices => {
  const metalsInSample = AVAILABLE_METALS.filter(
    metal => sample.concentrations[metal] !== undefined && sample.concentrations[metal]! > 0
  );

  let hei = 0;
  let cdNumerator = 0;
  let hpiNumerator = 0;
  let hpiDenominator = 0;

  for (const metal of metalsInSample) {
    const Mi = sample.concentrations[metal]!;
    const Si = standard.limits[metal].permissible;
    const Ii = standard.limits[metal].ideal;

    // HEI Calculation
    hei += Mi / Si;

    // Cd Calculation
    const Cfi = Mi / Si;
    cdNumerator += Cfi > 1 ? Cfi - 1 : 0;

    // HPI Calculation
    if (Si > 0 && Si !== Ii) {
      const Wi = 1 / Si; // Unit weightage (k=1)
      const Qi = ((Mi - Ii) / (Si - Ii)) * 100; // Sub-index
      
      hpiNumerator += Wi * Qi;
      hpiDenominator += Wi;
    }
  }
  
  const hpi = hpiDenominator > 0 ? hpiNumerator / hpiDenominator : 0;

  return {
    hpi: parseFloat(hpi.toFixed(2)),
    hei: parseFloat(hei.toFixed(2)),
    cd: parseFloat(cdNumerator.toFixed(2)),
  };
};
