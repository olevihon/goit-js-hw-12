// https://izitoast.marcelodolza.com/
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// https://simplelightbox.com/
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchPhotos } from './js/pixabay-api';
import { createGalleryItemMarkup } from './js/render-functions';

const galleryEl = document.querySelector('.js-gallery');
const formSearchEl = document.querySelector('.js-form-search');
const loaderEl = document.querySelector('.js-loader');

const toastCommonOpts = {
  position: 'topRight',
  transitionIn: 'fadeIn',
  transitionOut: 'fadeOut',
  animateInside: false,
};

const lightbox = new SimpleLightbox('.js-gallery .js-gallery-link', {
  captionsData: 'alt',
  captionDelay: 250,
  overlayOpacity: 0.8,
});

function onSearch(event) {
  event.preventDefault();

  const searchQuery = event.target.elements.searchKeyword.value.trim();

  if (searchQuery === '') {
    iziToast.error({
      message: 'Please enter search query',
      ...toastCommonOpts,
    });
    return;
  }

  loaderEl.classList.remove('is-hidden');

  galleryEl.innerHTML = '';

  fetchPhotos(searchQuery)
    .then(imagesData => {
      if (imagesData.total === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          ...toastCommonOpts,
        });
        return;
      }

      galleryEl.innerHTML = createGalleryItemMarkup(imagesData.hits);
      lightbox.refresh();
    })
    .catch(error => {
      iziToast.error({
        message: error.message,
        ...toastCommonOpts,
      });
    })
    .finally(() => {
      event.target.reset();
      loaderEl.classList.add('is-hidden');
    });
}

formSearchEl.addEventListener('submit', onSearch);
