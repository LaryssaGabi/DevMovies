import styled from "styled-components";

export const Container = styled.div`
    z-index: 999;
    min-height: 100px;
    position: fixed;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 50px;
    background-color: ${props => props.changeBackground ? '#000' : 'trasparent'};
    transition: background-color 0.6s ease-in-out;

    img{
        width: 26%;
    }
    
`
export const Menu = styled.ul`
    display: flex;
    list-style: none;
    gap: 50px;

    @media screen and (max-width: 990px) {
        gap: 25px;
    }
    
    @media screen and (max-width: 790px) {
        gap: 15px;
    }

`
export const Li = styled.li`
    font-weight: 600;
    cursor: pointer;
    font-size: 1.8rem;
    position: relative;

    @media screen and (max-width: 990px) {
        font-size: 1.5rem;
    }

    @media screen and (max-width: 790px) {
        font-size: 1.2rem;
    }
  

    a{
        color: #fff;
        text-decoration: none;
    }
    
    &::after{
        content: "";
        height: 3px;
        width: ${props => props.isActive ? '100%' : 0};
        background-color: #189b20;
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        transition: width 0.5s ease-in-out;
    }

    &:hover::after{
        width: 100%;
    }


`
