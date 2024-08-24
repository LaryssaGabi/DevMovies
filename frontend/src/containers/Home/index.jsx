import { useState } from 'react'
import api from '../../services/api'
import { Backgroud } from './styles'

function Home() {
    const [movie, setMovie] = useState([])


    async function getMovies() {
        const data = await api.get('/movie/popular')
        setMovie(data.data.results[0])
        console.log(movie)
    }

    getMovies()

    return (
        <>
            <Backgroud img='https://image.tmdb.org/t/p/original/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg'>
                <h1>{movie.title}</h1>
                <p>{movie.overview}</p>
            </Backgroud>
        </>
    )
}

export default Home
