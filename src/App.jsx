import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, LinearProgress, Typography, Box, AppBar, Toolbar } from '@mui/material';
import Grid from '@mui/material/Grid2';

import FavoriteIcon from '@mui/icons-material/Favorite';

const verbs = [
  {
    infinitive: 'manger',
    conjugations: {
      present: {
        je: 'mange',
        tu: 'manges',
        il: 'mange',
        nous: 'mangeons',
        vous: 'mangez',
        ils: 'mangent',
      },
    },
    sentence: 'Je _____ une pomme.',
    answer: 'mange',
  },
  {
    infinitive: 'parler',
    conjugations: {
      present: {
        je: 'parle',
        tu: 'parles',
        il: 'parle',
        nous: 'parlons',
        vous: 'parlez',
        ils: 'parlent',
      },
    },
    sentence: 'Nous _____ français.',
    answer: 'parlons',
  },
  {
    infinitive: 'finir',
    conjugations: {
      present: {
        je: 'finis',
        tu: 'finis',
        il: 'finit',
        nous: 'finissons',
        vous: 'finissez',
        ils: 'finissent',
      },
    },
    sentence: 'Ils _____ leurs devoirs.',
    answer: 'finissent',
  },
  {
    infinitive: 'choisir',
    conjugations: {
      present: {
        je: 'choisis',
        tu: 'choisis',
        il: 'choisit',
        nous: 'choisissons',
        vous: 'choisissez',
        ils: 'choisissent',
      },
    },
    sentence: 'Vous _____ un livre.',
    answer: 'choisissez',
  },
  {
    infinitive: 'être',
    conjugations: {
      present: {
        je: 'suis',
        tu: 'es',
        il: 'est',
        nous: 'sommes',
        vous: 'êtes',
        ils: 'sont',
      },
    },
    sentence: 'Tu _____ très intelligent.',
    answer: 'es',
  },
  {
    infinitive: 'avoir',
    conjugations: {
      present: {
        je: 'ai',
        tu: 'as',
        il: 'a',
        nous: 'avons',
        vous: 'avez',
        ils: 'ont',
      },
    },
    sentence: 'Elle _____ un chat noir.',
    answer: 'a',
  },
  {
    infinitive: 'aller',
    conjugations: {
      present: {
        je: 'vais',
        tu: 'vas',
        il: 'va',
        nous: 'allons',
        vous: 'allez',
        ils: 'vont',
      },
    },
    sentence: 'Nous _____ à la plage.',
    answer: 'allons',
  },
  {
    infinitive: 'prendre',
    conjugations: {
      present: {
        je: 'prends',
        tu: 'prends',
        il: 'prend',
        nous: 'prenons',
        vous: 'prenez',
        ils: 'prennent',
      },
    },
    sentence: 'Je _____ un café chaque matin.',
    answer: 'prends',
  },
  {
    infinitive: 'venir',
    conjugations: {
      present: {
        je: 'viens',
        tu: 'viens',
        il: 'vient',
        nous: 'venons',
        vous: 'venez',
        ils: 'viennent',
      },
    },
    sentence: 'Ils _____ de Paris.',
    answer: 'viennent',
  },
  {
    infinitive: 'faire',
    conjugations: {
      present: {
        je: 'fais',
        tu: 'fais',
        il: 'fait',
        nous: 'faisons',
        vous: 'faites',
        ils: 'font',
      },
    },
    sentence: 'Nous _____ du sport tous les jours.',
    answer: 'faisons',
  },
];

