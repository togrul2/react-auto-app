import {Alert, Button, Container, Form} from "react-bootstrap";
import {Loader} from "../components/Loader.jsx";
import {useDispatch, useSelector} from "react-redux";
import {addCarAction} from "../actions/carActions.js";
import {useNavigate} from "react-router-dom";

export function CarAdd() {
  const {loading, error} = useSelector(state => state.carInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createHandler = e => {
    e.preventDefault();
    const brand = e.target[0].value,
      model = e.target[1].value,
      category = e.target[2].value,
      price = e.target[3].value,
      year = e.target[4].value;
    if (brand && model && category && price && year) {
      dispatch(addCarAction({brand, model, category, price, year}))
        .then(() => {
          if (error === null) {
            navigate('/');
          }
        });
    }
  };

  return (
    <Container>
      <div className="pt-5 d-flex justify-content-center">
        <div>
          <h1>Create a car.</h1>
          <div className="py-3">
            {loading ? <Loader/> : (
              <Form onSubmit={createHandler}>
                <Form.Group className="mb-3" controlId="brand">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control type="text"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="model">
                  <Form.Label>Model</Form.Label>
                  <Form.Control type="text"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control type="text"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="number"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="year">
                  <Form.Label>Year</Form.Label>
                  <Form.Control type="number"/>
                </Form.Group>
                <Button type='submit' variant='primary'>Create</Button>
              </Form>)
            }
            {error && (Object.entries(error).map(([key, value]) => (
                <Alert key={key} variant="danger">{key}: {value}</Alert>
              ))
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}