import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
  gallery: document.querySelector(".gallery"),
  loader: document.querySelector(".loader"),
  loadMoreBtn: document.querySelector(".load-more-btn"),
};

const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

export function createGallery(images, append = false) {
  const markup = images
    .map(
      img => `
      <li class="gallery-item">
        <a class="gallery-link" href="${img.largeImageURL}">
          <img class="gallery-image" src="${img.webformatURL}" alt="${img.tags}" loading="lazy"/>
        </a>
        <div class="info">
          <p class="info-item"><b>Likes:</b><p class="info-item-result">${img.likes}</p></p>
          <p class="info-item"><b>Views:</b><p class="info-item-result">${img.views}</p></p>
          <p class="info-item"><b>Comments:</b><p class="info-item-result">${img.comments}</p></p>
          <p class="info-item"><b>Downloads:</b><p class="info-item-result">${img.downloads}</p></p>
        </div>
      </li>`
    )
    .join("");

  if (append) {
    refs.gallery.insertAdjacentHTML("beforeend", markup);
  } else {
    refs.gallery.innerHTML = markup;
  }
  
  lightbox.refresh();
}

export function clearGallery() {
  refs.gallery.innerHTML = "";
}

export function showLoader() {
  refs.loader.classList.remove("hidden");
}
export function hideLoader() {
  refs.loader.classList.add("hidden");
}

export function showLoadMore() {
  refs.loadMoreBtn.classList.remove("is-hidden");
}
export function hideLoadMore() {
  refs.loadMoreBtn.classList.add("is-hidden");
}
