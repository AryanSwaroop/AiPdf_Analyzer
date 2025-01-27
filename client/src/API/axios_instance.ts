import axios from 'axios';
import { api_endpoints } from './api_endpoints';

// This is a axios instance so that we don't have to rewrite the axios configuration for every request.

const apiClient = axios.create({
  baseURL: api_endpoints.backend,
  headers: {
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin' : api_endpoints.frontend_origin,
  },
});

export default apiClient;
