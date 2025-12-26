
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { SYSTEM_PROMPT, PRIZE_PROMPT } from "../constants";

// Strictly follow guideline: always use named parameter and direct process.env.API_KEY
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getBarkerComment = async (context: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Player context: ${context}. Give me a quick barker line.`,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.9,
      },
    });
    return response.text || "Step up and try your luck!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Nice shot, kid!";
  }
};

export interface PrizeData {
  name: string;
  description: string;
}

export const generatePrizeData = async (score: number): Promise<PrizeData> => {
  const ai = getAI();
  let tierDesc = "a participation trophy";
  if (score === 30) tierDesc = "a legendary, ultra-rare special masterpiece";
  else if (score >= 25) tierDesc = "a large, high-quality luxury prize";
  else if (score >= 10) tierDesc = "a decent medium-sized toy";
  else if (score >= 5) tierDesc = "a small but charming trinket";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `The player popped ${score} balloons, earning them ${tierDesc}. Generate a prize following this style: ${PRIZE_PROMPT}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            description: { type: Type.STRING }
          },
          required: ["name", "description"]
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    return { name: "Neon Trinket", description: "A shiny souvenir from the market." };
  }
};

export const generatePrizeImage = async (prizeName: string): Promise<string> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `A high-quality, professional 3D render of a toy prize for a carnival game: ${prizeName}. Highly detailed, stylized, vibrant Taiwan night market aesthetic, neon lighting, dramatic dark cinematic background.` }]
      }
    });

    for (const part of response.candidates?.[0]?.content.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return "https://picsum.photos/400/400";
  } catch (error) {
    console.error("Image Generation Error:", error);
    return "https://picsum.photos/400/400";
  }
};

export const generateSpeech = async (text: string): Promise<string | undefined> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });
    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  } catch (error) {
    console.error("TTS API Error:", error);
    return undefined;
  }
};
