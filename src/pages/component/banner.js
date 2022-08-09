import React from 'react';
import { Card, CardTitle, Button, CardText, CardImgOverlay, CardImg } from 'reactstrap';
import './banner.scss';

const Banner = props => {
    return (
        <Card className="seciton-banner">
            <CardImg style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${props.poster_path})` }}></CardImg>
            <CardImgOverlay>
                <CardTitle className="h1 title">{props.name}</CardTitle>
                <CardTitle className="btn-gr">
                    <Button>Play</Button>
                    <Button>My List</Button>
                </CardTitle>
                <CardText className="description">{props.overview}</CardText>
            </CardImgOverlay>
        </Card >
    );
}

export default Banner;
