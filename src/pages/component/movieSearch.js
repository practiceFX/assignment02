import React from 'react';
import './movieList.scss';
import { CardTitle, Row, Col, Button } from 'reactstrap';



const MovieSearch = props => {
    //pass data detail movie when click thumb item 
    const handleClick = (item) => {
        props.handlePassData(item)
    }//end
    return (
        <Row className='section-movieList'>
            <Col xs="12">
                <CardTitle className="h2 title">
                    {props.title}
                </CardTitle>
            </Col>
            {
                props.listMovie?.map((item, index) => (
                    <Col key={index} className="box-image" lg="2" >
                        <Button onClick={() => (handleClick({ ...item[0], status: true }))}
                            style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${item[0].poster_path})` }}
                            className="box-item-movie">
                        </Button>
                    </Col>
                ))
            }
        </Row>
    );
}

export default MovieSearch;

