import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Logo from '../assets/logo.png'

function NavBarComponent() {
  return (
    <Navbar fixed='top' expand="lg" className="bg-body-tertiary">
      <Container>
        <img className='img-responsive w-25 h-50' src={Logo} />
       
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ms-5">
            <Nav.Link className='ms-5' href="/ ">Product</Nav.Link>
            <Nav.Link className='ms-5' href="">Cart</Nav.Link>
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarComponent;