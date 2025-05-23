import { createTheme } from '@mui/material/styles';

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? '#2E7D32' : '#4CAF50', // light: green[800], dark: green[500]
      dark: mode === 'light' ? '#1B5E20' : '#2E7D32', // light: green[900], dark: green[800]
      light: mode === 'light' ? '#4CAF50' : '#66BB6A', // light: green[500], dark: green[400]
      contrastText: '#fff',
    },
    secondary: {
      main: mode === 'light' ? '#66BB6A' : '#81C784', // light: green[400], dark: green[300]
      dark: mode === 'light' ? '#43A047' : '#66BB6A', // light: green[600], dark: green[400]
      light: mode === 'light' ? '#81C784' : '#A5D6A7', // light: green[300], dark: green[200]
      contrastText: mode === 'light' ? '#000' : '#000',
    },
    background: {
      default: mode === 'light' ? '#ffffff' : '#1A1C1E', // white : dark gray with slight blue tint
      paper: mode === 'light' ? '#F5F5F5' : '#242628', // grey[100] : slightly lighter dark gray
    },
    text: {
      primary: mode === 'light' ? '#2E2E2E' : '#FFFFFF',
      secondary: mode === 'light' ? '#616161' : '#B0BEC5', // grey[700] : blueGrey[200]
    },
    divider: mode === 'light' ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)',
    action: {
      active: mode === 'light' ? 'rgba(0, 0, 0, 0.54)' : 'rgba(255, 255, 255, 0.7)',
      hover: mode === 'light' ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.08)',
      selected: mode === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.16)',
      disabled: mode === 'light' ? 'rgba(0, 0, 0, 0.26)' : 'rgba(255, 255, 255, 0.3)',
      disabledBackground: mode === 'light' ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          padding: '8px 16px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: mode === 'light' 
              ? '0 4px 8px rgba(0,0,0,0.1)' 
              : '0 4px 8px rgba(0,0,0,0.4)',
          },
        },
        containedPrimary: {
          background: mode === 'light' 
            ? 'linear-gradient(45deg, #2E7D32 30%, #43A047 90%)'
            : 'linear-gradient(45deg, #4CAF50 30%, #66BB6A 90%)',
          boxShadow: mode === 'light'
            ? '0 2px 4px rgba(0,0,0,0.2)'
            : '0 2px 4px rgba(0,0,0,0.4)',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
        fullWidth: true,
        variant: 'outlined',
      },
      styleOverrides: {
        root: ({ theme }) => ({
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            transition: 'all 0.2s ease-in-out',
            '& fieldset': {
              borderColor: theme.palette.mode === 'light' ? '#90A4AE' : 'rgba(255, 255, 255, 0.23)',
            },
            '&:hover fieldset': {
              borderColor: theme.palette.primary.main,
            },
            '&.Mui-focused fieldset': {
              borderColor: theme.palette.primary.main,
              borderWidth: '2px',
            },
          },
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: '12px',
          backgroundColor: theme.palette.mode === 'dark' ? '#2A2D2F' : theme.palette.background.paper,
          boxShadow: theme.palette.mode === 'light'
            ? '0 2px 4px rgba(0,0,0,0.1)'
            : '0 2px 4px rgba(0,0,0,0.4)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: theme.palette.mode === 'light'
              ? '0 4px 8px rgba(0,0,0,0.2)'
              : '0 4px 8px rgba(0,0,0,0.6)',
          },
        }),
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'hover',
      },
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
          transition: 'color 0.2s ease-in-out',
          '&:hover': {
            color: theme.palette.primary.light,
          },
        }),
      },
    },
  },
  typography: {
    h4: {
      fontWeight: 500,
      letterSpacing: '0.5px',
    },
    label: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
});

// Create a theme instance for light mode
const lightTheme = createTheme(getDesignTokens('light'));
// Create a theme instance for dark mode
const darkTheme = createTheme(getDesignTokens('dark'));

export { lightTheme, darkTheme }; 