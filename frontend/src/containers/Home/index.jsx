import { useEffect, useState } from 'react'
import api from '../../services/api'
import { Backgroud, Container, Info, ContainerButtons, Poster } from './styles'
import Button from '../../components/Button'
import Slider from '../../components/Slider'
import { getImages } from '../../utils/getImages'
import Modal from '../../components/Modal'

function Home() {
    const [showModal, setShowModal] = useState(false)
    const [movie, setMovie] = useState([])
    const [topMovies, setTopMovies] = useState([])
    const [topSeries, setTopSeries] = useState([])
    const [popularSeries, setPopularSeries] = useState([])
    const [topPeople, setTopPeople] = useState([])


    useEffect(() => {
        async function getMovies() {
            const { data: { results } } = await api.get('/movie/popular')
            setMovie(results[0])
        }

        async function getTopMovies() {
            const { data: { results } } = await api.get('/movie/top_rated')
            setTopMovies(results)
        }


        async function getTopSeries() {
            const { data: { results } } = await api.get('/tv/top_rated')
            setTopSeries(results)
        }


        async function getPopularSeries() {
            const { data: { results } } = await api.get('/tv/popular')
            setPopularSeries(results)
        }

        async function getTopPeople() {
            const { data: { results } } = await api.get('/person/popular')
            setTopPeople(results)
        }

        getTopMovies()
        getMovies()
        getTopSeries()
        getPopularSeries()
        getTopPeople()
    }, [])




    return (

        <>
            {movie && (
                <Backgroud img={getImages(movie.backdrop_path)}>
                    {showModal && <Modal movieId={movie.id} setShowModal={setShowModal}/>}
                    <Container>
                        <Info>
                            <h1>{movie.title}</h1>
                            <p>{movie.overview}</p>
                            <ContainerButtons>
                                <Button red={true}>Assita Agora</Button>
                                <Button red={false} onClick={() => setShowModal(true)}>Assita o Trailer</Button>
                            </ContainerButtons>
                        </Info>
                        <Poster>
                            <img src={getImages(movie.poster_path)} />
                        </Poster>
                    </Container>
                </Backgroud >
            )}

            {topMovies && <Slider info={topMovies} title={'Top Filmes'} />}
            {topSeries && <Slider info={topSeries} title={'Top Series'} />}
            {popularSeries && <Slider info={popularSeries} title={'Series Na Alta'} />}
            {topPeople && <Slider info={topPeople} title={'Artista Na Alta'} />}
        </>
    )
}

export default Home
