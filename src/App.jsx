import React, { useState } from 'react';
import { Container, TextField, Button, LinearProgress, Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';

import FavoriteIcon from '@mui/icons-material/Favorite';

import FillInTheBlank from './FillBlanks';
import InputConjugation from './InputConjugations';

const verbs = [
  {
    infinitive: 'manger',
    conjugations: {
      present: {
        je: 'mange',
        tu: 'manges',
        'il/elle': 'mange',
        nous: 'mangeons',
        vous: 'mangez',
        'elles/ils': 'mangent',
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
        'il/elle': 'parle',
        nous: 'parlons',
        vous: 'parlez',
        'elles/ils': 'parlent',
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
        'il/elle': 'finit',
        nous: 'finissons',
        vous: 'finissez',
        'elles/ils': 'finissent',
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
        'il/elle': 'choisit',
        nous: 'choisissons',
        vous: 'choisissez',
        'elles/ils': 'choisissent',
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
        'il/elle': 'est',
        nous: 'sommes',
        vous: 'êtes',
        'elles/ils': 'sont',
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
        'il/elle': 'a',
        nous: 'avons',
        vous: 'avez',
        'elles/ils': 'ont',
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
        'il/elle': 'va',
        nous: 'allons',
        vous: 'allez',
        'elles/ils': 'vont',
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
        'il/elle': 'prend',
        nous: 'prenons',
        vous: 'prenez',
        'elles/ils': 'prennent',
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
        'il/elle': 'vient',
        nous: 'venons',
        vous: 'venez',
        'elles/ils': 'viennent',
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
        'il/elle': 'fait',
        nous: 'faisons',
        vous: 'faites',
        'elles/ils': 'font',
      },
    },
    sentence: 'Nous _____ du sport tous les jours.',
    answer: 'faisons',
  },
];

function FrenchVerbGame() {
  const [selectedGame, setSelectedGame] = useState(null);

  if (!selectedGame) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: `center` }}>
        <Box sx={{ textAlign: `center`, display: `flex`, flexDirection: `column` }} mt={5}>
          <Typography variant="h4">RépétitionsVerbe</Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => setSelectedGame('conjugation')}>
            Conjuguer Compétence
          </Button>
          <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={() => setSelectedGame('fillBlank')}>
            Texte à Trous
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" disableGutters>
      {selectedGame === 'conjugation' && <InputConjugation verbs={verbs} setSelectedGame={setSelectedGame} />}
      {selectedGame === 'fillBlank' && <FillInTheBlank verbs={verbs} setSelectedGame={setSelectedGame} />}
    </Container>
  );
}

export default FrenchVerbGame;
