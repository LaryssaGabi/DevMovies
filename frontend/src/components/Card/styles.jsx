import styled from "styled-components";


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: 200ms;
    
    img{
        border-radius: 15px;
        width: 200px;
        height: 100%;
        cursor: pointer;
        transition: 300ms ease-in-out;

        &:hover{
            border: #E6E339 solid 2px;
            padding: 2px;
        }

    }

    h3{
        color: #fff;
        margin-top: 15px;
    }   

`