/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { Background, Container } from "./styles"
import { getSerieVideos } from "../../services/getData"


function ModalSerie({ serieId, setShowModalSerie }) {
    const [serie, setSerie] = useState()

    useEffect(() => {
        async function getSeries() {
            setSerie(await getSerieVideos(serieId))
        }

        getSeries()
    }, [])



    return (
        <Background onClick={() => setShowModalSerie(false)}>
            {serie && (
                <Container>
                    <iframe
                        src={`https://www.youtube.com/embed/${serie[0].key}`}
                        title="Youtube Video Player"
                        height='500px'
                        width='100%'
                    >
                    </iframe>
                </Container>
            )}
        </Background>
    )
}

export default ModalSerie