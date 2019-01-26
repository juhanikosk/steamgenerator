import React, { Component } from 'react';
import { Paper, Typography, withStyles, Input, Button, Grid, Card, CardMedia, Snackbar, SnackbarContent } from '@material-ui/core';

import Layout from './components/Layout';
import Game from './components/Game';
import Guide from './images/guide.PNG';


const styles = theme => ({
    Paper: {
        padding: 20,
        minHeight: 'calc(100% - 64px - 40px)',
        [theme.breakpoints.down('sm')]: {
            minHeight: 'calc(100% - 54px - 40px)',
        },
    },
    GamePaper: {
        width: "100%",
        [theme.breakpoints.down('sm')]: {
            marginTop: 20
        },
        [theme.breakpoints.up('md')]: {
            marginLeft: 20
        },
    },
    Input: {
        marginBottom: 20
    },
    Text: {
        marginBottom: 10
    },
    media: {
        height: 200,
        [theme.breakpoints.up('lg')]: {
            height: 275
        },
        [theme.breakpoints.up('xl')]: {
            height: 350
        }
    },
    CardArea: {
        maxHeight: "100%",
        height: "100%"
    },
    PlaceholderText: {
        cursor: 'default'
    },
    error: {
        backgroundColor: theme.palette.error.dark
    }
});


const OWNED_GAMES_API_URL = "https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=17B2935E45B5C192D55E04F9A3EEAF03";


class App extends Component {
    state = {
        loading: false,
        game: null,
        open: false,
        message: '',
    }

    componentDidMount() {
        if (localStorage.getItem('steamId')) {
            this.setState({
                open: true,
                message: 'Steam ID loaded from the local storage.'
            });
        }
    }

    getSteamData = (event) => {
        event.preventDefault();
        const { value } = event.target[0];
        this.setState({ loading: true });
        fetch(`https://cors-anywhere.herokuapp.com/${OWNED_GAMES_API_URL}&steamid=${value}&include_appinfo=1&format=json`, {
            mode: 'cors'
        }).then(
            (data) => data.json().then(
                (json) => {
                    this.setState({ loading: false });
                    const { games } = json.response;
                    const game = games[Math.floor(Math.random() * games.length)];
                    this.setState({ game });
                    localStorage.setItem('steamId', value);
                }
            )
        ).catch((err) =>
            this.setState({
                loading: false,
                message: "Couldn't load the game library.",
                open: true,
                messageVariant: 'error'
            })
        );
    }

    render() {
        const { classes } = this.props;
        const snackbarProps = {
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
            },
            open: this.state.open,
            onClose: () => this.setState({ open: false }),
            autoHideDuration: 4000
        };

        return (
            <Layout loading={this.state.loading}>
                <Paper className={classes.Paper}>
                    <Grid container direction="row">
                        <Grid container item sm={12} md={6} lg={4} direction="row" alignContent="flex-start">
                            <Grid item xs={12} sm={10} md={12} xl={10}>
                                <Card style={{ marginBottom: 20, height: "50px" }}>
                                    <CardMedia src="img">
                                        <img src={Guide} width="100%" height="50px" alt="Steam id is part of the profile URL"></img>
                                    </CardMedia>
                                </Card>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body1" className={classes.Text}>
                                    Please type in your steam id, so that a random game can be selected from your game library.
                                    You can find your steam ID from your steam profile's url. You can also use services
                                    like <a href="https://steamidfinder.com/">Steam ID Finder</a> to get your account's ID.
                                </Typography>
                            </Grid>
                            <form onSubmit={this.getSteamData} style={{ width: "100%" }}>
                                <Grid item xs={12}>
                                    <Input
                                        className={classes.Input}
                                        fullWidth
                                        placeholder="Enter your steam account name..."
                                        defaultValue={localStorage.getItem('steamId')}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button fullWidth variant="contained" color="primary" type="submit" disabled={this.state.loading}>Submit</Button>
                                </Grid>
                            </form>
                        </Grid>
                        <Game game={this.state.game} classes={classes} />
                    </Grid>
                </Paper>
                <Snackbar {...snackbarProps}>
                    <SnackbarContent
                        message={this.state.message}
                        className={classes[this.state.messageVariant]}
                    />
                </Snackbar>
            </Layout>
        );
    }
}

export default withStyles(styles)(App);
