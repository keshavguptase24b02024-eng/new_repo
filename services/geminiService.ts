import { GoogleGenAI } from "@google/genai";
import { AnalysisResult } from '../types';

// Extend the Window interface to include our custom property for type safety.
declare global {
  interface Window {
    GEMINI_API_KEY?: string;
  }
}

export const getAnalysisFromGemini = async (results: AnalysisResult[]): Promise<string> => {
  if (results.length === 0) {
    return "No data to analyze. Please upload or enter sample data first.";
  }

  // Prioritize environment variables, but fall back to a window property for local development.
  const apiKey = (typeof process !== 'undefined' ? process.env.API_KEY : undefined) || window.GEMINI_API_KEY;

  if (!apiKey) {
    // This message is formatted in markdown so it will render nicely in the AI Analysis view.
    return `
### AI Analysis Configuration Error

**An API key is required to use the AI analysis feature.**

This application is designed to use an API key provided through environment variables (\`process.env.API_KEY\`), which is standard for production environments.

**For local development:** Since your current setup doesn't provide this environment variable, you can set the API key for your browser session. Open the developer console (usually with F12 or Ctrl+Shift+I) and execute the following command, replacing \`"YOUR_API_KEY_HERE"\` with your actual Gemini API key:

\`\`\`javascript
window.GEMINI_API_KEY = "YOUR_API_KEY_HERE";
\`\`\`

After running the command, please try generating the analysis again. This key will only be stored for your current session and will need to be set again if you close the browser tab.
    `;
  }
  
  try {
    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
    You are an expert environmental scientist specializing in groundwater contamination.
    Analyze the following heavy metal pollution data and provide a concise, actionable report.
    The data includes calculated indices: HPI (Heavy Metal Pollution Index), HEI (Heavy Metal Evaluation Index), and HCI (Heavy Metal Contamination Index).
    
    Data:
    ${JSON.stringify(results, null, 2)}

    Based on the data, please provide the following in your report:
    1.  **Overall Summary:** A brief overview of the water quality across all samples.
    2.  **Hotspot Identification:** Identify the sample locations (by ID and coordinates) with the highest pollution levels for each index (HPI, HEI, HCI).
    3.  **Key Pollutants:** Determine which heavy metals are the most significant contributors to the pollution across the dataset.
    4.  **Potential Risks & Sources:** Briefly mention the potential health risks associated with the key pollutants and suggest likely anthropogenic or natural sources.
    5.  **Recommendations:** Provide clear, actionable recommendations for further investigation, monitoring, and potential remediation.

    Format the response in clear, well-structured markdown.
  `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching analysis from Gemini:", error);
    // Provide a more user-friendly error message, including what might be wrong with the key.
    return `An error occurred while communicating with the AI. Please ensure your API key is correct and has the necessary permissions, and check your network connection. 
    
Details: ${error instanceof Error ? error.message : String(error)}`;
  }
};
