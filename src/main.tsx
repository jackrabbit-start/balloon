import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import App from './App';
import { DarkmodeContext, DarkmodeProvider } from './context/contextMode';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const GlobalStyle = createGlobalStyle`
  body * {
    color:${(props) => props.theme.Color};
    background-color:${(props) => props.theme.BackgroundColor};

  }
`;

root.render(
  <React.StrictMode>
    <DarkmodeProvider>
      <DarkmodeContext.Consumer>
        {({ theme }) => (
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <App />
          </ThemeProvider>
        )}
      </DarkmodeContext.Consumer>
    </DarkmodeProvider>
  </React.StrictMode>
);
