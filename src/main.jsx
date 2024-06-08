import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';

import store from './redux/store.js';
import theme from './utils/theme.js';
import App from './App.jsx';
import './index.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>

      <ThemeProvider theme={theme}>
        <BrowserRouter basename='/spacescutum/'>
          <CssBaseline />
          <App />
        </BrowserRouter>
      </ThemeProvider>

    </Provider>
  </React.StrictMode>,
)
