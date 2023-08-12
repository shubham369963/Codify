import {React} from 'react'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link , useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../actions/userActions.js";
import "./Header.css";
const Header = ({setSearch}) => {

  const Navigate = useNavigate ();

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;
  const logoutHandler = () =>{
    dispatch(logout());

    Navigate("/");
  }
  
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <Link to="/">Codify</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        
        <Navbar.Collapse id="navbarScroll">
            <Nav className="m-auto">
            <Form className="d-flex block">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
            </Nav>
          {userInfo ? 
           <Nav>
            <Nav.Link>
              <Link to={"/mycodes"}>My Codes</Link>
            </Nav.Link>
            <NavDropdown title={userInfo?.name} id="navbarScrollingDropdown">
              <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav> : 
          <Nav>
            <Nav.Link>
              <Link to={"/login"}>Login</Link>
            </Nav.Link>
          </Nav>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header