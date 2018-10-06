import styled, { keyframes } from 'styled-components';

const smallWidth = '560px';
const tinyScreen = '340px';
const inputHeight = '66px';
const smallInputHeight = '54px';

export const Form = styled.form`
  display: flex;
  position: relative;
  max-width: 440px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: ${smallWidth}) {
    max-width: 380px;
    left: auto;
  }
`;

export const Input = styled.input`
  display: inline;
  height: ${inputHeight};
  width: 100%;
  padding: 0 18px;
  background: #fff;
  font-size: 1.3rem;
  font-weight: 300;
  letter-spacing: 0.1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border: none;
  outline: none;
  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  color: #333;
  transition: border 150ms ease, box-shadow 150ms ease;

  &:hover {
    border: 1px solid rgba(0, 0, 0, 0.1);
  }

  &:focus,
  &:active {
    border: 1px solid rgba(0, 0, 0, 0.4);
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
  }

  @media (max-width: ${smallWidth}) {
    font-size: 1.15rem;
    height: ${smallInputHeight};
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    border-right: none;
  }
`;

export const Button = styled.button`
  display: block;
  position: absolute;
  top: 50%;
  right: 0;
  height: 48px;
  padding: 0;
  width: ${({ isLoading, isSuccess, isFailure }: any) =>
    isLoading || isSuccess || isFailure ? '48px' : '100px'};
  transform: translateX(50%) translateY(-50%);
  background: ${({ isSuccess, isFailure }: any) => {
    if (isSuccess) return '#2ECC71';
    if (isFailure) return '#E74C3C';
    return '#3498db';
  }};
  color: #fff;
  border-radius: ${({ isLoading, isSuccess, isFailure }: any) =>
    isLoading || isSuccess || isFailure ? '100%' : '2px'};
  transition-property: border-radius, background, width, transform;
  transition-duration: 250ms;
  transition-timing-function: ease;
  text-align: center;
  cursor: pointer;
  outline: none;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 12px;
  letter-spacing: 0.2rem;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);

  @media (max-width: ${smallWidth}) {
    position: relative;
    top: auto;
    right: auto;
    width: 120px;
    height: ${smallInputHeight};
    border-radius: 2px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    transform: none;
    transition: none;
  }
`;

const iconPop = keyframes`
  0%, 20% {
    opacity: 0;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

export const ButtonIcon = styled.div`
  animation: ${iconPop} 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  letter-spacing: normal;
  transform-origin: 50%;
`;

export const Message = styled.p`
  margin-top: 1rem;
  font-size: 1rem;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);

  @media (max-width: ${tinyScreen}) {
    font-size: 0.85rem;
  }
`;

export const SuccessMessage = styled.span`
  color: #2ecc71;
`;

export const ErrorMessage = styled.span`
  color: #E74C3C;
`;
