import React, {useContext} from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {AuthContext} from "../../context/AuthContext";

const Header = () => {

    //static contextType = AuthContext;
    //
    // componentDidMount() {
    //     const selectHeader = document.querySelector('#header');
    //     if (selectHeader) {
    //         document.addEventListener('scroll', () => {
    //             window.scrollY > 100 ? selectHeader.classList.add('sticked') : selectHeader.classList.remove('sticked');
    //         });
    //     }
    // }
    //

    const {dispatch} = useContext(AuthContext);

    const handleClick =() =>{
        dispatch({type:"LOGOUT"});
    }


        return(
            <Navbar bg="primary" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#">WhistleBugle Admin</Navbar.Brand>
                    {/*<Navbar.Toggle aria-controls="navbarScroll" />*/}
                    {/*<Navbar.Collapse id="navbarScroll">*/}
                    {/*    <Nav*/}
                    {/*        className="me-auto my-2 my-lg-0"*/}
                    {/*        style={{ maxHeight: '100px' }}*/}
                    {/*        navbarScroll*/}
                    {/*    >*/}
                    {/*        <Nav.Link href="#action1">Home</Nav.Link>*/}
                    {/*        <Nav.Link href="#action2">Link</Nav.Link>*/}
                    {/*        <NavDropdown title="Link" id="navbarScrollingDropdown">*/}
                    {/*            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>*/}
                    {/*            <NavDropdown.Item href="#action4">*/}
                    {/*                Another action*/}
                    {/*            </NavDropdown.Item>*/}
                    {/*            <NavDropdown.Divider />*/}
                    {/*            <NavDropdown.Item href="#action5">*/}
                    {/*                Something else here*/}
                    {/*            </NavDropdown.Item>*/}
                    {/*        </NavDropdown>*/}
                    {/*        <Nav.Link href="#" disabled>*/}
                    {/*            Link*/}
                    {/*        </Nav.Link>*/}
                    {/*    </Nav>*/}
                    {/*</Navbar.Collapse>*/}
                    <Button onClick={handleClick}>Logout</Button>
                </Container>

            </Navbar>
        )
}
export default Header;