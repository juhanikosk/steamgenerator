import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
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
    }
});

function SimpleAppBar(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static" color="primary">
                {props.loading ? <LinearProgress color="secondary" /> : null}
                <Toolbar>
                    <img src={Logo} className={classes.logo} alt="Logo" />
                    <Typography variant="h6" color="inherit">
                        Random Game Selector
                    </Typography>
                </Toolbar>
            </AppBar>
            {props.children}
        </div>
    );
}

SimpleAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleAppBar);