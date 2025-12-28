
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

// Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY}); strictly as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getCarAdvice = async (history: Message[], userInput: string) => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `You are LuxeDrive Concierge, an elite automotive expert for a futuristic car brand. 
        Our fleet: 
        1. Model Alpha: Luxury sedan, long range (405mi), 3.1s 0-60.
        2. Model Sigma: Practical SUV, spacious, 348mi range, 3.8s 0-60.
        3. Model Zenith: Hyper-performance sedan, 200mph top speed, 1.99s 0-60.
        
        Keep responses concise, premium, and sophisticated. Recommend the best LuxeDrive model based on the user's lifestyle.`,
      },
    });

    const response = await chat.sendMessage({ message: userInput });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm currently recalibrating my neural links. Please try again in a moment, or visit our showroom.";
  }
};
