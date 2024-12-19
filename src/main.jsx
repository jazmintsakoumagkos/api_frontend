import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import store from './redux/store';
import App from './App';

const theme = createTheme({
  palette: {
    primary: {
      main: '#D4A373', 
    },
    secondary: {
      main: '#8B5E3C', 
    },
    background: {
      default: '#F5EFE6', 
      paper: '#FFF7E6', 
    },
    text: {
      primary: '#4A4A4A', 
      secondary: '#8B5E3C', 
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: {
      fontWeight: 700,
    },
    body1: {
      fontWeight: 400,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);