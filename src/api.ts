import axios, {AxiosInstance} from 'axios';

const REQUEST_TIMEOUT = 5000;

function createAPI(): AxiosInstance {
  return axios.create({
    baseURL: 'https://15.design.htmlacademy.pro/six-cities',
    timeout: REQUEST_TIMEOUT,
  });
}

export { createAPI };
