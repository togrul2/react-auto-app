import {Loader} from "../components/Loader.jsx";
import {Alert, Button, Container, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {editCarAction, getCarDetailsAction} from "../actions/carActions.js";

export function CarEdit() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");

  const {loading, car, error} = useSelector(state => state.carInfo);

  const {carId} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCarDetailsAction(carId));
    if (car) {
      setBrand(car.brand);
      setModel(car.model);
      setCategory(car.category);
      setPrice(car.price);
      setYear(car.year);
      setDescription(car.description);
    }
  }, []);

  const editHandler = e => {
    e.preventDefault();
    const data = {
      brand: brand || car.brand,
      model: model || car.model,
      category: category || car.category,
      price: price || car.price,
      year: year || car.year,
      description: description || car.description
    };
    dispatch(editCarAction(carId, data)).then(() => {
      navigate('/profile/cars');
    });
  };

  return (
    <Container>
      <div className="pt-5 d-flex justify-content-center">
        <div>
          <h1>Edit a car.</h1>
          <div className="py-3">
            {loading ? <Loader/> : (
              <Form onSubmit={editHandler}>
                <Form.Group className="mb-3" controlId="brand">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={car ? car.brand : ''}
                    onChange={e => {setBrand(e.target.value)}}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="model">
                  <Form.Label>Model</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={car ? car.model : ''}
                    onChange={e => {setModel(e.target.value)}}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={car ? car.category : ''}
                    onChange={e => {setCategory(e.target.value)}}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder={car ? car.price : ''}
                    onChange={e => {setPrice(e.target.value)}}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="year">
                  <Form.Label>Year</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder={car ? car.year : ''}
                    onChange={e => {setYear(e.target.value)}}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={car ? car.description : ''}
                    onChange={e => {setDescription(e.target.value)}}/>
                </Form.Group>
                <Button type='submit' variant='primary'>Save</Button>
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