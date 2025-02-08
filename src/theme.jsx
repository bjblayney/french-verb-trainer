import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#005bbb', // Accessible blue
      light: '#0073e6',
      dark: '#004799',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff6f00', // Orange for contrast
    },
    background: {
      default: '#ffffff',
      paper: '#f5f5f5',
    },
    text: {
      primary: '#212121',
      secondary: '#424242',
    },
  },
  typography: {
    fontFamily: "'Source Sans Pro', 'Arial', sans-serif",
    fontSize: 18, // Larger base font size
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
          padding: '0.8em 1.5em',
          minHeight: '44px', // WCAG guideline for touch targets
          '&:hover': {
            backgroundColor: '#004799',
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
