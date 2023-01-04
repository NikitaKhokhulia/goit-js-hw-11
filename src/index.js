import debounce from 'lodash.debounce';
import './css/styles.css';
import { fetchCountriesName } from './fetchCountries';
import country from './templates/country.hbs';
import countryList from './templates/country-list.hbs';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
  textInput: document.querySelector('#search-box'),
  listCountry: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

const handleCountiesInput = event => {
  const inputValue = event.target.value.trim();

  if (inputValue === '') {
    refs.listCountry.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    return;
  }

  fetchCountriesName(inputValue)
    .then(data => {
      if (data.length === 1) {
        refs.countryInfo.innerHTML = country(data);
        return;
      } else if (data.length > 1 && data.length <= 10) {
        refs.listCountry.innerHTML = countryList(data);
        return;
      } else {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
    })
    .catch(err => {
      Notiflix.Notify.failure(err.message);
    });
};

refs.textInput.addEventListener(
  'input',
  debounce(handleCountiesInput, DEBOUNCE_DELAY)
);
