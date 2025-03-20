/* eslint-disable react/prop-types */
import { Container } from "./styles"
import { Swiper, SwiperSlide } from 'swiper/react'
import Card from "../Card"
import { useNavigate } from "react-router-dom"


function Slider({ info, title }) {
    const navigate = useNavigate()

    return (
        <Container>
            <h2>{title}</h2>
            <Swiper
                grabCursor
                spaceBetween={10}
                slidesPerView={'auto'}
                className="swiper"
            >
                {info.map((item, index) => (
                    <SwiperSlide key={index}>
                        <Card 
                        item={item}
                        onClick={() => {
                            const route = item.title ? `/detalhe/${item.id}` : `/detalheSeries/${item.id}`;
                            navigate(route);
                        }}
                        />
                    </SwiperSlide>
                ))}

            </Swiper>
        </Container>
    )
}

export default Slider