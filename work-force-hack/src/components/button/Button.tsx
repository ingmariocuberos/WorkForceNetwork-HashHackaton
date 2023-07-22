import { styled } from "styled-components"

interface IButton {
    text: string,
    link: string
}

const Btn = styled.button`
display: inline-block;
background-color: rgb(32, 32, 32);
color: rgb(255, 255, 255);
outline: none;
border: none;

font-size: 0.875em;
padding: 0.9rem 2.3rem;
border-radius: 50px;
cursor: pointer;
transition: all 0.2s ease; 
position: relative;


&:hover{
    transform: scale(0.9);
}

&::after{
    content: ' ';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    border: 2px solid rgb(32, 32, 32);
    width: 100%;
    height: 100%;
    border-radius: 50px;
    transition: all 0.2s ease;
}

&:hover::after{
    transform: translate(-50%, -50%) scale(1);
    padding:0.3rem
}

a {
    text-decoration: none;
    color: white;
}

`;

// eslint-disable-next-line react/prop-types
const Button = ({text, link}: IButton) => {
  return (
    <Btn>
        <a href={link} aria-label={text} target="_blank" rel="noreferrer">
        {text}
        </a>
    </Btn>
  )
}

export default Button