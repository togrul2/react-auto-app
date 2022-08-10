import {Alert, Button, Container, Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {deleteCarAction, getMyCarsAction} from "../actions/carActions.js";
import {Loader} from "../components/Loader";
import {Link} from "react-router-dom";

function Car(props) {
  const dispatch = useDispatch();

  const deleteHandler = (carId) => {
    dispatch(deleteCarAction(carId));
  };

  return (
    <tr>
      <td>{props.car.id}</td>
      <td>{props.car.brand}</td>
      <td>{props.car.model}</td>
      <td>{props.car.category}</td>
      <td>{props.car.price}</td>
      <td>{props.car.year}</td>
      <td className='d-flex gap-1'>
        <Link className="btn btn-primary" to={`/cars/${props.car.id}/edit`}>Edit</Link>
        <Button onClick={() => deleteHandler(props.car.id)}>Delete</Button>
      </td>
    </tr>
  );
}

export function MyCars() {
  const {loading, cars, error} = useSelector(state => state.carsInfo);
  const {deleted} = useSelector(state => state.carDelete);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyCarsAction());
  }, [deleted]);

  return (
    <Container className="mt-4">
      {loading ? <Loader/> : (
        <>
          <h1>My Cars</h1>
          <Table striped>
            <thead>
            <tr>
              <th>Id</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Category</th>
              <th>Price</th>
              <th>Year</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {cars && cars.map(car => <Car key={car.id} car={car}/>)}
            </tbody>
          </Table>
        </>
      )}
      {error && Object.entries(error).map(([key, value]) =>
        <Alert key={key} variant="danger">{key}: {value}</Alert>
      )}
    </Container>
  );
}