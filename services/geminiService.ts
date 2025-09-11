
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

  // Securely get the API key with a clear priority for different environments.
  const apiKey = (typeof process !== 'undefined' ? process.env.API_KEY : undefined) 
                 || window.GEMINI_API_KEY 
                 || (typeof localStorage !== 'undefined' ? localStorage.getItem('GEMINI_API_KEY') : null);

  if (!apiKey) {
    // This message is formatted in markdown so it will render nicely in the AI Analysis view.
    return `
### AI Analysis Configuration Error

**An API key is required to use the AI analysis feature.**

This application is designed for production using an environment variable (\`process.env.API_KEY\`). For local development, you can set the key in your browser.

**To set your key permanently for this browser (Recommended):**
Open the developer console (F12 or Ctrl+Shift+I) and run this command, replacing \`"YOUR_API_KEY_HERE"\` with your actual key:
\`\`\`javascript
localStorage.setItem('GEMINI_API_KEY', "YOUR_API_KEY_HERE");
\`\`\`

**To set your key only for the current session:**
If you prefer not to store it, you can use this command instead. You'll need to re-run it if you close this tab.
\`\`\`javascript
window.GEMINI_API_KEY = "YOUR_API_KEY_HERE";
\`\`\`

After running one of the commands, please try generating the analysis again.

---

### ⚠️ Important Security Notice

**Never hardcode your API key directly in frontend code.** If you run this application in a browser, your API key will be exposed to anyone who inspects the site's code.

**Best Practice for Production:** Use a backend server (like Node.js, Python, or Go) to act as a proxy. Your frontend should call your backend, and your backend will securely store the key and make the actual calls to the Gemini API.

**For Frontend-Only Testing:** If you must test on a pure frontend, it is critical to restrict your API key in the Google Cloud Console. Add restrictions to only allow requests from specific web origins (e.g., \`http://localhost:3000\`). For production, you should rotate keys regularly and enforce strict domain restrictions.
    `;
  }
  
  try {
    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
    You are an expert environmental scientist specializing in groundwater contamination.
    Analyze the following heavy metal pollution data and provide a concise, actionable report.
    The data includes calculated indices: HPI (Heavy Metal Pollution Index), HEI (Heavy Metal Evaluation Index), and HCI (Heavy Metal Contamination Index, also labeled as Cd).
    
    Data:
    ${JSON.stringify(results, null, 2)}

    Based on the data, please provide the following in your report:
    1.  **Overall Summary:** A brief overview of the water quality across all samples. Is there a general trend?
    2.  **Hotspot Identification:** Identify the sample locations (by ID and coordinates) with the highest pollution levels for each index (HPI, HEI, HCI). Be specific about which locations are most concerning.
    3.  **Key Pollutants:** Determine which heavy metals are the most significant contributors to the pollution across the dataset.
    4.  **Potential Risks & Sources:** Briefly mention the potential health risks associated with the key pollutants and suggest likely anthropogenic (e.g., industrial, agricultural runoff) or natural sources.
    5.  **Recommendations:** Provide clear, actionable recommendations for authorities. Suggest specific next steps like "targeted soil testing near sample X" or "investigate industrial discharge upstream of location Y".

    Format the response in clear, well-structured markdown. Use headings, bold text, and lists to make the report easy to read.
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
