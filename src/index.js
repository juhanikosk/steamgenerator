import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './styles.scss';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#7a879b',
            main: '#444d5b',
            dark: '#323944',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
    },
});

ReactDOM.render(<MuiThemeProvider theme={theme}>
    <App />
</MuiThemeProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
