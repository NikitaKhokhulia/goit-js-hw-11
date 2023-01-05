`use strict`;

import axios from 'axios';

export class PixabayAPI {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '32602486-88d6814d0d09c23868840d0fe';

  page = 1;
  q = null;
  per_page = 40;

  fetchPhotos() {
    return axios.get(`${this.#BASE_URL}`, {
      params: {
        key: this.#API_KEY,
        q: this.q,
        page: this.page,
        per_page: this.per_page,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    });
  }
}
