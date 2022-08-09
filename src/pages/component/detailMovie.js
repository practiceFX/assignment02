import React from 'react';
import { CardBody, Row, Col, CardTitle } from 'reactstrap';
import './detailMovie.scss';
import Store from '../store/store';
import YouTube from 'react-youtube';

const DetailMovie = props => {
    //get idVideo from React Contexts
    const url = React.useContext(Store);
    //end 
    const opts = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 0
        }
    }
    return (
        props.status != 'false' ? (
            <CardBody className="detail-movie">
                <Row className="inner-detail-movie">
                    <Col xs="6" className="infor">
                        <CardTitle className="title h2">
                            {props.title}
                        </CardTitle>
                        <div className='line'></div>
                        <CardTitle className="text date">
                            Release Date: {props.date_release}
                        </CardTitle>
                        <CardTitle className="text vote">
                            Vote: {props.vote} / 10
                        </CardTitle>
                        <CardTitle className="text overview">
                            {props.overview}
                        </CardTitle>
                    </Col>
                    <Col xs="6" className="trailer">
                        <YouTube
                            videoId={url.url}
                            opts={opts}
                        />
                    </Col>
                </Row>
            </CardBody >) : null
    );
}

export default DetailMovie;
