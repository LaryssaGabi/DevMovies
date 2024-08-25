import styled from "styled-components";

export const Container = styled.div`
    z-index: 99;
    position: fixed;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 50px;

    img{
        width: 26%;
    }
    
`
export const Menu = styled.ul`
    display: flex;
    list-style: none;
    gap: 50px;

    
`
export const Li = styled.li`
    font-weight: 600;
    cursor: pointer;
    font-size: 28px;
    position: relative;

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