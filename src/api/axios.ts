import axios from "axios";

const api = axios.create({
    baseURL: "https://sliverlike-soundable-beata.ngrok-free.dev/api",
    timeout: 5000,
});

export default api;
