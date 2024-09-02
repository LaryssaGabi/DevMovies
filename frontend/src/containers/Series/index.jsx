import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Backgroud, Container, Info, ContainerButtons, Poster } from './styles'
import Button from '../../components/Button'
import Slider from '../../components/Slider'
import { getImages } from '../../utils/getImages'
import Modal from '../../components/Modal'
import { getSeries, getPopularSerie, getSerieAir, getTopSerie, getAring } from '../../services/getData'

function Series() {
    const [showModal, setShowModal] = useState(false)
    const [serie, setSerie] = useState([])
    const [popularSeries, setPopularSeries] = useState([])
    const [serieAir, setSerieAir] = useState([])
    const [topSerie, setTopSerie] = useState([])
    const [arings, setArings] = useState([])
    const navigate = useNavigate()


    useEffect(() => {
        async function getAllData() {
            Promise.all([
                getSeries(),
                getPopularSerie(),
                getSerieAir(),
                getTopSerie(),
                getAring(),
            ])
                .then(([serie, popularSeries, serieAir, topSerie, arings]) => {
                    console.log({ serie, popularSeries, serieAir, topSerie, arings })
                    setSerie(serie)
                    setPopularSeries(popularSeries)
                    setSerieAir(serieAir)
                    setTopSerie(topSerie)
                    setArings(arings)
                })
                .catch((error) => console.error(error))
        }

        getAllData()
    }, [])




    return (

        <>
            {serie && (
                <Backgroud img={getImages(serie.backdrop_path)}>
                    {showModal && <Modal movieId={serie.id} setShowModal={setShowModal} />}
                    <Container>
                        <Info>
                            <h1>{serie.title}</h1>
                            <p>{serie.overview}</p>
                            <ContainerButtons>
                                <Button red={true} onClick={() => navigate(`/detalhe/${serie.id}`)} >Assita Agora</Button>
                                <Button red={false} onClick={() => setShowModal(true)}>Assita o Trailer</Button>
                            </ContainerButtons>
                        </Info>
                        <Poster>
                            <img src={getImages(serie.poster_path)} />
                        </Poster>
                    </Container>
                </Backgroud >
            )}

            {popularSeries && <Slider info={popularSeries} title={'Series Populares'} />}
            {serieAir && <Slider info={serieAir} title={'Series'} />}
            {topSerie && <Slider info={topSerie} title={'Series Top'} />}
            {arings && <Slider info={arings} title={'Exibidos na TV'} />}


        </>
    )
}

export default Series