function InputConjugation({ currentVerb, onCheck, onNext, lives, progress, feedback, errors, answers, handleInputChange }) {
  return (
    <>
      <Box sx={{ textAlign: `center` }} mb={2}>
        <Typography variant="h6">
          Conjugate: <strong>{currentVerb.infinitive}</strong>
        </Typography>
        <LinearProgress variant="determinate" value={progress} sx={{ mt: 2 }} />
      </Box>

      <Box sx={{ textAlign: `center` }} mb={2}>
        {Array.from({ length: lives }).map((_, i) => (
          <FavoriteIcon key={i} color="error" />
        ))}
      </Box>

      <Grid container spacing={2}>
        {Object.keys(currentVerb.conjugations.present).map((pronoun) => (
          <Grid item xs={4} key={pronoun}>
            <Typography>{pronoun}</Typography>
            <TextField
              fullWidth
              variant="outlined"
              error={errors[pronoun]}
              helperText={errors[pronoun] ? 'Incorrect' : ''}
              value={answers[pronoun] || ''}
              onChange={(e) => handleInputChange(pronoun, e.target.value)}
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: `center` }} mt={2}>
        <Button variant="contained" color="primary" onClick={onCheck}>
          Check Answers
        </Button>
        {feedback && (
          <Typography variant="body1" sx={{ mt: 1 }}>
            {feedback}
          </Typography>
        )}
      </Box>
    </>
  );
}

function FillInTheBlank({ currentVerb, onCheck, lives, progress, feedback }) {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleCheck = () => {
    const correctAnswer = currentVerb.answer;
    onCheck(selectedOption === correctAnswer);
  };

  useEffect(() => {
    const shuffledOptions = [...new Set(Object.values(currentVerb.conjugations.present)), 'Bricoler', 'Ébouriffant'].sort(() => Math.random() - 0.5);
    setOptions(shuffledOptions);
  }, [currentVerb]);

  return (
    <>
      <AppBar position="fixed" sx={{ top: 0, bottom: 'auto' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="body1">texte à trous</Typography>
          <Box>
            {Array.from({ length: lives }).map((_, i) => (
              <FavoriteIcon key={i} color="inherit" sx={{ fontSize: `.9rem` }} />
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        sx={{ textAlign: `center`, display: `flex`, flexDirection: `column`, justifyContent: `space-between`, height: `calc(100vh - 200px)` }}
        mt={'80px'}
        mb={2}
      >
        <LinearProgress variant="determinate" value={progress} sx={{ mt: 2 }} />
        <Typography variant="h3" sx={{ mt: 1 }}>
          {currentVerb.sentence.replace('_____', '_____')}
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {options.map((option, index) => (
            <Grid key={index}>
              <Button variant={selectedOption === option ? 'contained' : 'outlined'} onClick={() => setSelectedOption(option)}>
                {option}
              </Button>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: `center` }} mt={2}>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {feedback ? feedback : 'You got this!'}
          </Typography>
        </Box>
      </Box>

      <AppBar position="fixed" color="transparent" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Button variant="text" color="#fff" onClick={handleCheck} disabled={!selectedOption}>
              Check Answer
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

function FrenchVerbGame() {
  const [currentVerbIndex, setCurrentVerbIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [lives, setLives] = useState(5);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [errors, setErrors] = useState({});
  const [selectedGame, setSelectedGame] = useState(null);

  const currentVerb = verbs[currentVerbIndex];

  const handleInputChange = (pronoun, value) => {
    setAnswers({ ...answers, [pronoun]: value });
    setErrors({ ...errors, [pronoun]: false });
  };

  const checkConjugationAnswers = () => {
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
      setFeedback('Correct! Well done!');
      nextVerb();
    } else {
      setFeedback('Some answers are incorrect. Check the highlighted fields.');
      setLives(lives - 1);
    }
  };

  const checkFillInBlank = (isCorrect) => {
    if (isCorrect) {
      setFeedback('Correct! Well done!');
      nextVerb();
    } else {
      setFeedback('Incorrect! Try again.');
      setLives(lives - 1);
    }
  };

  const nextVerb = () => {
    setProgress(((currentVerbIndex + 1) / verbs.length) * 100);
    if (currentVerbIndex < verbs.length - 1) {
      setCurrentVerbIndex(currentVerbIndex + 1);
    } else {
      setSelectedGame(null); // Go back to game selection
    }
    setAnswers({});
    setFeedback(null);
  };

  if (!selectedGame) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: `center` }}>
        <Box sx={{ textAlign: `center` }} mt={5}>
          <Typography variant="h4">French Verb Game</Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => setSelectedGame('conjugation')}>
            Input Conjugations
          </Button>
          <Button variant="contained" color="secondary" sx={{ mt: 2, ml: 2 }} onClick={() => setSelectedGame('fillBlank')}>
            Fill in the Blank
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      {selectedGame === 'conjugation' && (
        <InputConjugation
          currentVerb={currentVerb}
          onCheck={checkConjugationAnswers}
          lives={lives}
          progress={progress}
          feedback={feedback}
          errors={errors}
          answers={answers}
          handleInputChange={handleInputChange}
        />
      )}
      {selectedGame === 'fillBlank' && (
        <FillInTheBlank currentVerb={currentVerb} onCheck={checkFillInBlank} lives={lives} progress={progress} feedback={feedback} />
      )}
    </Container>
  );
}

export default FrenchVerbGame;
