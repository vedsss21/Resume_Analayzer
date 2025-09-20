import express from 'express';
import multer from 'multer';
import { extractTextFromPDF } from '../services/pdfService.js';
import { analyzeResume } from '../services/analyzerService.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('resume'), async (req, res) => {
  try {
    const jobDescription = req.body.jobDescription;
    const resumeFile = req.file;

    if (!jobDescription || !resumeFile) {
      return res.status(400).json({ error: 'Missing resume or job description.' });
    }

    const resumeText = await extractTextFromPDF(resumeFile);
    // console.log('Extracted resume text:', resumeText); 
    const analysis = await analyzeResume(resumeText, jobDescription);


    res.json({ result: analysis });
  } catch (err) {
    console.error('Error analyzing resume:', err);
    res.status(500).json({ error: 'Failed to analyze resume.' });
  }
});

export default router;
