import React, { Component } from 'react';
import { Paper, Typography, withStyles, Input, Button, Grid, Card, CardActionArea, CardMedia, CardContent } from '@material-ui/core';

import Layout from './components/Layout';
import Guide from './images/guide.PNG';


const styles = {
    Paper: {
        padding: 20,
        minHeight: 'calc(100% - 64px - 40px)'
    },
    GamePaper: {
        marginTop: 20
    },
    Input: {
        marginBottom: 20
    },
    Text: {
        marginBottom: 10
    },
    media: {
        height: 200
    },
};


const OWNED_GAMES_API_URL = "https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=4AFAAFA8253B647D06A85F23FBD47149";


class App extends Component {
    state = {
        loading: false,
        game: null
    }

    getSteamData = (event) => {
        event.preventDefault();
        const { value } = event.target[0];
        this.setState({loading: true});
        fetch(`${OWNED_GAMES_API_URL}&steamid=${value}&include_appinfo=1&format=json`).then(
            (data) => data.json().then(
                (json) => {
                    this.setState({loading: false});
                    const { games } = json.response;
                    const game = games[Math.floor(Math.random() * games.length)];
                    this.setState({game});
                }
            )
        ).catch((err) => this.setState({loading: false}));
    }

    render() {
        const { classes } = this.props;
        return (
            <Layout loading={this.state.loading}>
                <Paper className={classes.Paper}>
                    <Grid container direction="column">
                        <Grid item xs={12} sm={8} md={6} lg={4}>
                            <Card style={{marginBottom: 20, height: "50px"}}>
                                <CardMedia src="img">
                                    <img src={Guide} width="100%" height="50px" alt="Steam id is part of the profile URL"></img>
                                </CardMedia>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={8} md={6} lg={4}>
                            <Typography variant="body1" className={classes.Text}>
                                Please type your steam id, so that we can select a random game from your game library.
                                You can find your steam id from your steam profile's url.
                            </Typography>
                        </Grid>
                        <form onSubmit={this.getSteamData}>
                            <Grid item xs={12} sm={8} md={6} lg={4}>
                                <Input className={classes.Input} fullWidth placeholder="Enter your steam account name..." />
                            </Grid>
                            <Grid item xs={12} sm={8} md={6} lg={2}>
                                <Button fullWidth variant="contained" color="primary" type="submit" disabled={this.state.loading}>Submit</Button>
                            </Grid>
                        </form>
                        {this.state.game
                            ? <Grid item xs={12} sm={8} md={6} lg={5}>
                                <Card className={classes.GamePaper} onClick={() => {
                                    window.location = `https://store.steampowered.com/app/${this.state.game.appid}/`
                                }}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.media}
                                            image={`http://media.steampowered.com/steamcommunity/public/images/apps/${this.state.game.appid}/${this.state.game.img_logo_url}.jpg`}
                                        />
                                        <CardContent>
                                            <Typography variant="display2">{this.state.game.name}</Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                            : null}
                    </Grid>
                </Paper>
            </Layout>
        );
    }
}

export default withStyles(styles)(App);
