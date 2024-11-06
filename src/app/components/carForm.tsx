import React from "react";
import styles from '@/app/styles/carForm.module.css';

interface CarFormProps {
  car: { model_name: string; plate_number: string; color: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isEditing: boolean;
}

const CarForm: React.FC<CarFormProps> = ({ car, onChange, onSubmit, isEditing }) => {
  return (
    <form className={`${styles.form} container`} onSubmit={onSubmit}>
      <input
        type="text"
        name="model_name"
        value={car.model_name}
        onChange={onChange}
        placeholder="מודל"
        className={`form-control ${styles.input}`}
        required
      />
      <input
        type="text"
        name="plate_number"
        value={car.plate_number}
        onChange={onChange}
        placeholder="מספר רכב"
        className={`form-control ${styles.input}`}
        required
      />
      <input
        type="text"
        name="color"
        value={car.color}
        onChange={onChange}
        placeholder="צבע"
        className={`form-control ${styles.input}`}
        required
      />
      <button type="submit" className={`btn ${isEditing ? 'btn-warning' : 'btn-success'} ${styles.button}`}>
        {isEditing ? 'ערוך רכב' : 'הוסף רכב'}
      </button>
    </form>
  );
};

export default CarForm;
