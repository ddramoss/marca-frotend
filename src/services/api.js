// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000", // 👈 asegurarse de que es este
});

export const getBrands = () => api.get("/brands/");
export const createBrand = (data) => api.post("/brands/", data);
export const updateBrand = (id, data) => api.put(`/brands/${id}`, data);
export const deleteBrand = (id) => api.delete(`/brands/${id}`);

export default api;
