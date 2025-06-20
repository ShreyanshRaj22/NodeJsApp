const express = require('express');
const router = express.Router();
const aiProcessor = require('../services/aiProcessor');

router.post('/', async (req, res) => {
  try {
    let inputText = '';

    if (req.body.text) {
      inputText = req.body.text;
    } else if (req.files && req.files.length > 0) {
      inputText = req.files[0].buffer.toString();
    }

    if (!inputText.trim()) {
      return res.status(400).json({ error: 'No input text provided' });
    }

    const result = await aiProcessor.processText(inputText);
    res.json(result);

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
