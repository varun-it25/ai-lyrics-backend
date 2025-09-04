const { OpenAI } = require('openai');
require('dotenv').config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_SECRET_KEY });

async function gptAPI(word) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'user',
          content: `Give me 10 rhyming words for '${word}' in Romanized form, separated by commas, with no extra text.`
        }
      ],
      temperature: 0.3,
      max_tokens: 60,
    });

    const rhymingWords = response.choices[0].message.content.split(',').map(word => word.trim());
    return {response : rhymingWords}
  }
  catch (error) {
    return {error : response.choices[0].message.content}
  }
}

module.exports = { gptAPI };