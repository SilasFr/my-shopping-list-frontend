import axios from 'axios';

const baseApi = axios.create({
  baseURL: 'http://localhost:5000',
});

async function signUp(signUpData) {
  return await baseApi.post(`/sign-up`, signUpData);
}

async function signIn(signInData) {
  return await baseApi.post('/sign-in', signInData);
}

const api = {
  signUp,
  signIn,
};

export default api;
