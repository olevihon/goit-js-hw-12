// https://izitoast.marcelodolza.com/
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// https://simplelightbox.com/
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchPhotos, PER_PAGE } from './js/pixabay-api';
import { createGalleryItemMarkup } from './js/render-functions';
import {
  hideEl,
  showEl,
  setDisabled,
  unsetDisabled,
  clearElInnerHtml,
} from './js/helpers';

const galleryEl = document.querySelector('.js-gallery');
const formSearchEl = document.querySelector('.js-form-search');
const loaderEl = document.querySelector('.js-loader');
const btnMoreEl = document.querySelector('.js-btn-more');
const endMsgEl = document.querySelector('.js-end-msg');

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

let searchQuery = '';
let currentPage = 1;
let totalPages = 0;
let lastGalleryItemEl = null;

const setLastGalleryItemEL = () => {
  lastGalleryItemEl = galleryEl.querySelector('.js-gallery-item:last-child');
};

const onSearch = async event => {
  event.preventDefault();

  // Define form and submit button elements
  const form = event.currentTarget;
  const submitBtnEl = form.querySelector('.js-btn-submit');

  // Get search query from input
  searchQuery = form.elements.searchKeyword.value.trim();

  // Handle empty query
  if (searchQuery === '') {
    iziToast.error({
      message: 'Please enter search query',
      ...toastCommonOpts,
    });
    return;
  }

  // Clear gallery html
  clearElInnerHtml(galleryEl);

  // Hide load more btn
  hideEl(btnMoreEl);

  // Hide end gallery items message
  hideEl(endMsgEl);

  try {
    // Disabled submit btn
    setDisabled(submitBtnEl);

    // Show loader
    showEl(loaderEl);

    // Get gallery items
    const { hits, totalHits } = await fetchPhotos(searchQuery, currentPage);

    // Handle not found query
    if (totalHits === 0) {
      // Enable search btn
      unsetDisabled(submitBtnEl);

      // Show error message
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        ...toastCommonOpts,
      });

      // Hide loader
      hideEl(loaderEl);

      // Reset form
      form.reset();

      // Stop func evaluation here
      return;
    }

    // Hide loader
    hideEl(loaderEl);

    // Add gallery items on page
    galleryEl.innerHTML = createGalleryItemMarkup(hits);

    // Set last gallery item element ( will be need later for load more btn )
    setLastGalleryItemEL();

    // Refresh lightbox
    lightbox.refresh();

    // Reset form
    form.reset();

    // Hide loader
    hideEl(loaderEl);

    // Enable search btn
    unsetDisabled(submitBtnEl);

    // Handle show more btn
    totalPages = Math.ceil(totalHits / PER_PAGE);
    if (totalPages > 1) {
      showEl(btnMoreEl);
      btnMoreEl.addEventListener('click', onBtnMoreClick);
    }
  } catch (error) {
    // Enable search btn
    unsetDisabled(submitBtnEl);

    // Hide loader
    hideEl(loaderEl);

    // Show error message
    iziToast.error({
      message: error.message,
      ...toastCommonOpts,
    });
  }
};

const onBtnMoreClick = async event => {
  try {
    currentPage += 1;

    // Hide btn more
    hideEl(btnMoreEl);

    // Show loader
    showEl(loaderEl);

    // Get gallery items
    const { hits, totalHits } = await fetchPhotos(searchQuery, currentPage);

    // Hide loader
    hideEl(loaderEl);

    // Add gallery items on page
    galleryEl.insertAdjacentHTML('beforeend', createGalleryItemMarkup(hits));

    // Refresh lightbox
    lightbox.refresh();

    // Scroll to new added items
    window.scrollBy({
      top: lastGalleryItemEl.getBoundingClientRect().bottom,
      left: 0,
      behavior: 'smooth',
    });

    // Set last gallery item ( must be after scroll )
    setLastGalleryItemEL();

    // Handle btn more
    totalPages = Math.ceil(totalHits / PER_PAGE);
    if (currentPage < totalPages) {
      showEl(btnMoreEl);
    } else {
      btnMoreEl.removeEventListener('click', onBtnMoreClick);
      showEl(endMsgEl);
    }
  } catch (error) {
    // Hide loader
    hideEl(loaderEl);

    // Show error message
    iziToast.error({
      message: error.message,
      ...toastCommonOpts,
    });
  }
};

formSearchEl.addEventListener('submit', onSearch);
