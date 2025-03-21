import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Backgroud, Container, Info, ContainerButtons, Poster, Div } from './styles';
import Button from '../../components/Button';
import Slider from '../../components/Slider';
import { getImages } from '../../utils/getImages';
import Modal from '../../components/Modal';
import { getMovies, getPopularSeries, getTopMovies, getTopPeople, getTopSeries } from '../../services/getData';
import FooterCine from '../../components/Footer';

import { Clapperboard, Film, Popcorn, Users } from 'lucide-react';

function Home() {
    const [showModal, setShowModal] = useState(false);
    const [movie, setMovie] = useState(null);
    const [topMovies, setTopMovies] = useState([]);
    const [topSeries, setTopSeries] = useState([]);
    const [popularSeries, setPopularSeries] = useState([]);
    const [topPeople, setTopPeople] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function getAllData() {
            try {
                const [movieData, topMoviesData, topSeriesData, popularSeriesData, topPeopleData] = await Promise.all([
                    getMovies(),
                    getTopMovies(),
                    getTopSeries(),
                    getPopularSeries(),
                    getTopPeople(),
                ]);

                setMovie(movieData);
                setTopMovies(topMoviesData);
                setTopSeries(topSeriesData);
                setPopularSeries(popularSeriesData);
                setTopPeople(topPeopleData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        getAllData();
    }, []);

    return (
        <>
            {movie && (
                <Backgroud img={getImages(movie.backdrop_path)}>
                    {showModal && <Modal movieId={movie.id} setShowModal={setShowModal} />}
                    <Container>
                        <Info>
                            <Div>
                                <h1>{movie.title}</h1>
                                <p>{movie.overview}</p>
                            </Div>
                            <ContainerButtons>
                                <Button red={true} onClick={() => navigate(`/detalhe/${movie.id}`)}>
                                    Assista Agora
                                </Button>
                                <Button red={false} onClick={() => setShowModal(true)}>
                                    Assista o Trailer
                                </Button>
                            </ContainerButtons>
                        </Info>
                        <Poster>
                            <img src={getImages(movie.poster_path)} alt={movie.title} />
                        </Poster>
                    </Container>
                </Backgroud>
            )}

            {topMovies.length > 0 && <Slider info={topMovies} title={<><Clapperboard /> Top Filmes</>} />}
            {topSeries.length > 0 && <Slider info={topSeries} title={<><Popcorn /> Top Séries</>} />}
            {popularSeries.length > 0 && <Slider info={popularSeries} title={<><Film /> Séries Na Alta</>} />}
            {topPeople.length > 0 && <Slider info={topPeople} title={<><Users /> Artistas Populares</>} />}

            <FooterCine />
        </>
    );
}

export default Home;
