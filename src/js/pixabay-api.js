import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "52982247-0d25e92a2d7c3074b601ee372";
const PER_PAGE = 15;

export const PER_PAGE_COUNT = PER_PAGE;

export async function getImagesByQuery(query, page = 1) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: true,
      page: page,
      per_page: PER_PAGE,
    },
  });
  return response.data;
}