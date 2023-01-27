// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');
const galleryMarkup = galleryItems
  .map(item => {
    return `<a class="gallery__item" href="${item.original}">
        <img
          class="gallery__image"
          src="${item.preview}"
          data-source="${item.original}"
          alt="${item.description}"
        />
      </a>`
  })
  .join('');

galleryEl.innerHTML = galleryMarkup;

new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});
