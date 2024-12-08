import axios from "axios";

const API_URL = "http://localhost:8080/auth";

class AuthService {
    register(user) {
        return axios.post(`${API_URL}/register`, user);
    }

    login(credentials) {
        return axios.post(`${API_URL}/login`, credentials);
    }
}

export default new AuthService();
