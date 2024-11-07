import axios from "axios";
import my_http from "@/services/http";

// const apiClient = axios.create({
//     baseURL: "/api",
//     url: "/api",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });


  export async function getAllCars() {
      try {
          const response = await my_http.get("/cars");
          console.log(response.data);
          return response.data;
      }
      catch (error) {
          console.error(error);
      }
  }


export const fetchCars = async () => {
  const response = await my_http.get('/cars');
  return response.data;
};


export const addCar = async (car: { model_name: string; plate_number: string; color: string }) => {
  const response = await my_http.post('/cars', car);
  return response.data;
};

export const updateCar = async (id: string, car: { model_name: string; plate_number: string; color: string }) => {
  await my_http.patch(`/?id=${id}`, car);
};

export const deleteCar = async (id: string) => {
  await my_http.delete(`/cars/?id=${id}`);
};