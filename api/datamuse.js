const axios = require('axios');

async function datamuseAPI(word) {
  const apiUrl = `https://api.datamuse.com/words`;

  try {
    const response = await axios.get(apiUrl, {
      params: {
        rel_rhy: word,
        max: 10,
      },
    });

    if (response.data.length === 0) {
      console.log(`No rhyming words found for '${word}'.`);
    } else {
      console.log(`Rhyming words for '${word}':`);
      response.data.forEach((wordObj, index) => {
        console.log(`${index + 1}: ${wordObj.word}`);
      });
    }
  } catch (error) {
    console.error('Error retrieving rhyming words:', error.message);
  }
}

module.exports = { datamuseAPI };