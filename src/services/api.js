import axios from 'axios';

const baseApi = axios.create({
  baseURL: 'http://ec2-3-83-159-240.compute-1.amazonaws.com',
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

async function createList(token, list) {
  const config = await createConfig(token);
  return await baseApi.post('/lists', list, config);
}

async function deleteList(token, listId) {
  const config = await createConfig(token);
  return await baseApi.delete(`/lists/${listId}`, config);
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
  createList,
  deleteList,
  getTemplate,
};

export default api;
