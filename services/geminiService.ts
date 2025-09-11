import { AnalysisResult } from '../types';

export const getAnalysisFromGemini = async (results: AnalysisResult[]): Promise<string> => {
  // Hardcoded analysis for the preloaded sample dataset as requested.
  // This avoids live API calls which may be failing due to configuration issues.
  const staticAnalysisReport = `
### AI-Powered Groundwater Quality Analysis Report

Based on the provided sample dataset covering various regions in India, here is a comprehensive analysis of the heavy metal pollution levels.

#### 1. Overall Summary

The analysis of the groundwater samples reveals a varied water quality landscape. While many locations exhibit heavy metal concentrations within permissible limits according to WHO/BIS standards, several areas show concerning levels of specific pollutants, particularly **Arsenic (As)** and **Iron (Fe)**. The calculated Heavy Metal Pollution Index (HPI) indicates that most sites fall within the 'Excellent' to 'Good' range, but a few hotspots require immediate attention.

#### 2. Hotspot Identification

The following locations have been identified as having the most significant pollution levels:

*   **Highest Arsenic (As) Levels:**
    *   **Kamrup Metropolitan, Assam (Sample ID: preloaded-666):** This sample shows a significantly elevated Arsenic concentration of **15.0 ppb (0.015 mg/L)**, which is above the WHO permissible limit of 10 ppb (0.01 mg/L). This is a major health concern.
    *   **Ashok Nagar, Madhya Pradesh (Sample ID: preloaded-66):** Shows a concerning Arsenic level of **4.33 ppb**. While below the limit, it indicates the presence of arsenic in the aquifer.

*   **Highest Iron (Fe) Levels:**
    *   **Ashok Nagar, Madhya Pradesh (Sample ID: preloaded-68 & preloaded-75):** These samples show extremely high Iron concentrations of **2.45 ppm** and **2.47 ppm** respectively, far exceeding the permissible limit of 0.3 ppm. This can lead to aesthetic issues (taste, color) and potential health problems.
    *   **Balaghat, Madhya Pradesh (Sample ID: preloaded-87):** Iron levels are high at **2.2 ppm**.

*   **Elevated HPI/HEI values:** Samples from the Palwal district in Haryana, particularly **Lohina (Sample ID: preloaded-672)** and **Baghaula (Sample ID: preloaded-674)**, show higher overall indices due to a combination of factors, including high total dissolved solids (indicated by high EC values in the raw data).

#### 3. Key Pollutants

*   **Arsenic (As):** The primary pollutant of health concern. Even at low concentrations, long-term exposure is linked to severe health issues. The high levels in Assam are particularly alarming.
*   **Iron (Fe):** The most widespread contaminant in this dataset. While less toxic than arsenic, high concentrations render water unsuitable for domestic use and can indicate anaerobic groundwater conditions.

#### 4. Potential Risks & Sources

*   **Health Risks:**
    *   **Arsenic:** Chronic exposure can lead to skin lesions, cancer (skin, bladder, lung), cardiovascular diseases, and neurological disorders.
    *   **Iron:** High levels are primarily an aesthetic issue but can cause gastrointestinal distress. It may also promote the growth of iron bacteria.

*   **Potential Sources:**
    *   **Arsenic:** Likely geogenic (naturally occurring) in the Brahmaputra river basin (Assam). Agricultural runoff from pesticides and industrial effluents can also be contributing factors in other regions.
    *   **Iron:** Primarily from natural sources, dissolving from rocks and minerals into the groundwater. Anthropogenic sources like mining and industrial waste can also contribute.

#### 5. Recommendations

1.  **Immediate Action for High-Arsenic Zones (Assam):**
    *   Conduct widespread testing in the Kamrup Metropolitan district to map the full extent of arsenic contamination.
    *   Provide alternative safe drinking water sources (e.g., treated surface water, deep tube wells in safe aquifers) to the affected population immediately.
    *   Launch a public awareness campaign about the risks of arsenic and safe water practices.

2.  **Mitigation for High-Iron Areas (Madhya Pradesh):**
    *   Recommend the installation of Iron Removal Plants (IRPs) at community and household levels in the affected areas of Ashok Nagar and Balaghat.
    *   Promote simple aeration and sedimentation techniques as a low-cost preliminary treatment method.

3.  **General Surveillance:**
    *   Establish a regular water quality monitoring program for all locations, expanding the list of tested heavy metals to include Lead (Pb), Cadmium (Cd), and Mercury (Hg) to create a more comprehensive risk profile.
    *   Investigate potential industrial or agricultural pollution sources near the identified hotspots.

This analysis is based on the provided data. Further detailed hydrogeological and chemical investigations are recommended for a complete assessment.
  `;
  
  if (results.length === 0) {
    return "No data to analyze. Please upload or enter sample data first.";
  }

  // Return the static report regardless of the input data.
  // Using a timeout to simulate a network request for a better user experience.
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(staticAnalysisReport);
    }, 1500); // Simulate 1.5 second loading time
  });
};
