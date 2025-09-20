import express from 'express';
import model from '../config/gemini.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { message } = req.body;

  if (!message || message.trim().length < 3) {
    return res.status(400).json({ error: 'Please enter a valid question or message.' });
  }

  const prompt = `
You are a career guidance chatbot. Answer the user's question clearly, helpfully, and conversationally.

User: ${message}
`;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    res.json({ reply: responseText });
  } catch (err) {
    console.error('Gemini error:', err);
    res.status(500).json({ error: 'Failed to generate response.' });
  }
});

export default router;
