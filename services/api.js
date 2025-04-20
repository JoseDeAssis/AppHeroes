import axios from "axios";
import { REACT_APP_BASE_URL } from "@env";

const api = axios.create({
	baseURL: REACT_APP_BASE_URL,
	timeout: 10000,
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		console.log(error);
		return Promise.reject(error);
	}
);

export default api;
