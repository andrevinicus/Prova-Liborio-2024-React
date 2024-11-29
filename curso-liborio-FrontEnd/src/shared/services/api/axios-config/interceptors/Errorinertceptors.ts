import { AxiosResponse, AxiosError } from 'axios';

export const responseInterceptor = (response: AxiosResponse) => {
  if (response && response.data) {
    console.log('Resposta recebida do backend:', response.data);
    return response;
  } else {
    return Promise.reject('Resposta não contém dados');
  }
};

export const errorInterceptor = (error: AxiosError) => {
  if (!error.response) {
    console.error('Erro de rede ou falha de requisição:', error.message);
    return Promise.reject('Erro de rede ou falha de requisição');
  }
  console.error('Erro na requisição:', error.response?.status);
  return Promise.reject(error.response);
};
