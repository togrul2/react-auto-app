import {Alert, Button, Col, Container, Form, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {userRetrieveAction, userUpdateAction} from "../actions/authAction.js";
import {Loader} from "../components/Loader";


export function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const {loading, user, error} = useSelector(state => state.userInfo);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  useEffect(() => {
    // load user info at first load.
    dispatch(userRetrieveAction())
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
    }
  }, []);

  const editHandler = e => {
    e.preventDefault();
    // Send data if both fields are filled.
    if (username || email) {
      dispatch(userUpdateAction({username, email}));
    }
  }

  return (<Container>
    <div className="p-5">
      {user && <h1>Hello {user.username}</h1>}
      <Row>
        <Col className="p-3">
          <h2>Edit user info</h2>
          {loading ? <Loader/> : (
            <Form onSubmit={editHandler}>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={user ? user.username : ''}
                  onChange={e => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={user ? user.email : ''}
                  onChange={e => setEmail(e.target.value)}
                />
              </Form.Group>
              <Button type='submit' variant='primary'>Edit</Button>
            </Form>)
          }
          {error && (Object.entries(error).map(([key, value]) => (
              <Alert key={key} variant="danger">{key}: {value}</Alert>
            ))
          )}
        </Col>
        <Col></Col>
      </Row>
    </div>
  </Container>);
}
