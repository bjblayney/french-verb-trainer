import React, { useState } from 'react';
import { Card, CardContent, IconButton, Typography, CircularProgress } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';

const HintBox = ({ currentVerb }) => {
  const [open, setOpen] = useState(false);
  const [hint, setHint] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchHint = async () => {
    setLoading(true);
    setError('');

    // const prompt = `You are a top French Canadian language tutor, helping grade 6–8 students with verb conjugations. The verb context is ${currentVerb}. Provide a hint in the shortest, most concise way possible.`;
    const prompt = `You are a top French Canadian language tutor, helping grade 6–8 students with verb conjugations. The verb context is: ${
      typeof currentVerb === 'object' ? JSON.stringify(currentVerb) : currentVerb
    }. Provide a robust hint in the shortest, most concise way possible. Use simple french language examples similar to the "sentence" from the verb context. `;

    try {
      const response = await fetch('https://us-central1-verb-trainer.cloudfunctions.net/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: prompt }),
      });

      if (!response.ok) throw new Error('Failed to fetch hint.');

      const data = await response.json();
      setHint(data.reply || 'Pas de réponse.');
    } catch (err) {
      setError('Oops! Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setHint('');
    setError('');
  };

  return (
    <div style={{ zIndex: 1000 }}>
      {/* Hint Button */}
      {!open && (
        <IconButton
          component={motion.div}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => {
            setOpen(true);
            fetchHint();
          }}
        >
          <AutoAwesomeIcon />
        </IconButton>
      )}

      {/* Hint Box */}
      {open && (
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
          <Card sx={{ width: 250, position: 'relative', padding: '10px' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {loading ? (
                <CircularProgress size={24} />
              ) : error ? (
                <Typography color="error">{error}</Typography>
              ) : (
                <Typography sx={{ textAlign: 'center', fontSize: '14px' }}>{hint}</Typography>
              )}
            </CardContent>

            {/* Close Button */}
            <IconButton onClick={handleClose} size="small" sx={{ position: 'absolute', top: 5, right: 5 }}>
              <CloseIcon />
            </IconButton>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default HintBox;
