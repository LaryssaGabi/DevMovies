import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { Container, Background, Cover, Info, ContainerMovies } from "./styles"
import Slider from '../../components/Slider'
import { getImages } from "../../utils/getImages"
import SpanGenres from "../../components/SpanGenres"
import Credits from "../../components/Credits"
import { getSerieById, getSerieCredits, getSerieSimilar, getSerieVideos } from "../../services/getData"
import FooterCine from "../../components/Footer"



function DetailSerie() {
    const { id } = useParams()
    const [serie, setSerie] = useState()
    const [serieVideos, setSerieVideo] = useState()
    const [serieCredits, setSerieCredits] = useState()
    const [serieSimilar, setSerieSimilar] = useState()

    useEffect(() => {
        async function getAllData() {
            Promise.all([
                getSerieById(id),
                getSerieVideos(id),
                getSerieCredits(id),
                getSerieSimilar(id),
            ])
                .then(([serie, videos, credits, similar]) => {
                    console.log({ serie, videos, credits, similar })
                    setSerie(serie)
                    setSerieVideo(videos)
                    setSerieCredits(credits)
                    setSerieSimilar(similar)
                })
                .catch((error) => console.error(error))
        }

        getAllData()
    }, [])


    return (
        <>
            {serie && (
                <>
                    <Background image={getImages(serie.backdrop_path)} />
                    <Container>
                        <Cover>
                            <img src={getImages(serie.poster_path)} />
                        </Cover>
                        <Info>
                            <h2>{serie.title}</h2>
                            <SpanGenres genres={serie.genres} />
                            <p>{serie.overview}</p>
                            <div>
                                <Credits credits={serieCredits} />
                            </div>
                        </Info>
                    </Container>

                    <ContainerMovies>
                        {serieVideos && serieVideos.map((video) => (
                            <div key={video.id}>
                                <h4>{video.name}</h4>
                                <iframe
                                    src={`https://www.youtube.com/embed/${video.key}`}
                                    title="Youtube Video Player"
                                    height='500px'
                                    width='100%'
                                >
                                </iframe>
                            </div>
                        ))}
                    </ContainerMovies>

                    {serieSimilar && <Slider info={serieSimilar} title={'Filmes Similares'} />}
                </>
            )}
            <FooterCine />
        </>
    )
}

export default DetailSerie