import api from '../services/api'

//Home
export async function getMovies() {
    const { data: { results } } = await api.get('/movie/popular')
    return results[0]
}

export async function getTopMovies() {
    const { data: { results } } = await api.get('/movie/top_rated')
    return results
}

export async function getTopSeries() {
    const { data: { results } } = await api.get('/tv/top_rated')
    return results
}

export async function getPopularSeries() {
    const { data: { results } } = await api.get('/tv/popular')
    return results
}

export async function getTopPeople() {
    const { data: { results } } = await api.get('movie/upcoming')
    return results
}


//Filmes
export async function getMovie() {
    const { data: { results } } = await api.get('/movie/upcoming')
    return results[12]
}

export async function getPopularMovie() {
    const { data: { results } } = await api.get('/movie/popular')
    return results
}
export async function getMovieViewNow() {
    const { data: { results } } = await api.get('/movie/upcoming')
    return results
}
export async function getMovieView() {
    const { data: { results } } = await api.get('/movie/top_rated')
    return results
}



//Series
export async function getSeries() {
    const { data: { results } } = await api.get('/tv/top_rated')
    return results[2]
}

export async function getSerieAir() {
    const { data: { results } } = await api.get('/tv/on_the_air')
    return results
}

export async function getTopSerie() {
    const { data: { results } } = await api.get('/tv/top_rated')
    return results
}
export async function getAring() {
    const { data: { results } } = await api.get('/tv/airing_today')
    return results
}


//Detail filmes
export async function getMovieVideos(movieId) {
    const { data: { results } } = await api.get(`/movie/${movieId}/videos`)
    return results
}

export async function getMovieCredits(movieId) {
    const { data: { cast } } = await api.get(`/movie/${movieId}/credits`)
    return cast
}
export async function getMovieSimilar(movieId) {
    const { data: { results } } = await api.get(`/movie/${movieId}/similar`)
    return results
}
export async function getMovieById(movieId) {
    const { data } = await api.get(`/movie/${movieId}`)
    return data
}


//Detail series
export async function getSerieVideos(serieId) {
    const { data: { results } } = await api.get(`/tv/${serieId}/videos`)
    return results
}

export async function getSerieCredits(serieId) {
    const { data: { cast } } = await api.get(`/tv/${serieId}/credits`)
    return cast
}
export async function getSerieSimilar(serieId) {
    const { data: { results } } = await api.get(`/tv/${serieId}/similar`)
    return results
}
export async function getSerieById(serieId) {
    const { data } = await api.get(`/tv/${serieId}`)
    return data
}