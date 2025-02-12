import React, { useState, useEffect } from 'react';
import { TextField, Button, LinearProgress, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

function InputConjugation({ verbs, setSelectedGame }) {
  const [currentVerbIndex, setCurrentVerbIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [lives, setLives] = useState(5);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [errors, setErrors] = useState({});
  const [stats, setStats] = useState({});

  const [correctResponses, setCorrectResponses] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const currentVerb = verbs[currentVerbIndex];

  const handleInputChange = (pronoun, value) => {
    setAnswers({ ...answers, [pronoun]: value });
    setErrors({ ...errors, [pronoun]: false });
  };

  const nextVerb = () => {
    setProgress(((currentVerbIndex + 1) / verbs.length) * 100);
    if (currentVerbIndex < verbs.length - 1) {
      setCurrentVerbIndex(currentVerbIndex + 1);
    } else {
      setGameOver(true);
    }
    setFeedback(null);
  };

  const checkConjugationAnswers = () => {
    setTotalAttempts(totalAttempts + 1);
    const correctAnswers = currentVerb.conjugations.present;
    let allCorrect = true;
    const newErrors = {};

    for (const pronoun in correctAnswers) {
      if (answers[pronoun]?.toLowerCase() !== correctAnswers[pronoun]) {
        allCorrect = false;
        newErrors[pronoun] = true;
      } else {
        newErrors[pronoun] = false;
      }
    }

    setErrors(newErrors);

    if (allCorrect) {
      setCorrectResponses(correctResponses + 1);
      setFeedback('Correct ! Bien joué !');
      setAnswers({});
      nextVerb();
    } else {
      setFeedback('Certaines réponses sont erronées. Vérifie les champs indiqués.');
      setLives(lives - 1);
      if ('vibrate' in navigator) {
        setTimeout(() => navigator.vibrate([300, 100, 300]), 0);
      } else {
        // Fallback for iOS: add a shake effect
        document.body.classList.add('shake');
        setTimeout(() => document.body.classList.remove('shake'), 300);
      }
      if (lives === 1) {
        setGameOver(true);
      }
    }
  };

  useEffect(() => {
    setStats({
      verbsCompleted: currentVerbIndex + 1,
      totalVerbs: verbs.length,
      accuracy: totalAttempts > 0 ? ((correctResponses / totalAttempts) * 100).toFixed(2) : 0,
    });
  }, [currentVerbIndex, totalAttempts, correctResponses, verbs.length]);

  return (
    <>
      {gameOver ? (
        <Box sx={{ textAlign: `center`, display: `flex`, flexDirection: `column`, justifyContent: `space-between`, height: `calc(100vh - 200px)` }}>
          <h1>Tâche terminée !</h1>
          <Box>
            <div>📊 Progression : {progress}%</div>
            <div>✅ Verbes terminés : {stats.verbsCompleted}</div>
            <div>📖 Total des verbes : {stats.totalVerbs}</div>
            <div>🎯 Précision : {stats.accuracy}%</div>
            <div>❤️ Lives : {lives}</div>
          </Box>
          <Button variant="contained" onClick={() => setSelectedGame(null)}>
            Retour au menu
          </Button>
        </Box>
      ) : (
        <>
          <Box mb={3}>
            <Box sx={{ display: `flex`, justifyContent: `space-between`, alignItems: `center` }}>
              <Box>
                <FavoriteIcon
                  color="error"
                  sx={{
                    fontSize: `.9rem`,
                  }}
                />
                {Array.from({ length: lives }).map((_, i) => (
                  <FavoriteIcon
                    key={i}
                    color="error"
                    sx={{
                      fontSize: `.9rem`,
                      opacity: i >= lives - 1 && lives > 0 ? 0 : 1, // Fade out the last icons as lives lower
                      transition: 'opacity 0.5s ease-out', // Apply fade-out effect
                    }}
                  />
                ))}
              </Box>
              <ThemeToggle />
            </Box>
            <LinearProgress variant="determinate" value={progress} />
          </Box>

          <Box sx={{ textAlign: `center` }} mb={2}>
            <motion.div
              key={currentVerb.infinitive} // Ensures animation triggers when content changes
              initial={{ opacity: 0, scale: 1.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <Typography variant="h3">
                <strong>{currentVerb.infinitive}</strong>
              </Typography>
            </motion.div>
          </Box>

          <Grid container spacing={2} justifyContent="center">
            {Object.keys(currentVerb.conjugations.present).map((pronoun, index) => (
              <Grid size={6} key={pronoun}>
                <motion.div
                  key={pronoun}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Typography component="label" htmlFor={`input-${pronoun}`}>
                    {pronoun}
                  </Typography>
                  <TextField
                    id={`input-${pronoun}`}
                    fullWidth
                    variant="outlined"
                    error={errors[pronoun]}
                    helperText={errors[pronoun] ? 'Incorrect' : ''}
                    value={answers[pronoun] || ''}
                    onChange={(e) => handleInputChange(pronoun, e.target.value)}
                  />
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: `center` }} mt={2} pt={2}>
            {feedback && (
              <Typography variant="body1" sx={{ mb: 2, mt: 1 }}>
                {feedback}
              </Typography>
            )}
            <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={checkConjugationAnswers}>
              Vérifie ta réponse
            </Button>
          </Box>
        </>
      )}
    </>
  );
}

export default InputConjugation;
