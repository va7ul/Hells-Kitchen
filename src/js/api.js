import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

axios.defaults.baseURL = 'https://tasty-treats-backend.p.goit.global/api';

function resetAllFiters() {
  localStorage.setItem('category', '');
  resetFilters();
}

function resetFilters() {
  localStorage.setItem('page', 1);
  localStorage.setItem('limit', 9);
  localStorage.setItem('time', '');
  localStorage.setItem('title', '');
  localStorage.setItem('area', '');
  localStorage.setItem('ingredient', '');
}

resetAllFiters();

const save = async (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const load = async key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

async function getMasterclasses() {
  const url = `/events`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    Notify.failure('Oops! Something went wrong!');
  }
}

async function getAllCategories() {
  const url = `/categories`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    Notify.failure('Oops! Something went wrong!');
  }
}

async function getPopularRecipes() {
  const url = `/recipes/popular`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    Notify.failure('Oops! Something went wrong!');
  }
}

async function getAreas() {
  const url = `/areas`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    Notify.failure('Oops! Something went wrong!');
  }
}

async function getIngredients() {
  const url = `/ingredients`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    Notify.failure('Oops! Something went wrong!');
  }
}

async function getRecipes() {
  let category = localStorage.getItem('category');
  let page = localStorage.getItem('page');
  let limit = localStorage.getItem('limit');
  let title = localStorage.getItem('title');
  let time = localStorage.getItem('time');
  let area = localStorage.getItem('area');
  let ingredient = localStorage.getItem('ingredient');

  const url = `/recipes?category=${category}&page=${page}&limit=${limit}&title=${title}&time=${time}&area=${area}&ingredient=${ingredient}`;
  try {
    const response = await axios.get(url);
    return response.data.results;
  } catch (error) {
    Notify.failure('Oops! Something went wrong!');
  }
}

async function getRecipeById(recipeId) {
  const url = `/recipes/${recipeId}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    Notify.failure('Oops! Something went wrong!');
  }
}

async function patchRating(recipeId, rating) {
  const url = `/recipes/${recipeId}/${rating}`;
  try {
    const response = await axios.patch(url);
    return response.data;
  } catch (error) {
    Notify.failure('Oops! Something went wrong!');
  }
}

async function postOrder(recipeId) {
  const url = `/recipes/${recipeId}/orders/add`;
  try {
    const response = await axios.post(url);
    return response.data;
  } catch (error) {
    Notify.failure('Oops! Something went wrong!');
  }
}

function removeFromFavorites(key, elem, arr) {
  const productId = elem.closest('.card-template').dataset.id;
  const removeElemIdx = arr.findIndex(item => item._id === productId);
  arr.splice(removeElemIdx, 1);
  localStorage.setItem(key, JSON.stringify(arr));
}

export {
  getMasterclasses,
  getAllCategories,
  getPopularRecipes,
  getAreas,
  getIngredients,
  getRecipes,
  getRecipeById,
  patchRating,
  postOrder,
  resetAllFiters,
  resetFilters,
  save,
  load,
  removeFromFavorites,
};
