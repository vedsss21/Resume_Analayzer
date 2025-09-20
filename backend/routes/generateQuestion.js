import express from 'express';
import model from '../config/gemini.js'; // This should export the result of genAI.getGenerativeModel()

const router = express.Router();

router.post('/', async (req, res) => {
  const { topic } = req.body;

  if (!topic || typeof topic !== 'string') {
    return res.status(400).json({ error: 'Topic must be a non-empty string.' });
  }

  const prompt = `
Generate a DSA coding question on the topic "${topic}" in the following format:

Title: ...
Problem: ...
Input: ...
Output: ...
Constraints: ...
Example Input: ...
Example Output: ...
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    res.status(200).json({ question: text });
  } catch (error) {
    console.error('Gemini API error:', error.message);
    res.status(500).json({ error: 'Failed to generate question. Please try again later.' });
  }
});

export default router;
