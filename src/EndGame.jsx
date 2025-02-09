import { useState } from 'react';
import { Box, Button, Snackbar } from '@mui/material';

const EndGameScreen = ({ progress, stats, lives, setSelectedGame }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const generateShareText = () => {
    const totalBlocks = 10; // Length of the accuracy bar
    const filledBlocks = Math.round((stats.accuracy / 100) * totalBlocks);
    const emojiBar = '🔵'.repeat(filledBlocks) + '⚪'.repeat(totalBlocks - filledBlocks);

    return `🎯 Précision : ${stats.accuracy}%\n${emojiBar}\n📖 Verbes: ${stats.verbsCompleted}/${stats.totalVerbs}\n❤️ Vies: ${lives}\nEssayez ici: [Lien du jeu]`;
  };

  const handleShare = () => {
    const shareText = generateShareText();

    if (navigator.share) {
      // Use the Web Share API if available
      navigator
        .share({
          title: 'Mon jeu de verbes',
          text: shareText,
          url: window.location.href, // Optionally, share the current URL of the game
        })
        .then(() => setSnackbarOpen(true)) // Feedback after share
        .catch((error) => console.error('Error sharing:', error));
    } else {
      // Fallback: Copy to clipboard if Web Share API is not available
      navigator.clipboard.writeText(shareText).then(() => {
        setSnackbarOpen(true); // Show feedback
      });
    }
  };

  return (
    <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 'calc(100vh - 200px)' }}>
      <h1>Tâche terminée !</h1>
      <Box>
        <div>📊 Progression : {progress}%</div>
        <div>✅ Verbes terminés : {stats.verbsCompleted}</div>
        <div>📖 Total des verbes : {stats.totalVerbs}</div>
        <div>🎯 Précision : {stats.accuracy}%</div>
        <div>❤️ Vies : {lives}</div>
      </Box>
      <Button variant="contained" onClick={handleShare}>
        📤 Partager
      </Button>
      <Button variant="contained" onClick={() => setSelectedGame(null)}>
        Retour au menu
      </Button>

      {/* Snackbar feedback */}
      <Snackbar open={snackbarOpen} autoHideDuration={2000} onClose={() => setSnackbarOpen(false)} message="Partagé avec succès !" />
    </Box>
  );
};

export default EndGameScreen;
