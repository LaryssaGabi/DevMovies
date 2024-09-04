import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Backgroud, Container, Info, ContainerButtons, Poster } from './styles'
import Button from '../../components/Button'
import Slider from '../../components/Slider'
import { getImages } from '../../utils/getImages'
import Modal from '../../components/Modal'
import { getMovies, getPopularSeries, getTopMovies, getTopPeople, getTopSeries } from '../../services/getData'
import FooterCine from '../../components/Footer'

function Home() {
    const [showModal, setShowModal] = useState(false)
    const [movie, setMovie] = useState([])
    const [topMovies, setTopMovies] = useState([])
    const [topSeries, setTopSeries] = useState([])
    const [popularSeries, setPopularSeries] = useState([])
    const [topPeople, setTopPeople] = useState([])
    const navigate = useNavigate()


    useEffect(() => {
        async function getAllData() {
            Promise.all([
                getMovies(),
                getTopMovies(),
                getTopSeries(),
                getPopularSeries(),
                getTopPeople(),
            ])
                .then(([movie, topMovies, topSeries, popularSeries, topPeople]) => {
                    setMovie(movie)
                    setTopMovies(topMovies)
                    setTopSeries(topSeries)
                    setPopularSeries(popularSeries)
                    setTopPeople(topPeople)
                })
                .catch((error) => console.error(error))
        }

        getAllData()
    }, [])




    return (

        <>
            {movie && (
                <Backgroud img={getImages(movie.backdrop_path)}>
                    {showModal && <Modal movieId={movie.id} setShowModal={setShowModal} />}
                    <Container>
                        <Info>
                            <h1>{movie.title}</h1>
                            <p>{movie.overview}</p>
                            <ContainerButtons>
                                <Button red={true} onClick={() => navigate(`/detalhe/${movie.id}`)} >Assita Agora</Button>
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
            <FooterCine />
        </>
    )
}

export default Home
