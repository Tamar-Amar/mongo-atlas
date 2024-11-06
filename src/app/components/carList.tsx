import React from "react";
import styles from '@/app/styles/carList.module.css';

interface Car {
  _id: string;
  model_name: string;
  plate_number: string;
  color: string;
}

interface CarListProps {
  cars: Car[];
  onEdit: (car: Car) => void;
  onDelete: (id: string) => void;
}

const CarList: React.FC<CarListProps> = ({ cars, onEdit, onDelete }) => {
  return (
    <div className={`${styles.carList} container`}>
      <div className={styles.header}>
        <span>מודל</span>
        <span>מספר רכב</span>
        <span>צבע</span>
        <span>ערוך</span>
        <span>מחק</span>
      </div>
      {cars.length > 0 ? (
        cars.map((car) => (
          <div key={car._id} className={styles.carItem}>
            <span>{car.model_name}</span>
            <span>{car.plate_number}</span>
            <span>{car.color}</span>
            <button
              className="btn btn-warning btn-sm px-2"
              onClick={() => onEdit(car)}>ערוך</button>
            <button
              className="btn-delete"
              onClick={() => onDelete(car._id)} >מחק</button>
          </div>
        ))
      ) : (<p>אין רכבים זמינים.</p>)}
    </div>
  );
};

export default CarList;
