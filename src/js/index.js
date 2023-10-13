import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');
let arrOptions = [{ text: '', value: '', placeholder: true }];

const initialize = () => {
  breedSelect.classList.replace('breed-select', 'unloader');
  breedSelect.style.color = '#008000';
  breedSelect.style.maxWidth = '400px';
  catInfo.style.display = 'flex';
  catInfo.style.gap = '20px';

 
  fetchBreeds()
    .then((data) => {
      arrOptions = [
        ...arrOptions,
        ...data.map((element) => ({
          text: element.name,
          value: element.id,
          style: 'background-color: YellowGreen',
        })),
      ];

      new SlimSelect({
        select: breedSelect,
        data: arrOptions,
        settings: {
          allowDeselect: true,
        },
      });

      changeLoadingStatus();
      breedSelect.classList.replace('unloader', 'breed-select');
    })
    .catch(handleErrors);
};

const handleErrors = (err) => {
  Notify.failure('Oops! Something went wrong! Try reloading the page!');
  changeErrorStatus();
  changeLoadingStatus();
};

const updateCatInfo = (data) => {
  changeLoadingStatus();
  const breed = data[0].breeds[0];
  catInfo.innerHTML = `<div><img src="${data[0].url}" alt="${breed.name}" width="400" /></div>
    <div><b><h2>${breed.name}</h2></b>
    <p>${breed.description}</p>
    <p><b>Temperament:</b> ${breed.temperament}</p></div>`;
};

const changeLoadingStatus = () => {
  loader.classList.replace('loader', 'unloader');
};

const changeUnLoadingStatus = () => {
  loader.classList.replace('unloader', 'loader');
};

const changeUnErrorStatus = () => {
  error.classList.replace('unloader', 'error');
};

const changeErrorStatus = () => {
  error.classList.replace('error', 'unloader');
};

const onBreedSelectChange = () => {
  changeErrorStatus();
  changeUnLoadingStatus();
  const breedId = breedSelect.value;
  if (breedId !== '') {
    fetchCatByBreed(breedId)
      .then(updateCatInfo)
      .catch(handleErrors);
  } else {
    changeLoadingStatus();
    catInfo.innerHTML = '';
  }
};

initialize();
breedSelect.addEventListener('change', onBreedSelectChange);