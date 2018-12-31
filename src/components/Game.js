import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, CardActionArea, Zoom, Fade } from '@material-ui/core'


export default (props) =>
    props.game
        ? <Fade in={typeof props.game !== 'undefined'}>
            <Grid container item sm={12} md={6} lg={8} direction="row">
                <Card className={props.classes.GamePaper} onClick={() => {
                    window.location = `https://store.steampowered.com/app/${props.game.appid}/`
                }}>
                    <CardActionArea className={props.classes.CardArea}>
                        <CardMedia
                            className={props.classes.media}
                            src='img'
                        >
                            <img
                                src={`http://media.steampowered.com/steamcommunity/public/images/apps/${props.game.appid}/${props.game.img_logo_url}.jpg`}
                                height="100%"
                                width="100%"
                                alt="Game Logo"
                            />
                        </CardMedia>
                        <CardContent>
                            <Typography variant="h6">{props.game.name}</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        </Fade>
        : <Zoom in={true}><Grid container item sm={12} md={6} lg={8} direction="row">
            <Card className={props.classes.GamePaper}>
                <CardContent className={props.classes.media}>
                    <Grid container item justify="center" style={{ height: "100%" }} alignItems="center">
                        <Typography variant="h6" align="center" className={props.classes.PlaceholderText} style={{ lineHeight: 1 }}>
                            The selected game will appear here.
                        </Typography>
                    </Grid>
                </CardContent>
            </Card>
        </Grid></Zoom>
