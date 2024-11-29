import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3333/',
  headers: {
    'Content-Type': 'application/json',
  },
});

const responseInterceptor = (response: AxiosResponse) => {
  if (response && response.data) {
    console.log('Resposta recebida do backend:', response.data);
    return response;
  } else {
    return Promise.reject('Resposta não contém dados');
  }
};

const errorInterceptor = (error: AxiosError) => {
  if (!error.response) {
    console.error('Erro de rede ou falha de requisição:', error.message);
    return Promise.reject('Erro de rede ou falha de requisição');
  }
  console.error('Erro na requisição:', error.response?.status);
  return Promise.reject(error.response);
};

api.interceptors.response.use(responseInterceptor, errorInterceptor);

export default api;
