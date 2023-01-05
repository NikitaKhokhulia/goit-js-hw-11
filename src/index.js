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

const onSearchFormSubmit = async event => {
  event.preventDefault();
  const searchQuery = event.currentTarget.elements['searchQuery'].value;
  pixabayApi.q = searchQuery;
  pixabayApi.page = 1;

  try {
    const { data } = await pixabayApi.fetchPhotos();
    if (!data.hits.length) {
      Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    refs.galleryList.innerHTML = createGalleryCards(data.hits);
    refs.loadMoreBtn.classList.remove('is-hidden');
  } catch (error) {
    Notiflix.Notify.failure(error);
  }
};

const handleLoadMoreBtnClick = async () => {
  pixabayApi.page += 1;

  try {
    const { data } = await pixabayApi.fetchPhotos();

    if (pixabayApi.page === data.totalHits) {
      refs.loadMoreBtn.classList.add('is-hidden');
    }
    refs.galleryList.insertAdjacentHTML(
      'beforeend',
      createGalleryCards(data.hits)
    );
  } catch (error) {
    Notiflix.Notify.failure(error);
  }
};

refs.searchForm.addEventListener('submit', onSearchFormSubmit);
refs.loadMoreBtn.addEventListener('click', handleLoadMoreBtnClick);
