import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Backgroud, Container, Info, ContainerButtons, Poster } from './styles'
import Button from '../../components/Button'
import Slider from '../../components/Slider'
import { getImages } from '../../utils/getImages'
import Modal from '../../components/Modal'
import { getMovie, getPopularMovie,getMovieViewNow,getMovieView } from '../../services/getData'
import FooterCine from '../../components/Footer'

function Movies() {
    const [showModal, setShowModal] = useState(false)
    const [movie, setMovie] = useState([])
    const [popularMovies, setPopularMovies] = useState([])
    const [movieViewNow, setMovieViewNow] = useState([])
    const [movieView, setMovieView] = useState([])
    const navigate = useNavigate()


    useEffect(() => {
        async function getAllData() {
            Promise.all([
                getMovie(),
                getPopularMovie(),
                getMovieViewNow(),
                getMovieView(),
            ])
                .then(([movie, popularMovies,movieViewNow,movieView]) => {
                    setMovie(movie)
                    setPopularMovies(popularMovies)
                    setMovieViewNow(movieViewNow)
                    setMovieView(movieView)
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

            {popularMovies && <Slider info={popularMovies} title={'Filmes Na Alta'} />}
            {movieViewNow && <Slider info={movieViewNow} title={'Filmes para asistir agora'} />}
            {movieView && <Slider info={movieView} title={'Filmes para asistir no film de Noite'} />}
            <FooterCine />
        </>
    )
}

export default Movies
