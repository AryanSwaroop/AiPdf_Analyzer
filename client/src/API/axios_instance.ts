import axios from 'axios';
import { api_endpoints } from './api_endpoints';

const apiClient = axios.create({
  baseURL: api_endpoints.backend,
  headers: {
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin' : api_endpoints.frontend_origin,
  },
});

export default apiClient;
