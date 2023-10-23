import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000", // Replace with your actual base URL
  // You can also add other configuration options here if needed
});

export default axiosInstance;
