
import { GoogleGenAI } from "@google/genai";
import { FLEET } from "../constants";

// Strictly adhering to the named parameter initialization as per SDK rules
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const getConciergeResponse = async (userMessage: string, history: { role: 'user' | 'model', text: string }[]) => {
  try {
    const fleetContext = JSON.stringify(FLEET.map(j => ({
      name: j.name,
      category: j.category,
      range: j.range,
      passengers: j.passengers,
      desc: j.description
    })));

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({ role: h.role === 'user' ? 'user' : 'model', parts: [{ text: h.text }] })),
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: `You are the Jesko Jets Luxury Concierge. 
        Your goal is to help users find the perfect private jet and provide premium travel advice.
        Available fleet: ${fleetContext}.
        Be sophisticated, helpful, and concise. Use a tone appropriate for ultra-high-net-worth individuals.
        If the user asks for a recommendation, consider their passenger count and likely destination distance.
        Do not make up jets not in the list unless specifically asked about general aviation.`,
        temperature: 0.7,
      },
    });

    // Accessing .text property directly as per modern GenerateContentResponse guidelines
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I apologize, but I am having trouble connecting to the concierge desk. How else may I assist you with your luxury travel needs today?";
  }
};
