import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'whatwg-fetch';
import 'promise-polyfill/src/polyfill';
import * as serviceWorker from './serviceWorker';
import './styles.scss';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#C6C5C5',
            main: '#686868',
            dark: '#303030',
            contrastText: '#fff',
        },
        secondary: grey
    },
    typography: {
        useNextVariants: true
    },
});

ReactDOM.render(<MuiThemeProvider theme={theme}>
    <App />
</MuiThemeProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
