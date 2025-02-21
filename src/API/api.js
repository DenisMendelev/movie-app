import axios from 'axios';

const API_KEY = '9e25a9499e4cac67533842dfe52b0da8';
const BASE_URL = 'https://api.themoviedb.org/3';

export const createGuestSession = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/authentication/guest_session/new`,
      {
        params: { api_key: API_KEY },
      }
    );
    return response.data.guest_session_id;
  } catch (error) {
    console.error('Error creating guest session:', error);
    throw error;
  }
};

export const fetchMovies = async (query, page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: { api_key: API_KEY, query, page },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const fetchGenres = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
      params: { api_key: API_KEY },
    });
    return response.data.genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};

export const rateMovie = async (guestSessionId, movieId, rating) => {
  try {
    await axios.post(
      `${BASE_URL}/movie/${movieId}/rating`,
      { value: rating },
      {
        params: { api_key: API_KEY, guest_session_id: guestSessionId },
      }
    );
  } catch (error) {
    console.error('Error rating movie:', error);
    throw error;
  }
};

export const getRatedMovies = async (guestSessionId, page = 1) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/guest_session/${guestSessionId}/rated/movies`,
      {
        params: { api_key: API_KEY, page },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching rated movies:', error);
    throw error;
  }
};
