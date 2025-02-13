import { onRequest } from 'firebase-functions/v2/https'; // Use v2 functions
import fetch from 'node-fetch';
import cors from 'cors';
import { defineSecret } from 'firebase-functions/params';

const AI_KEY = defineSecret('AI_KEY');

const corsOptions = {
  origin: true, // Allow all origins (change for security if needed)
  methods: ['GET', 'POST'],
};

export const chatbot = onRequest({ secrets: ['AI_KEY'] }, async (req, res) => {
  cors(corsOptions)(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${AI_KEY.value()}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'You are a French language tutor helping kids with verb conjugations.' },
            { role: 'user', content: message },
          ],
          max_tokens: 50,
        }),
      });

      if (!response.ok) {
        const errorDetails = await response.json().catch(() => ({}));
        throw new Error(`OpenAI API error: ${response.status} - ${response.statusText} - ${JSON.stringify(errorDetails)}`);
      }

      const data = await response.json();
      res.status(200).json({ reply: data.choices?.[0]?.message?.content || 'Je ne comprends pas.' });
    } catch (error) {
      console.error('Error in chatbot function:', error);
      res.status(500).json({ error: error.message || 'Internal server error' });
    }
  });
});
