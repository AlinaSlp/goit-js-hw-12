import { getImagesByQuery, PER_PAGE_COUNT } from "./js/pixabay-api.js";
import {
    createGallery,
    clearGallery,
    showLoader,
    hideLoader,
    showLoadMoreButton,
    hideLoadMoreButton,
} from "./js/render-functions.js";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const refs = {
    form: document.querySelector(".form"),
    input: document.querySelector('input[name="search-text"]'),
    loadMoreBtn: document.querySelector(".load-more-btn"),
};

let query = "";
let page = 1;
let totalHits = 0;

refs.form.addEventListener("submit", onSearch);
refs.loadMoreBtn.addEventListener("click", onLoadMore);

async function onSearch(e) {
    e.preventDefault();
    query = refs.input.value.trim();

    if (!query) {
        iziToast.warning({
            title: "Warning",
            message: "Please enter a search query",
            position: "topRight",
        });
        return;
    }
    
    page = 1;
    clearGallery();
    refs.input.value = "";
    hideLoadMoreButton();
    showLoader();

    const data = await getImagesByQuery(query, page);
    hideLoader();

    if (!data.hits || data.hits.length === 0) {
        iziToast.error({
            title: "",
            message: "Sorry, there are no images matching your search query. Please try again!",
            position: "topRight",
            });
        return;
    }

    totalHits = data.totalHits;
    createGallery(data.hits);
    showLoadMoreButton();
}

async function onLoadMore() {
    page += 1;
    showLoader();
    
    try {
        const data = await getImagesByQuery(query, page);
        hideLoader();
        createGallery(data.hits, true);

        const totalPages = Math.ceil(totalHits / PER_PAGE_COUNT);

        if (page >= totalPages) {
            hideLoadMoreButton();
            iziToast.info({
            title: "",
            message: "We're sorry, but you've reached the end of search results.",
            position: "topRight",
            });
        }

        const { height: cardHeight } = document
        .querySelector(".gallery")
        .firstElementChild.getBoundingClientRect();

        window.scrollBy({
            top: cardHeight * 2,
            behavior: "smooth",
            });
    } catch (error) {
            hideLoader();
            console.error(error);
        }
}