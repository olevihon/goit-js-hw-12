import axios from 'axios';

const API_KEY = '28832278-63978a27bea5cce988fdacee8';

axios.defaults.baseURL = 'https://pixabay.com/';

export const PER_PAGE = 15;

export const fetchPhotos = async (query, pageNumber = 1) => {
  const response = await axios.get('api/', {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: PER_PAGE,
      page: pageNumber,
    },
  });

  return response.data;
};
