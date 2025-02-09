import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#222222', // Strong black for primary elements
      light: '#444444', // Lighter black for subtle highlights
      dark: '#111111', // Deep black for depth
      contrastText: '#ffffff', // White text for high contrast
    },
    secondary: {
      main: '#bfb8ae', // Taupe accent for warmth
    },
    background: {
      default: '#faf8f5', // Off-white, mimicking paper
      paper: '#eae4dc', // Slightly darker taupe for cards
    },
    text: {
      primary: '#1a1a1a', // High-contrast black
      secondary: '#424242', // Softer dark grey
    },
    divider: '#bfb8ae', // Taupe-colored dividers for subtle separation
  },
  typography: {
    fontFamily: "'Source Sans Pro', 'Arial', sans-serif",
    fontSize: 16, // Larger base font size
    lineHeight: 1.75,
    h1: {
      fontSize: '2.2rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '1.8rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    body1: { fontSize: '1rem', lineHeight: 1.6 },
    button: {
      fontSize: '1.1rem',
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          // padding: '0.8em 1.5em',
          minHeight: '44px', // WCAG guideline for touch targets
          '&:hover': {
            backgroundColor: '#bfb8ae',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h1',
          h2: 'h2',
          h3: 'h3',
        },
      },
    },
  },
});

export default theme;
