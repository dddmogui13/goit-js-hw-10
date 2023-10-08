import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

const arrOptions = [{ text: '', value: '', placeholder: true }];

function addBreedOptions(breeds) {
  breeds.forEach((breed) => {
    arrOptions.push({
      text: breed.name,
      value: breed.id,
      style: 'background-color: YellowGreen',
    });
  });
}

function updateBreedSelect() {
  new SlimSelect({
    select: breedSelect,
    data: arrOptions,
    settings: {
      allowDeselect: true,
    },
  });
}

function displayCatInfo(data) {
  const cat = data[0].breeds[0];
  catInfo.innerHTML = `
    <div>
      <img src="${data[0].url}" alt="${cat.name}" width="400" />
    </div>
    <div>
      <b><h2>${cat.name}</h2></b>
      <p>${cat.description}</p>
      <p><b>Temperament:</b> ${cat.temperament}</p>
    </div>
  `;
}

function handleErrors(err) {
  Notify.failure('Oops! Something went wrong! Try reloading the page!');
  changeErrorStatus();
  changeLoadingStatus();
}

function changeLoadingStatus() {
  loader.classList.replace('loader', 'unloader');
}

function changeErrorStatus() {
  error.classList.replace('error', 'unloader');
}

function initialize() {
  breedSelect.style.color = '#008000';
  breedSelect.style.maxWidth = '400px';

  catInfo.style.display = 'flex';
  catInfo.style.gap = '20px';

  breedSelect.classList.replace('breed-select', 'unloader');
  changeErrorStatus();

  fetchBreeds()
    .then((breeds) => {
      addBreedOptions(breeds);
      updateBreedSelect();
      changeLoadingStatus();
      breedSelect.classList.replace('unloader', 'breed-select');
    })
    .catch(handleErrors);

  breedSelect.addEventListener('change', () => {
    changeErrorStatus();
    changeLoadingStatus();
    const breedId = breedSelect.value;
    if (breedId !== '') {
      fetchCatByBreed(breedId)
        .then(displayCatInfo)
        .catch(handleErrors);
    } else {
      catInfo.innerHTML = '';
      changeLoadingStatus();
    }
  });
}

initialize();