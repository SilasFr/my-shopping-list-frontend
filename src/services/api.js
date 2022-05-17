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
  return await baseApi.post('/users/validate', {}, config);
}

async function getLists(token) {
  const config = await createConfig(token);
  return await baseApi.get('/lists', config);
}

async function getTemplate(token) {
  const config = await createConfig(token);
  return await baseApi.get('/lists/template', config);
}

const api = {
  signUp,
  signIn,
  validateToken,
  getLists,
  getTemplate,
};

export default api;
