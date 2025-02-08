import React, { useState, useEffect } from 'react';
import { Button, LinearProgress, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';

import FavoriteIcon from '@mui/icons-material/Favorite';

function FillInTheBlank({ verbs }) {
  const [currentVerbIndex, setCurrentVerbIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [progress, setProgress] = useState(0);
  const [lives, setLives] = useState(5);

  const currentVerb = verbs[currentVerbIndex];

  const handleCheck = (event) => {
    event.target.blur();
    const correctAnswer = currentVerb.answer;
    onCheck(selectedOption === correctAnswer);
  };

  const onCheck = (isCorrect) => {
    if (isCorrect) {
      setFeedback('Correct! Well done!');
      nextVerb();
      setSelectedOption(null);
    } else {
      setFeedback('Incorrect! Try again.');
      setLives(lives - 1);
      if (navigator.vibrate) {
        navigator.vibrate(200); // Vibrates for 200ms
      }
    }
  };

  const nextVerb = () => {
    setProgress(((currentVerbIndex + 1) / verbs.length) * 100);
    if (currentVerbIndex < verbs.length - 1) {
      setCurrentVerbIndex(currentVerbIndex + 1);
    }
    setFeedback(null);
  };

  useEffect(() => {
    const shuffledOptions = [...new Set(Object.values(currentVerb.conjugations.present)), 'Bricoler', 'Ébouriffant'].sort(() => Math.random() - 0.5);
    setOptions(shuffledOptions);
  }, [currentVerb]);

  return (
    <>
      <Box>
        {Array.from({ length: lives }).map((_, i) => (
          <FavoriteIcon key={i} color="inherit" sx={{ fontSize: `.9rem` }} />
        ))}
        <LinearProgress variant="determinate" value={progress} />
      </Box>

      <Box
        sx={{ textAlign: `center`, display: `flex`, flexDirection: `column`, justifyContent: `space-between`, height: `calc(100vh - 200px)` }}
        mt={'80px'}
        mb={2}
      >
        <Typography variant="h3">{currentVerb.sentence.replace('_____', selectedOption || '_____')}</Typography>

        <Grid container spacing={2} justifyContent="center">
          {options.map((option, index) => (
            <Grid key={index}>
              <Button variant={selectedOption === option ? 'contained' : 'outlined'} onClick={() => setSelectedOption(option)}>
                {option}
              </Button>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: `center` }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {feedback ? feedback : 'You got this!'}
          </Typography>
          <Button variant="outlined" color="#fff" onClick={handleCheck} disabled={!selectedOption}>
            Check Answer
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default FillInTheBlank;
