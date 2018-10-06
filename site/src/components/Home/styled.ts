import styled, { keyframes } from 'styled-components';
import tip from 'static/images/tip.jpg';

const smallScreen = '620px';
const tinyScreen = '340px';

export const Container = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  padding: 40px 20px 20vh;
  background-size: cover;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: #FFF;
  overflow: hidden;
`;

const backgroundGrow = keyframes`
  0% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
`

export const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(rgba(41,128,185, 0.3), rgba(41,128,185, 0.3)),
                    url('${tip}');
  background-size: cover;
  pointer-events: none;
  z-index: -2;
  animation: ${backgroundGrow} 60s ease-out 1;
  transform-origin: 50% 100%;
`;

export const Title = styled.h1`
  font-size: 6rem;
  line-height: 7rem;
  margin-bottom: 0;
  font-weight: 100;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
  color: #FFF;

  @media (max-width: ${smallScreen}) {
    font-size: 5rem;
  }

  @media (max-width: ${tinyScreen}) {
    font-size: 4rem;
  }
`;

export const Tagline = styled.p`
  margin: 0 auto 2rem;
  font-size: 2rem;
  font-weight: 100;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);

  @media (max-width: ${smallScreen}) {
    font-size: 1.7rem;
  }

  @media (max-width: ${tinyScreen}) {
    font-size: 1.4rem;
  }
`;

export const DemoButton = styled.a`
  display: block;
  margin: 0 auto;
  height: 4.5rem;
  line-height: 4.5rem;
  max-width: 440px;
  width: 100%;
  font-size: 1.3rem;
  letter-spacing: 0.05rem;
  border-radius: 2px;
  border: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  /* background: linear-gradient(to right, rgb(142, 45, 226), rgb(74, 0, 224)); */
  background: #3498db;
  color: #FFF;
  transition: all 100ms ease;

  &:hover,
  &:active,
  &:visited {
    transform: translateY(-2px);
    color: #FFF;
    text-decoration: none !important;
  }
`;

export const Divider = styled.div`
  position: relative;
  display: block;
  text-align: center;
  max-width: 800px;
  width: 100%;
  margin: 3rem auto;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  color: rgba(255, 255, 255, 0.9);

  &:before,
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 45%;
    height: 1px;
    width: calc(50% - 30px);
  }

  &:before {
    background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
    left: 0;
  }

  &:after {
    background: linear-gradient(to left, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
    right: 0;
  }
`;
