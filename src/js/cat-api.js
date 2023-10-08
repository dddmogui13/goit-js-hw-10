import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY = 'live_SLUYhtcB55qSGmltWniUf0FZ60q6AfvJeTXW4vrEHbYkQ2iOVCra9FylYCp7os7N';

axios.defaults.headers.common['x-api-key'] = API_KEY;

export function fetchBreeds() {
  const url = `${BASE_URL}/breeds`;

  return axios.get(url)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  const url = `${BASE_URL}/images/search?breed_ids=${breedId}`;

  return axios.get(url)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}