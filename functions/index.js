import { onRequest } from 'firebase-functions/v2/https';
import { defineSecret } from 'firebase-functions/params';
import { GoogleGenerativeAI } from '@google/generative-ai';
import cors from 'cors';

// Define your secret key
const GEMINI_API_KEY = defineSecret('GEMINI_API_KEY');

const corsOptions = {
  origin: true, // Allow all origins (change for security if needed)
  methods: ['GET', 'POST'],
};

export const chatbot = onRequest({ secrets: [GEMINI_API_KEY] }, async (req, res) => {
  cors(corsOptions)(req, res, async () => {
    try {
      const message = req.body.message || '';
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY.value());
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
      //   const prompt = `You are a top French Canadian language tutor, helping grade 6–8 students with verb conjugations. The verb context is ${context}. The chat is limited to 2 queries. Here is the conversation so far: ${formattedHistory}
      //   Now answer the latest student query in the shortest, most concise way possible: User: ${message}`;
      const prompt = message;
      const result = await model.generateContent(prompt);

      res.status(200).json({ reply: result.response.text() });
    } catch (error) {
      console.error('Error in chatbot function:', error);
      res.status(500).json({ error: error.message || 'Internal server error' });
    }
  });
});
