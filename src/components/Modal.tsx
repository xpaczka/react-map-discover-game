import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { ModalContainer, ModalOverlay } from './styled-components/Modal';

const Modal = ({ children }: { children: ReactNode }) => {
  return createPortal(
    <>
      <ModalOverlay />
      <ModalContainer>{children}</ModalContainer>
    </>,
    document.getElementById('modal')!
  );
};

export default Modal;
