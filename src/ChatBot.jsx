import React, { useState } from 'react';
import { Card, CardContent, IconButton, TextField, Typography } from '@mui/material';
import { Send, Close } from '@mui/icons-material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { motion } from 'framer-motion';

const Chatbot = (props) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ sender: 'bot', text: 'Bonjour! Ask me about French verb conjugations.' }]);
  const [input, setInput] = useState(
    `You are a top French Canadian language tutor, helping grade 6–8 students with verb conjugations. The verb context is ${props.currentVerb}. Provide a hint in the shortest, most concise way possible.`
  );

  // Function to send message to OpenAI API
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch('https://us-central1-verb-trainer.cloudfunctions.net/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      // Log the raw response to debug
      const rawData = await response.text(); // Get raw response text
      console.log('Raw response:', rawData);

      // Check for successful response
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Try to parse JSON
      const data = JSON.parse(rawData);
      const botReply = data.reply || 'Je ne comprends pas.';

      setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Oops! Something went wrong.' }]);
    }

    setInput('');
  };

  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}>
      {/* Chat Button */}
      {!open && (
        <IconButton
          component={motion.div}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => {
            setOpen(true);
            sendMessage();
          }}
          // style={{ backgroundColor: '#1976d2', color: 'white', boxShadow: '2px 2px 10px rgba(0,0,0,0.2)' }}
        >
          <AutoAwesomeIcon />
        </IconButton>
      )}

      {/* Chat Window */}
      {open && (
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
          <Card sx={{ width: 300, maxHeight: 400, display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <CardContent sx={{ flex: 1, overflowY: 'auto', paddingBottom: '10px' }}>
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: msg.sender === 'user' ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  style={{
                    textAlign: msg.sender === 'user' ? 'right' : 'left',
                    marginBottom: '8px',
                  }}
                >
                  <Typography
                    sx={{
                      display: 'inline-block',
                      padding: '8px 12px',
                      borderRadius: '12px',
                      backgroundColor: msg.sender === 'user' ? '#1976d2' : '#e0e0e0',
                      color: msg.sender === 'user' ? 'white' : 'black',
                    }}
                  >
                    {msg.text}
                  </Typography>
                </motion.div>
              ))}
            </CardContent>

            {/* Input Field */}
            <div style={{ display: 'flex', padding: '10px', borderTop: '1px solid #ddd' }}>
              {/* <TextField
                variant="outlined"
                size="small"
                fullWidth
                placeholder="Ask a question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              />
              <IconButton color="primary" onClick={sendMessage}>
                <Send />
              </IconButton> */}
              <IconButton onClick={() => setOpen(false)} fontSize="small">
                <Close />
              </IconButton>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default Chatbot;
