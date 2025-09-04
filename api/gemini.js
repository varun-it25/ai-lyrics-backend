const { GoogleGenAI } = require('@google/genai');
const dotenv = require('dotenv');

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function callGeminiAPI(word) {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-001',
            contents: `Give me a list (in plain JSON array format) of words that rhyme with "${word}". Only include actual rhymes (not near rhymes or similar-sounding words). Do not include explanations, just return the array.`,
        });

        return { response: response.text };
    }
    catch (error) {
        return { error: error.message };
    }
}

module.exports = { callGeminiAPI };