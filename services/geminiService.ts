
import { GoogleGenAI, Type } from "@google/genai";
import { ApiResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_INSTRUCTION = `
You are DocAI, a professional health and diagnosis assistant. 
Your goal is to help users understand their symptoms and provide guidance.
IMPORTANT RULES:
1. Always ask ONE follow-up question at a time to keep it simple.
2. Provide suggested short answers (MCQ style) for the question when possible (e.g., "Yes", "No", "Sharp pain", "Dull ache").
3. Use a reassuring and professional tone.
4. Disclaimer: Remind users that you are an AI and not a substitute for professional medical advice in emergency situations.
5. If the user reports emergency symptoms (chest pain, severe bleeding), urge them to call emergency services immediately.
`;

export const getHealthAdvice = async (history: { role: string; parts: { text: string }[] }[]): Promise<ApiResponse> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: history.map(h => ({ role: h.role === 'user' ? 'user' : 'model', parts: [{ text: h.parts[0].text }] })),
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            message: {
              type: Type.STRING,
              description: "The response message text to display to the user."
            },
            suggestedOptions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Short suggested answers (MCQ) for the next interaction."
            }
          },
          required: ["message"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    return {
      message: result.message || "I'm sorry, I couldn't process that. Please try again.",
      suggestedOptions: result.suggestedOptions || []
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      message: "I'm having trouble connecting right now. Please check your connection.",
      suggestedOptions: []
    };
  }
};
