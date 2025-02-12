import React, { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';
import { IconButton } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const { mode, toggleTheme } = useContext(ThemeContext);

  return (
    <IconButton onClick={toggleTheme} sx={{ position: 'relative', overflow: 'hidden' }}>
      <motion.div
        key={mode === 'dark' ? 'moon' : 'sun'}
        initial={{ y: 20, opacity: 0, rotate: mode === 'dark' ? -180 : 180 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        exit={{ y: -20, opacity: 0, rotate: mode === 'dark' ? 180 : -180 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        style={{ height: `35px`, width: `35px` }}
      >
        {mode === 'light' ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
      </motion.div>
    </IconButton>
  );
};

export default ThemeToggle;
