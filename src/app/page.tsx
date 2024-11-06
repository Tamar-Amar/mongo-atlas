"use client";
import { useEffect, useState } from "react";
import { fetchCars, addCar, updateCar, deleteCar, getAllCars } from '@/services/carServices';
import CarList from '@/app/components/carList';
import CarForm from '@/app/components/carForm';
import styles from './styles/mainPage.module.css';


interface Car {
  _id: string;
  model_name: string;
  plate_number: string;
  color: string;
}

export default function Home() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newCar, setNewCar] = useState<{ model_name: string; plate_number: string; color: string }>({
    model_name: '',
    plate_number: '',
    color: ''
  });
  const [editCar, setEditCar] = useState<Car | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(true); // מציג את קומפוננטת CarForm
  };

  useEffect(() => {
    const loadCars = async () => {
      try {
        const carData = await getAllCars();
        console.log(carData);
        setCars(carData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'שגיאה לא ידועה');
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCar((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (editCar) {
        await updateCar(editCar._id, newCar);
        setCars((prevCars) => prevCars.map(car => (car._id === editCar._id ? { ...editCar, ...newCar } : car)));
        setEditCar(null);
      } else {
        const response = await addCar(newCar);
        setCars((prevCars) => [...prevCars, response]);
      }
      setNewCar({ model_name: '', plate_number: '', color: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'שגיאה לא ידועה');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCar(id);
      setCars((prevCars) => prevCars.filter(car => car._id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'שגיאה לא ידועה');
    }
  };

  const handleEdit = (car: Car) => {
    setEditCar(car);
    setNewCar({ model_name: car.model_name, plate_number: car.plate_number, color: car.color });
    setShowForm(true); // להציג את הטופס עם פרטי הרכב לעריכה
  };

  if (loading) return <div className="alert alert-info">טוען...</div>;
  if (error) return <div className="alert alert-danger">שגיאה: {error}</div>;

  return (
    <p>aaa</p>
    // <div className={`container ${styles.container}`}>
    //   <h1 className="my-4">רכבים</h1>
    //   <button onClick={handleButtonClick} className="btn btn-primary mb-4">
    //     הוסף רכב חדש
    //   </button>

    //   {/* אם יש רכב לעריכה, נציג את טופס העריכה */}
    //   {showForm && (
    //     <div className="card p-4 mb-4">
    //       <h2>{editCar ? 'ערוך רכב' : 'הוספת רכב חדש'}</h2>
    //       <CarForm
    //         car={newCar}
    //         onChange={handleInputChange}
    //         onSubmit={handleSubmit}
    //         isEditing={!!editCar}
    //       />
    //     </div>
    //   )}

    //   <CarList
    //     cars={cars}
    //     onEdit={handleEdit}
    //     onDelete={handleDelete}
    //   />
    // </div>
  );
}
