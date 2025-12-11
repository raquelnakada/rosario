import { GoogleGenAI, Type } from "@google/genai";
import { DailyContent } from '../types';

export const generateDailyContent = async (
  day: number, 
  title: string, 
  theme: string
): Promise<DailyContent> => {
  try {
    const ai = new GoogleGenAI({ apiKey: (process.env.API_KEY as string) });
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
        Você é um guia espiritual católico criando conteúdo para o "Desafio do Rosário de 21 Dias".
        
        Gere o conteúdo para o Dia ${day}.
        Título do Dia: "${title}"
        Tema Central: "${theme}"

        Gere 3 partes distintas em Português:
        1. Reflexão: Um texto curto (aprox. 60 palavras) conectando o mistério à vida cotidiana.
        2. Oração: Uma oração curta e direta (1 ou 2 frases).
        3. Ação Concreta: Uma sugestão prática.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reflection: { type: Type.STRING },
            prayer: { type: Type.STRING },
            action: { type: Type.STRING }
          },
          required: ["reflection", "prayer", "action"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as DailyContent;
  } catch (error) {
    console.error("Error generating daily content:", error);
    return {
      reflection: "Reflita hoje sobre o amor de Deus e a presença de Maria em sua vida. O Rosário é um caminho de paz.",
      prayer: "Senhor, aumentai a nossa fé e guiai-nos no caminho da santidade.",
      action: "Reze o Terço hoje com especial atenção e ofereça-o por alguém que precisa de orações."
    };
  }
};