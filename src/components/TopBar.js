import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import localStorageService from '../LocalStorageService';
import { useNavigate } from 'react-router';

function TopBar() {
  const navigate = useNavigate()
  const logoutUser = () => {
    localStorageService.clear()
    navigate('/login')
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">AIS ChatRoom</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/chatroom">ChatRoom</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Button variant='outline-danger' onClick={logoutUser}>Logout</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopBar