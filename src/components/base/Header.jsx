import {Container, Nav, Navbar} from 'react-bootstrap';
import {useDispatch, useSelector} from "react-redux";
import {logoutAction} from "../../actions/authAction.js";
import {Link, NavLink, useNavigate} from "react-router-dom";

/**
 * Header component, displays sign in/up or
 * profile/logout buttons depending on login state.
 * @returns {JSX.Element}
 */
export function Header() {
  const {tokens} = useSelector(state => state.authLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = e => {
    e.preventDefault();
    dispatch(logoutAction());
    navigate('/login');
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link to='/' className='navbar-brand'>Auto net.</Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink to='/' className='nav-link'>Cars</NavLink>
            {tokens !== null && (
              <>
                <NavLink to='/cars/add' className='nav-link'>Add a car</NavLink>
                <NavLink to='/profile/cars' className='nav-link'>My cars</NavLink>
              </>
            )}
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
