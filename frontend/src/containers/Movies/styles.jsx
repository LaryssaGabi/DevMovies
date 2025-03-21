import styled, { keyframes } from 'styled-components'

const scale = keyframes`
    from{
    transform: scale(0);
    }
    to{
        transform: scale(1);
    }
`

export const Backgroud = styled.div`
    background-image: url(${(props) => props.img});
    height: 100vh;
    background-position: center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;

    &::before{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
    }

    &::after{
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 150px;
        background-image: linear-gradient(to top, #000000, rgba(0,0,0,0));
    }
`
export const Container = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    max-width: 1500px;

    @media screen and (max-width: 630px) {
        display: flex;
        flex-direction: column-reverse;
        height: 70%;
    }

`
export const Info = styled.div`
    z-index: 2;
    padding: 20px;
    width: 50%;

    @media screen and (max-width: 630px) {
        display: flex;
        flex-direction: column;
        width: 100%;
    
    }

`

export const Div = styled.div`

    h1{
            font-size: 4.5rem;
            font-weight: 700;
            color: #fff;

            @media screen and (max-width: 900px) {
            font-size:3.4rem;
            }

            @media screen and (max-width: 630px) {
                font-size: 2.0rem;
                text-align: center;
            }
        }

        p{
            font-size: 20px;
            font-weight: 500;
            color: #fff;
            margin-top: 30px;
            margin-bottom: 20px;

            @media screen and (max-width: 900px) {
            font-size: 1rem;
            }

            @media screen and (max-width: 630px) {
                font-size: 0.9rem;
                text-align: center;
                margin-bottom: 0px;
            }
        }
`

export const Poster = styled.div`
    z-index: 2;

    img{
        width: 400px;
        border-radius: 30px;
        box-shadow: rgb(100 100 111 / 20%) 0px 7px 29px 0px;
        animation: ${scale} 0.5s linear;

        @media screen and (max-width: 900px) {
            width: 350px;
        }

        @media screen and (max-width: 740px) {
            width: 300px;
        }

        @media screen and (max-width: 630px) {
            display: flex;
            width: 250px;
        }

    }

`
export const ContainerButtons = styled.div`
    display: flex;
    gap: 20px;
    margin-top: 30px;
`