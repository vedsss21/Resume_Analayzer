import express from 'express';
import dotenv from 'dotenv';
import analyzeRouter from './routes/analyze.js';
import careerChatRouter from './routes/careerChat.js';
import cors from 'cors';
import questionRouter from './routes/generateQuestion.js'; // Assuming you have a question generator service
 // Assuming you have a question generator service

dotenv.config();


const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // allow frontend origin
  credentials: true               // if you're using cookies or auth headers
}));
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/analyze', analyzeRouter);
app.use('/career-chat', careerChatRouter);
app.use('/generate-question', questionRouter); // Add question generation route


app.listen(port, () => {
  console.log(`Resume Analyzer backend running at http://localhost:${port}`);
});
