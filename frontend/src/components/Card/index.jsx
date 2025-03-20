/* eslint-disable react/prop-types */
import { Container } from "./styles"
import { getImages } from '../../utils/getImages'


function Card({ item, onClick }) {
    return (
        <Container onClick={onClick}>
            <img src={getImages(item.poster_path || item.profile_path || '')}/>
            <h3>{item.title || item.name} </h3>
        </Container>
    )
}

export default Card