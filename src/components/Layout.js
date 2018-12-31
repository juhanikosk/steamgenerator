import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withWidth } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

import Logo from '../images/globalheader_logo.png';


const styles = theme => ({
    root: {
        flexGrow: 1,
        height: "100%"
    },
    logo: {
        [theme.breakpoints.down('xs')]: {
            width: "30%",
        },
    },
    Header: {
        flexGrow: 1
    },
    StaticAbout: {
        position: 'fixed',
        bottom: 5,
        right: 5,
        zIndex: 10
    }
});


const SimpleAppBar = (props) => {
    const { classes, width } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static" color="primary">
                {props.loading ? <LinearProgress color="secondary" /> : null}
                <Toolbar>
                    <img src={Logo} className={classes.logo} alt="Logo" />
                    <Typography variant="h6" color="inherit" className={classes.Header}>
                        Random Game Selector
                    </Typography>
                    {width !== 'xs'
                        ? <Button
                            color="inherit"
                            onClick={() => window.open('https://juhani-koskinen.tk/projects')}>
                            About
                        </Button>
                        : <Button
                            className={classes.StaticAbout}
                            variant="contained"
                            color="primary"
                            onClick={() => window.open('https://juhani-koskinen.tk/projects')}>
                            About
                        </Button>}
                </Toolbar>
            </AppBar>
            {props.children}
        </div>
    );
}


SimpleAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withWidth(SimpleAppBar)(withStyles(styles)(SimpleAppBar));