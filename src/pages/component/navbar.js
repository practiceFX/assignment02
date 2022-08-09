import React from 'react';
import { Card, CardTitle, Row, Col } from 'reactstrap';
import './navbar.scss';
import { NavLink } from 'react-router-dom'


const Navbar = () => {
    return (
        <Card className='section-navbar'>
            <Row className='inner-navbar'>
                <Col xs="6" className="wrapper wrapper-navbar-brand">
                    <CardTitle className="navbar-brand">
                        <NavLink to='/'>Movie App</NavLink>
                    </CardTitle>
                </Col>
                <Col xs="6" className="wrapper wrapper-navbar-search">
                    <CardTitle className="navbar-search">
                        <NavLink to='/search'>
                            <i className="fa fa-search" aria-hidden="true"></i>
                        </NavLink>
                    </CardTitle>
                </Col>
            </Row>
        </Card >
    );
}

export default Navbar;
