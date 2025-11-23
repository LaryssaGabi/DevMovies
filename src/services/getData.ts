import api from './api';

// Home
export async function getMovies() {
  const { data: { results } } = await api.get('/movie/popular');
  return results[0];
}

export async function getTopMovies() {
  const { data: { results } } = await api.get('/movie/top_rated');
  return results;
}

export async function getTopSeries() {
  const { data: { results } } = await api.get('/tv/top_rated');
  return results;
}

export async function getPopularSeries() {
  const { data: { results } } = await api.get('/tv/popular');
  return results;
}

export async function getTopPeople() {
  const { data: { results } } = await api.get('movie/upcoming');
  return results;
}

// Filmes
export async function getMovie() {
  const { data: { results } } = await api.get('/movie/upcoming');
  return results[12];
}

export async function getPopularMovie() {
  const { data: { results } } = await api.get('/movie/popular');
  return results;
}

export async function getMovieViewNow() {
  const { data: { results } } = await api.get('/movie/upcoming');
  return results;
}

export async function getMovieView() {
  const { data: { results } } = await api.get('/movie/top_rated');
  return results;
}

// Series
export async function getSeries() {
  const { data: { results } } = await api.get('/tv/top_rated');
  return results[2];
}

export async function getSerieAir() {
  const { data: { results } } = await api.get('/tv/on_the_air');
  return results;
}

export async function getTopSerie() {
  const { data: { results } } = await api.get('/tv/top_rated');
  return results;
}

export async function getAring() {
  const { data: { results } } = await api.get('/tv/airing_today');
  return results;
}

// Detail filmes
export async function getMovieVideos(movieId: number) {
  const { data: { results } } = await api.get(`/movie/${movieId}/videos`);
  return results;
}

export async function getMovieCredits(movieId: number) {
  const { data: { cast } } = await api.get(`/movie/${movieId}/credits`);
  return cast;
}

export async function getMovieSimilar(movieId: number) {
  const { data: { results } } = await api.get(`/movie/${movieId}/similar`);
  return results;
}

export async function getMovieById(movieId: number) {
  const { data } = await api.get(`/movie/${movieId}`);
  return data;
}

// Detail series
export async function getSerieVideos(serieId: number) {
  const { data: { results } } = await api.get(`/tv/${serieId}/videos`);
  return results;
}

export async function getSerieCredits(serieId: number) {
  const { data: { cast } } = await api.get(`/tv/${serieId}/credits`);
  return cast;
}

export async function getSerieSimilar(serieId: number) {
  const { data: { results } } = await api.get(`/tv/${serieId}/similar`);
  return results;
}

export async function getSerieById(serieId: number) {
  const { data } = await api.get(`/tv/${serieId}`);
  return data;
}

// Search and Filters
export async function searchMulti(query: string, page = 1) {
  const { data } = await api.get('/search/multi', {
    params: { query, page },
  });
  return data;
}

export async function getGenres(type: 'movie' | 'tv' = 'movie') {
  const { data: { genres } } = await api.get(`/genre/${type}/list`);
  return genres;
}

export async function discoverByGenre(
  genreId: number,
  type: 'movie' | 'tv' = 'movie',
  page = 1
) {
  const { data } = await api.get(`/discover/${type}`, {
    params: { with_genres: genreId, page },
  });
  return data;
}
