import {Alert, Button, Container, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loginAction} from "../actions/authAction.js";
import {Loader} from "../components/Loader.jsx";

/**
 * Login page, takes username and password input,
 * redirects to '/' if success, else outputs error message.
 * @returns {JSX.Element}
 */
export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {loading, tokens, error} = useSelector(state => state.authLogin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // if tokens are obtained, it means successful log in, redirect to the main page.
  useEffect(()=>{
    if (tokens !== null) {
      navigate('/');
    }
  }, [tokens]);

  // Login handler, send request to the login endpoint
  // if both username and password are provided
  const loginHandler = e => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      dispatch(loginAction({username, password}))
    }
  };

  return (
    <Container>
      <div style={{height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
        {loading ? <Loader/> : (
          <Form onSubmit={loginHandler}>
            <h1>Login to Auto net.</h1>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                onChange={e => setUsername(e.target.value)}
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
            <Button variant="primary" type="submit">
              Submit
            </Button>
            {error && (
              <Alert variant="danger" className="mt-3">{error.error}</Alert>
            )}
          </Form>
        )}
      </div>
    </Container>
  );
}
