import axios from 'axios';

const baseApi = axios.create({
  baseURL: 'http://localhost:5000',
});

async function createConfig(token) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

async function signUp(signUpData) {
  return await baseApi.post(`/sign-up`, signUpData);
}

async function signIn(signInData) {
  return await baseApi.post('/sign-in', signInData);
}

async function validateToken(token) {
  const config = await createConfig(token);
  console.log(config);
  return await baseApi.post('/users/validate', {}, config);
}

const api = {
  signUp,
  signIn,
  validateToken,
};

export default api;
