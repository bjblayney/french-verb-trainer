import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, CircularProgress, Typography, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const HintBox = ({ currentVerb }) => {
  const [open, setOpen] = useState(false);
  const [hint, setHint] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchHint = async () => {
    setLoading(true);
    setHint('');

    // Format `currentVerb`
    const verbContext = typeof currentVerb === 'object' ? JSON.stringify(currentVerb) : currentVerb;

    try {
      const response = await fetch('https://us-central1-verb-trainer.cloudfunctions.net/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `You are a top French Canadian language tutor, helping grade 6–8 students with verb conjugations. The verb context is: ${verbContext}. Provide a hint in the shortest, most concise way possible. Use simple french language examples similar to the "sentence" from the verb context.`,
        }),
      });

      const data = await response.json();
      setHint(data.reply || 'Je ne comprends pas.');
    } catch (error) {
      console.error('Error fetching hint:', error);
      setHint('Oops! Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
    fetchHint();
  };

  const handleClose = () => {
    setOpen(false);
    setHint(''); // Clear hint on close
  };

  return (
    <>
      {/* Button to open the hint dialog */}
      <IconButton color="primary" onClick={handleOpen}>
        <AutoAwesomeIcon />
      </IconButton>

      {/* MUI Dialog for Hint */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Indice</DialogTitle>
        <DialogContent>
          {loading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress size={24} />
            </Box>
          ) : (
            <Typography align="center">{hint || 'pensée...'}</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default HintBox;
