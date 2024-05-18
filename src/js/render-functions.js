export const createGalleryItemMarkup = images => {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
    <li class="gallery-item">
        <a class="gallery-link js-gallery-link" href="${largeImageURL}">
            <img class="gallery-img" src="${webformatURL}" alt="${tags}" >
        </a>
        <div class="gallery-info">
            <div class="gallery-info-item">
                <div class="gallery-info-title">Likes</div>
                <div class="gallery-info-value">${likes}</div>
            </div>
            <div class="gallery-info-item">
                <div class="gallery-info-title">Views</div>
                <div class="gallery-info-value">${views}</div>
            </div>
            <div class="gallery-info-item">
                <div class="gallery-info-title">Comments</div>
                <div class="gallery-info-value">${comments}</div>
            </div>
            <div class="gallery-info-item">
                <div class="gallery-info-title">Downloads</div>
                <div class="gallery-info-value">${downloads}</div>
            </div>
        </div>   
    </li>`
    )
    .join('');
};
