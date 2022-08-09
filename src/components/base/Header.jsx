import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {useDispatch, useSelector} from "react-redux";
import {logoutAction} from "../../actions/authAction.js";
import {NavLink} from "react-router-dom";

/**
 * Header component, displays sign in/up or
 * profile/logout buttons depending on login state.
 * @returns {JSX.Element}
 */
export function Header() {
  const {tokens} = useSelector(state => state.authLogin);
  const dispatch = useDispatch();

  const logoutHandler = e => {
    e.preventDefault();
    dispatch(logoutAction());
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Auto net.</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider/>
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            {tokens !== null ? (
              <>
                <NavLink to='/profile' className="nav-link">Profile</NavLink>
                <Nav.Link onClick={logoutHandler}>Log out</Nav.Link>
              </>
            ) : (
              <>
                <NavLink to='/login' className="nav-link">Sign in</NavLink>
                <NavLink to='/register' className="nav-link">Sign up</NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
