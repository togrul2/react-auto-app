import {Loader} from "../components/Loader.jsx";
import {Alert, Button, Container, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {registerAction} from "../actions/authAction.js";
import {useNavigate} from "react-router-dom";

/**
 * User registration page. Redirects to the
 * main page if logged in. Redirects to the login page
 * if user is successfully created.
 * @returns {JSX.Element}
 */
export function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const {loading, error} = useSelector(state => state.authRegister);
  const {tokens} = useSelector(state => state.authLogin);
  const navigate = useNavigate();

  useEffect(() => {
    if (tokens !== null) {
      // Redirect to the home page if logged in.
      navigate('/');
    }
  }, [tokens]);
  const dispatch = useDispatch();

  const registerHandler = e => {
    e.preventDefault();
    // Do not send request if any of fields are empty!
    if (!username.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()) {
      return;
    }
    if (password !== confirmPassword) {
      setPasswordMismatch(true);
    }
    setPasswordMismatch(false);
    dispatch(registerAction({username, email, password}));
  };

  return (
    <Container>
      <div style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        {loading ? <Loader/> : (
          <Form onSubmit={registerHandler}>
            <h1>Register at Auto net.</h1>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                onChange={e => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirm-password">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password again"
                onChange={e => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            {error && Object.entries(error.message).map(
              ([key, value]) =>
                <Alert key={key} variant="danger" className="mt-3"
                >{key.toString()}: {value.toString()}</Alert>
            )}
            {passwordMismatch && (
              <Alert variant="danger" className="mt-3">Passwords do not match.</Alert>
            )}
          </Form>
        )}
      </div>
    </Container>
  );
}
