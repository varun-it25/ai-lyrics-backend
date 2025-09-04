const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { callGeminiAPI } = require('./api/gemini.js');
const { gptAPI } = require('./api/gpt.js');
const { datamuseAPI } = require('./api/datamuse.js');

dotenv.config();

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.get('/gemini', async (req, res) => {
  const { word } = req.query;
  const result =  await callGeminiAPI(word);

  if(result.response){
      const WORDS = JSON.parse(result.response.replace(/^```json\s*|\s*```$/g, ''));

      if(WORDS.length === 0){
          return res.json({ error: "No rhymes found. Please try a different word." });
      }

      res.json({ response: WORDS });
  }

  res.json(result);
});

app.get('/gpt', async (req, res) => {
  const { word } = req.query;
  const result =  await gptAPI(word);
  res.json(result);
});

app.get('/datamuse', async (req, res) => {
  const { word } = req.query;
  const result =  await datamuseAPI(word);
  res.json(result);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});