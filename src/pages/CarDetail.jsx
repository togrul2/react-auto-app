import {useParams} from "react-router-dom";

export function CarDetail() {
  const {carId} = useParams();
  return (
    <div>
      <h1>Car with id of {carId} details</h1>
    </div>
  );
}
