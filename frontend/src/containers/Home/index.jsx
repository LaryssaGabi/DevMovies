import { useEffect, useState } from 'react'
import api from '../../services/api'
import { Backgroud, Container, Info, ContainerButtons, Poster } from './styles'
import Button from '../../components/Button'
import Slider from '../../components/Slider'
import { getImages } from '../../utils/getImages'

function Home() {
    const [movie, setMovie] = useState([])
    const [topMovies, setTopMovies] = useState([])

    useEffect(() => {
        async function getMovies() {
            const { data: { results } } = await api.get('/movie/popular')

            setMovie(results[0])
        }

        async function getTopMovies() {
            const { data: { results } } = await api.get('/movie/top_rated')
            console.log(results)
            setTopMovies(results)
        }

        getTopMovies()
        getMovies()
    }, [])




    return (

        <>
            {movie && (
                <Backgroud img={getImages(movie.backdrop_path)}>

                    <Container>
                        <Info>
                            <h1>{movie.title}</h1>
                            <p>{movie.overview}</p>
                            <ContainerButtons>
                                <Button red={true}>Assita Agora</Button>
                                <Button red={false}>Assita o Trailer</Button>
                            </ContainerButtons>
                        </Info>
                        <Poster>
                            <img src={getImages(movie.poster_path)} />
                        </Poster>
                    </Container>
                </Backgroud >
            )}

            {topMovies && <Slider info={topMovies} title={'Top Filmes'} />}
        </>
    )
}

export default Home
