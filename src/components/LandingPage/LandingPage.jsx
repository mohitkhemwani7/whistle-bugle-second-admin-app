import React from 'react';
import Header from "../Header/Header";
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";


class LandingPage extends React.Component{
    render() {
        return(
            <div className="App">
                <Header/>
                <Container className="p-2 mt-4">

                    <Row>
                        <Col sm className="bg-primary mx-1">
                            <h1><a href="/team" className="text-white">Team</a></h1>
                        </Col>
                        <Col sm className="bg-primary  mx-1">
                            <h1><a href="/AddTeam" className="text-white">Add Team</a></h1>
                        </Col>
                        <Col sm className="bg-primary  mx-1">
                            <h1><a href="/AddTeam" className="text-white">Add Team</a></h1>
                        </Col>
                    </Row>
                </Container>

            </div>
        )
    }
}

export default LandingPage;