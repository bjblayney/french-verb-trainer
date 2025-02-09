import React, { useState, useEffect } from 'react';
import { Button, LinearProgress, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { motion } from 'framer-motion';
import EndGameScreen from './EndGame';

function FillInTheBlank({ verbs, setSelectedGame }) {
  const [currentVerbIndex, setCurrentVerbIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const [feedback, setFeedback] = useState(null);
  const [progress, setProgress] = useState(0);

  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [lives, setLives] = useState(5);
  const [gameOver, setGameOver] = useState(false);

  const currentVerb = verbs[currentVerbIndex];

  const handleCheck = (event) => {
    event.target.blur();
    const correctAnswer = currentVerb.answer;
    onCheck(selectedOption === correctAnswer, selectedOption);
  };

  const feedbackMessages = {
    Bricoler:
      'Incorrect 🔧 Bricoler – Faire de petits travaux manuels ou des réparations avec les moyens du bord. (Exemple : Il aime bricoler des meubles en bois.)',
    Ébouriffant: 'Incorrect 😲 Ébouriffant – Très surprenant, impressionnant ou extraordinaire. (Exemple : Son spectacle était ébouriffant !)',
    Observer:
      'Incorrect 👀 Observer – Regarder attentivement pour mieux comprendre ou analyser. (Exemple : Le scientifique observe les étoiles avec un télescope.)',
  };

  const onCheck = (isCorrect) => {
    setTotalAttempts(totalAttempts + 1);

    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
      setFeedback('Correct ! Bien joué !');
      nextVerb();
      setSelectedOption(null);
    } else {
      setFeedback(feedbackMessages[selectedOption] || 'Incorrect ! Essaie encore !');
      setLives(lives - 1);
      // Vibrate if supported and triggered by user action
      if ('vibrate' in navigator) {
        setTimeout(() => navigator.vibrate([300, 100, 300]), 0);
      } else {
        // Fallback for iOS: add a shake effect
        document.body.classList.add('shake');
        setTimeout(() => document.body.classList.remove('shake'), 300);
      }
      setSelectedOption(null);
      if (lives === 1) {
        setGameOver(true);
      }
    }
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

  // Stats (for demonstration, adjust as necessary)
  const stats = {
    verbsCompleted: currentVerbIndex + 1,
    totalVerbs: verbs.length,
    accuracy: totalAttempts > 0 ? ((correctAnswers / totalAttempts) * 100).toFixed(2) : 0,
  };

  useEffect(() => {
    const shuffledOptions = [...new Set(Object.values(currentVerb.conjugations.present)), 'Bricoler', 'Ébouriffant', 'Observer'].sort(
      () => Math.random() - 0.5
    );
    setOptions(shuffledOptions);
  }, [currentVerb]);

  return (
    <>
      {gameOver ? (
        // <Box sx={{ textAlign: `center`, display: `flex`, flexDirection: `column`, justifyContent: `space-between`, height: `calc(100vh - 200px)` }}>
        //   <h1>Tâche terminée !</h1>
        //   <Box>
        //     <div>📊 Progression : {progress}%</div>
        //     <div>✅ Verbes terminés : {stats.verbsCompleted}</div>
        //     <div>📖 Total des verbes : {stats.totalVerbs}</div>
        //     <div>🎯 Précision : {stats.accuracy}%</div>
        //     <div>❤️ Lives : {lives}</div>
        //   </Box>
        //   <Button variant="contained" onClick={() => setSelectedGame(null)}>
        //     Retour au menu
        //   </Button>
        // </Box>
        <EndGameScreen progress={progress} stats={stats} lives={lives} setSelectedGame={setSelectedGame} />
      ) : (
        <>
          <Box mb={3}>
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
            <LinearProgress variant="determinate" value={progress} />
          </Box>

          <Box sx={{ textAlign: `center`, display: `flex`, flexDirection: `column`, justifyContent: `space-between`, height: `calc(100vh - 200px)` }}>
            <motion.div
              key={currentVerb.sentence} // Ensures animation triggers when content changes
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h3">{currentVerb.sentence.replace('_____', selectedOption || '_____')}</Typography>
            </motion.div>

            <Grid container spacing={2} justifyContent="center">
              {options.map((option, index) => (
                <motion.div
                  key={option}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Grid>
                    <Button variant={selectedOption === option ? 'contained' : 'outlined'} size="small" onClick={() => setSelectedOption(option)}>
                      {option}
                    </Button>
                  </Grid>
                </motion.div>
              ))}
            </Grid>

            <Box sx={{ textAlign: `center` }}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {feedback ? feedback : 'T’as ça !'}
              </Typography>
              <Button variant="outlined" sx={{ mb: 2 }} color="#fff" size="small" onClick={handleCheck} disabled={!selectedOption}>
                Vérifie ta réponse
              </Button>
            </Box>
          </Box>
        </>
      )}
    </>
  );
}

export default FillInTheBlank;
