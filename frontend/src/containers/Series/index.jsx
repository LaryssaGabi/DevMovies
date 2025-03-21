import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Backgroud, Container, Info, ContainerButtons, Poster } from './styles'
import Button from '../../components/Button'
import Slider from '../../components/Slider'
import { getImages } from '../../utils/getImages'
import ModalSerie from '../../components/ModalSerie'
import { getSeries, getSerieAir, getTopSerie, getAring } from '../../services/getData'
import FooterCine from '../../components/Footer'
import { Clapperboard, Film, MonitorPlay } from 'lucide-react'

import { Div } from '../Home/styles'

function Series() {
    const [showModalSerie, setShowModalSerie] = useState(false)
    const [serie, setSerie] = useState([])
    const [serieAir, setSerieAir] = useState([])
    const [topSerie, setTopSerie] = useState([])
    const [arings, setArings] = useState([])
    const navigate = useNavigate()


    useEffect(() => {
        async function getAllData() {
            Promise.all([
                getSeries(),
                getSerieAir(),
                getTopSerie(),
                getAring(),
            ])
                .then(([serie, serieAir, topSerie, arings]) => {
                    setSerie(serie)
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
                    {showModalSerie && <ModalSerie serieId={serie.id} setShowModalSerie={setShowModalSerie} />}
                    <Container>
                        <Info>
                            <Div>
                                <h1>{serie.title}</h1>
                                <p>{serie.overview}</p>
                            </Div>
                            <ContainerButtons>
                                <Button red={true} onClick={() => navigate(`/detalheSeries/${serie.id}`)} >Assita Agora</Button>
                                <Button red={false} onClick={() => setShowModalSerie(true)}>Assita o Trailer</Button>
                            </ContainerButtons>
                        </Info>
                        <Poster>
                            <img src={getImages(serie.poster_path)} />
                        </Poster>
                    </Container>
                </Backgroud >
            )}


            {serieAir && <Slider info={serieAir} title={<> <Clapperboard /> Series </>} />}
            {topSerie && <Slider info={topSerie} title={<> <Film /> Series Top </>} />}
            {arings && <Slider info={arings} title={<> <MonitorPlay />  Exibidos na TV  </>} />}

            <FooterCine />
        </>
    )
}

export default Series
