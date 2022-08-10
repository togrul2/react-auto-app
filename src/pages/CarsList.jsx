import {useEffect} from "react";
import {Alert, Card, Container, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import {getCarsAction} from "../actions/carActions.js";
import {useDispatch, useSelector} from "react-redux";
import {Loader} from "../components/Loader.jsx";


function Car(props) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src='/placeholder.svg'/>
      <Card.Body>
        <Card.Title>{props.car.brand}</Card.Title>
        <Card.Title>{props.car.model}</Card.Title>
        <Card.Text>{props.car.description}</Card.Text>
        <Link to={`/cars/${props.car.id}`} className="btn btn-primary">Detail</Link>
      </Card.Body>
    </Card>
  );
}

export function CarsList() {
  const {loading, cars, error} = useSelector(state=>state.carsInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCarsAction());
  }, []);

  const sortHandle = e => {
    // We resend request to get cars with sort option
    dispatch(getCarsAction(e.target.value));
  };

  return (
    <section>
      <Container>
        <div className="d-flex justify-content-between">
          <h1 className="my-5">Cars List</h1>
          <Form className="d-flex align-items-center">
            <Form.Group controlId="sort">
              <Form.Label>Sort</Form.Label>

              <Form.Select aria-label="Default select example" onChange={sortHandle}>
                <option value="">----</option>

                <option value="model">Model asc.</option>
                <option value="-model">Model desc.</option>

                <option value="brand">Brand asc.</option>
                <option value="-brand">Brand desc.</option>

                <option value="category">Category asc.</option>
                <option value="-category">Category desc.</option>

                <option value="price">Price asc.</option>
                <option value="-price">Price desc.</option>

                <option value="year">Year asc.</option>
                <option value="-year">Year desc.</option>
              </Form.Select>
            </Form.Group>
          </Form>

        </div>
        {loading ? <Loader/> : (
          <div className="d-flex flex-wrap gap-3 my-4">
            {cars && cars.map(car => <Car key={car.id} car={car}/>)}
          </div>
        )}
        {error && (
          <Alert variant='danger'>{error}</Alert>
        )}
      </Container>
    </section>
  );
}
