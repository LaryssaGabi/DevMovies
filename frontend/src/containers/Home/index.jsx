import { useEffect, useState } from 'react'
import api from '../../services/api'
import { Backgroud, Container, Info,ContainerButtons, Poster } from './styles'
import Button from '../../components/Button'

function Home() {
    const [movie, setMovie] = useState([])

    useEffect(() => {
        async function getMovies() {
            const { data: { results } } = await api.get('/movie/popular')

            setMovie(results[0])
        }

        getMovies()
    }, [])




    return (

        <>
            {movie && (
                <Backgroud img={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}>
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
                            <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} />
                        </Poster>
                    </Container>
                </Backgroud >
            )
            }
        </>
    )
}

export default Home
