import styled from "styled-components";
import { useState } from "react";
import Button from "../button/Button";
import Typewriter from "typewriter-effect";

interface MenuProps {
  click: boolean;
}

const Section = styled.section`
  width: 100vw;
  background-color: ${(props) => props.theme.body};
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 85%;
  height: ${(props) => props.theme.navHeight};
  margin: 0 auto;
  .mobil {
    display: none;
  }
  @media (max-width: 64em) {
    .desktop {
      display: none;
    }
    .mobil {
      display: inline-block;
    }
  }
`;

const Menu = styled.ul<MenuProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  @media (max-width: 64em) {
    /**1024 */
    position: fixed;
    top: ${(props) => props.theme.navHeight};
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: ${(props) => `calc(100vh - ${props.theme.navHeight})`};
    z-index: 50;
    background-color: ${(props) => `rgba(${props.theme.bodyRgba}, 0.85)`};
    backdrop-filter: blur(2px);
    transform: ${(props) =>
      props.click ? "translateY(0)" : `translateY(100%)`};
    transform: ${(props) =>
      props.click ? "translateY(0)" : `translateY(1000%)`};
    transition: all 0.3s ease;
    flex-direction: column;
    justify-content: center;
    touch-action: none;
  }
`;

const MenuItem = styled.li`
  margin: 0 1rem;
  color: ${(props) => props.theme.text};
  cursor: pointer;
  &::after {
    content: " ";
    display: block;
    width: 0%;
    height: 2px;
    background: ${(props) => props.theme.text};
    transition: width 0.3s ease;
  }
  &:hover::after {
    width: 100%;
  }
  @media (max-width: 64em) {
    margin: 1rem 0;
    &::after {
      display: none;
    }
  }
`;

const HamburgerMenu = styled.span<MenuProps>`
  width: ${(props) => (props.click ? "2rem" : "1.5rem")};
  height: 2px;
  background: ${(props) => props.theme.text};
  position: absolute;
  top: 2rem;
  left: 50%;
  transform: ${(props) =>
    props.click
      ? "translateX(-50%) rotate(90deg)"
      : "translateX(-50%) rotate(0)"};
  display: none;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  @media (max-width: 64em) {
    /**1024 */
    display: flex;
  }
  &::after,
  &::before {
    content: " ";
    width: ${(props) => (props.click ? "1rem" : "1.5rem")};
    height: 2px;
    right: ${(props) => (props.click ? "-2px" : "0")};
    background: ${(props) => props.theme.text};
    position: absolute;
    transition: all 0.3s ease;
  }
  &::after {
    top: ${(props) => (props.click ? "0.3rem" : "0.5rem")};
    transform: ${(props) => (props.click ? "rotate(-40deg)" : "rotate(0)")};
  }
  &::before {
    bottom: ${(props) => (props.click ? "0.3rem" : "0.5rem")};
    transform: ${(props) => (props.click ? "rotate(40deg)" : "rotate(0)")};
  }
`;

export const Home = () => {
  const [click, setClick] = useState(false);
  const scrollTo = (id: string) => {
    let element = document.getElementById(id) as any;
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
    setClick(!click);
  };

  return (
    <Section id="navegation">
      <NavBar>
        <h1>logo</h1>
        <HamburgerMenu click={click} onClick={() => setClick(!click)}>
          &nbsp;
        </HamburgerMenu>
        <Menu click={click}>
          <MenuItem onClick={() => console.log("callback")}>Home</MenuItem>
          <MenuItem onClick={() => console.log("callback")}>About Us</MenuItem>
          <MenuItem>
            <div className="mobil">
              <Button text="Connect Wallet" link="https://google.com" />
            </div>
          </MenuItem>
        </Menu>
        <div className="desktop">
          <Button text="Connect Wallet" link="https://google.com" />
        </div>
      </NavBar>
      <header style={{margin: "0 2rem"}}>
        <div style={{display: "flex", height: "90vh", alignItems: "center", justifyContent: "center", textAlign: "center"}}>
          <Typewriter
            options={{
              deleteSpeed: 0,
              delay: 0,
            }}
            onInit={(typewriter) => {
              typewriter
                .typeString(
                  "New way to hire freelancers and contractors. We use blockchain technology to create a secure and transparent way to hold funds in escrow until a project is completed. This eliminates the risk of fraud or theft, giving both freelancers and employers peace of mind."
                )
                .start()
            }}
          />
        </div>
      </header>
    </Section>
  );
};
