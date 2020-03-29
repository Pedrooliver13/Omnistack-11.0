import axios from "axios"; // ele pe responsável por qualquer interação com serviço externo;

const api = axios.create({
  baseURL: "http://localhost:1313"
});

export default api;
