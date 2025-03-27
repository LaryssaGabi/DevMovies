/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { Background, Container, ContainerDiv } from "./styles"
import { getMovieVideos } from "../../services/getData"
import { VideoOff } from 'lucide-react';


function Modal({ movieId, setShowModal }) {
    const [movie, setMovie] = useState([])

    useEffect(() => {
        async function getMovies() {
            const videos = await getMovieVideos(movieId);
            setMovie(videos || [])
        }

        getMovies()
    }, [movieId])



    return (
        <Background onClick={() => setShowModal(false)}>
            {movie.length > 0 && movie[0]?.key ? (
                <Container>
                    <iframe
                        src={`https://www.youtube.com/embed/${movie[0].key}`}
                        title="Youtube Video Player"
                        height="500px"
                        width="100%"
                    />
                </Container>
            ) : (
                <ContainerDiv>
                    <p>Esse catálogo não tem vídeos de trailer disponíveis.</p>
                    <VideoOff color="white" size={80}/>
                </ContainerDiv>
            )}
        </Background>
    )
}

export default Modal