import { createTheme } from '@mui/material/styles';

// Common typography settings
const typography = {
  fontFamily: "'Source Sans Pro', 'Arial', sans-serif",
  fontSize: 16,
  lineHeight: 1.75,
  h1: { fontSize: '2.2rem', fontWeight: 700 },
  h2: { fontSize: '1.8rem', fontWeight: 700 },
  h3: { fontSize: '1.5rem', fontWeight: 600 },
  body1: { fontSize: '1rem', lineHeight: 1.6 },
  button: { fontSize: '1.1rem', fontWeight: 600, textTransform: 'none' },
};

// Light Theme
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#222222', light: '#444444', dark: '#111111', contrastText: '#ffffff' },
    secondary: { main: '#bfb8ae' },
    background: { default: '#faf8f5', paper: '#eae4dc' },
    text: { primary: '#1a1a1a', secondary: '#424242' },
    divider: '#bfb8ae',
  },
  typography,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          minHeight: '44px',
          '&:hover': { backgroundColor: '#bfb8ae', transform: 'translateY(-2px)' },
        },
      },
    },
  },
});

// Dark Theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#ffffff', light: '#bbbbbb', dark: '#f0f0f0', contrastText: '#222222' },
    secondary: { main: '#bfb8ae' },
    background: { default: '#222222', paper: '#333333' },
    text: { primary: '#ffffff', secondary: '#bbbbbb' },
    divider: '#444444',
  },
  typography,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          minHeight: '44px',
          '&:hover': { backgroundColor: '#666666', transform: 'translateY(-2px)' },
        },
      },
    },
  },
});

export { lightTheme, darkTheme };
