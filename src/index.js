import './css/styles.css';
import { PixabayAPI } from './pixabay-api';
import Notiflix from 'notiflix';
import createGalleryCards from './templates/gallery.hbs';

const refs = {
  searchForm: document.querySelector('.search-form'),
  searchBtn: document.querySelector('.js-btn-search'),
  loadMoreBtn: document.querySelector('.load-more'),
  galleryList: document.querySelector('.gallery'),
};

const pixabayApi = new PixabayAPI();

const onSearchFormSubmit = event => {
  event.preventDefault();
  const searchQuery = event.currentTarget.elements['searchQuery'].value;
  pixabayApi.q = searchQuery;
  pixabayApi.page = 1;

  pixabayApi.fetchPhotos().then(({ data }) => {
    console.log(data);
    if (!data.hits.length) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    refs.galleryList.innerHTML = createGalleryCards(data.hits);
    refs.loadMoreBtn.classList.remove('is-hidden');
  });
};

const handleLoadMoreBtnClick = () => {
  pixabayApi.page += 1;

  pixabayApi.fetchPhotos().then(({ data }) => {
    console.log(data);
    if (pixabayApi.page === data.totalHits) {
      refs.loadMoreBtn.classList.add('is-hidden');
    }
    refs.galleryList.insertAdjacentHTML(
      'beforeend',
      createGalleryCards(data.hits)
    );
  });
};

refs.searchForm.addEventListener('submit', onSearchFormSubmit);
refs.loadMoreBtn.addEventListener('click', handleLoadMoreBtnClick);
