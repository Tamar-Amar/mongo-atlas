import axios from "axios";

const apiClient = axios.create({
    baseURL: "/api/cars",
    headers: {
      "Content-Type": "application/json",
    },
  });


export const fetchCars = async () => {
  const response = await apiClient.get('/');
  return response.data;
};

export const addCar = async (car: { model_name: string; plate_number: string; color: string }) => {
  const response = await apiClient.post('/', car);
  return response.data;
};

export const updateCar = async (id: string, car: { model_name: string; plate_number: string; color: string }) => {
  await apiClient.patch(`/?id=${id}`, car);
};

export const deleteCar = async (id: string) => {
  await apiClient.delete(`/?id=${id}`);
};