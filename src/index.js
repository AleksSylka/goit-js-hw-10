import './css/styles.css';
import Notiflix from 'notiflix';
var debounce = require('lodash.debounce');
import { fetchCountries } from './js/fetchCountries';
const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('input');
const ulEl = document.querySelector('.country-list');
const divEl = document.querySelector('.country-info')

inputEl.addEventListener('input', debounce(onArrayCountry, DEBOUNCE_DELAY))

function onArrayCountry() {
    let name = inputEl.value.trim();
    if (!name) {
        ulEl.innerHTML = '';
        divEl.innerHTML = '';
        return
    }
    fetchCountries(name).then(arrayCountries => {
        if (arrayCountries.length > 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
        } else if (arrayCountries.length === 1) {
            ulEl.innerHTML = ''
            divEl.innerHTML = createMarkupCountry(arrayCountries);
        } else {
            divEl.innerHTML = ''
            ulEl.innerHTML = createMarkupList(arrayCountries);
        }
    }
    ).catch(err => console.log(err));
}

function createMarkupList(arr) {
    return arr.map(({ flags: { svg }, name: { official } }) => `<li class="js-item">
        
        <p class="js-name">
        <img class="js-img-card" src="${svg}" alt="Flag of ${official}">
        ${official}</p>
      </li>`).join("");
};

function createMarkupCountry(arr) {
    const {flags: { svg }, name: { official }, capital, languages, population } = arr[0];
    return `
      <h2 class="js-title-card"><img class="js-img-card" src="${svg}" alt="Flag of ${official}">${official}</h2>
      <p class="js-text-card"><b>Capital:</b> ${capital}</p>
      <p class="js-text-card"><b>Population:</b> ${population}</p>
      <p class="js-text-card"><b>Languages:</b> ${Object.values(languages)}</p>`
}
