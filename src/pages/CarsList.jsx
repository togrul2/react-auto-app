import {useEffect, useState} from "react";
import {base_url} from "../main.jsx";

function Car(props) {
  return (
    <div>
      <span>{props.car.id}</span>
      <span>{props.car.brand}</span>
      <span>{props.car.model}</span>
      <span>{props.car.price}</span>
      <span>{props.car.year}</span>
    </div>
  );
}

export function CarsList() {
  const [cars, setCars] = useState();

  useEffect(() => {
    fetch(`${base_url}/api/cars`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => setCars(data))
      .catch(err => {
        console.log(err)
      });

  }, []);

  return (
    <section>
      <h1>Cars List</h1>
      {cars && cars.map(car => <Car car={car}/>)}
    </section>
  );
}
