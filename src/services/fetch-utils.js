import { client, checkError } from './client';

export function getUser() {
  return client.auth.session();
}

// signs an new user in and puts an auth token in local storage in the browser
export async function signUp(email, password) {
  const response = await client.auth.signUp({ email, password });

  return response.user;
}

// signs an existing user in and puts an auth token in local storage in the browser
export async function signIn(email, password) {
  const response = await client.auth.signIn({ email, password });

  return response.user;
}

// removes the token from local storage and redirects the user home
export async function logout() {
  await client.auth.signOut();

  return (window.location.href = '../');
}

export async function createCat(cat) {
  const response = await client.from('cats').insert([cat]);

  return checkError(response);
}

export async function getCats() {
  const response = await client.from('cats').select();

  return checkError(response);
}

export async function getCatById(id) {
  const response = await client.from('cats').select().match({ id }).single();

  return checkError(response);
}

export async function updateCat(id, newCat) {
  const response = await client.from('cats').update(newCat).match({ id });

  return checkError(response);
}
