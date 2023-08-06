import styled from 'styled-components';

export const ModalContainer = styled.div`
  background: #801e1e;
  color: #fff;
  padding: 40px;
  text-align: center;
  border-radius: 8px;
  width: 100%;
  max-width: 850px;
  position: relative;
  z-index: 9999;

  @media screen and (max-width: 640px) {
    padding: 20px;
  }
`;

export const ModalOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: #000;
`;
