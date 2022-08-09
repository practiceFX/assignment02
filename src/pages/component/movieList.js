import React from 'react';
import { CardTitle, Row, Col, CardImg, Button } from 'reactstrap';
import './movieList.scss';
import Slider from "react-slick";

// slide configuration
const setting = {
    dots: false,
    infinity: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1
} //end

const MovieList = (props) => {
    //pass data detail movie when click thumb item 
    const handleClick = (item) => {
        props.handlePassData(item)
    }
    // end
    return (
        <Row className="section-movieList">
            <Col xs="12">
                <CardTitle className="h2 title">{props.title}</CardTitle>
            </Col>
            <Slider {...setting}>
                {
                    props.listMovie?.map((item, index) => (
                        <Col key={index} className="box-image" lg="1" >
                            <Button onClick={() => (handleClick({ ...item[0], status: true }))}
                                style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${item[0].poster_path})` }}
                                className="box-item-movie">
                            </Button>
                        </Col>
                    ))
                }
            </Slider>
        </Row >
    );
}

export default MovieList;
