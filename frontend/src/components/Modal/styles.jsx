import styled from "styled-components";

export const Background = styled.div`
    height: 100vh;
    width: 100%;
    z-index: 999;
    background-color: rgba(0,0,0,0.8);
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
  
`
export const Container = styled.div`
    background-color: #000;
    width: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    padding: 50px;
    max-width: 1200px;
    border-radius: 20px;

    iframe{
        border: none;
        height: 60vh;
    }
  
`
export const ContainerDiv = styled.div`
    background-color: #000;
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    gap: 20px;
    padding: 50px;
    max-width: 1200px;
    border-radius: 20px;

   p{
    color: #fff;
    font-size: 20px;
   }
  
`