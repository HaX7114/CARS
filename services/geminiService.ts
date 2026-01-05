import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getCarAdvice = async (history: Message[], userInput: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userInput,
      config: {
        tools: [{ googleSearch: {} }],
        systemInstruction: `You are LuxeDrive Concierge, an elite automotive expert for a futuristic car brand. 
        Our fleet: 
        1. Tesla: High-performance electric sedan, long range (405mi), 3.1s 0-60.
        2. AMG: Sophisticated performance SUV/Sedan, 348mi range, 3.8s 0-60.
        3. BMW 7: Ultimate luxury performance sedan, 200mph top speed, 1.99s 0-60.
        
        Keep responses concise, premium, and sophisticated. Recommend the best LuxeDrive model based on the user's lifestyle.
        If you use Google Search to find external information (like charging stations or tax credits), ensure you provide a helpful summary.`,
      },
    });

    const text = response.text;
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
      title: chunk.web?.title,
      uri: chunk.web?.uri
    })).filter((s: any) => s.title && s.uri);

    return { text, sources: sources || [] };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { text: "I'm currently recalibrating my neural links. Please try again in a moment, or visit our showroom.", sources: [] };
  }
};