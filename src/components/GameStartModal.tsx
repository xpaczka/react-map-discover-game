import Modal from './Modal';
import logo from '../assets/logo.png';
import { LogoContainer, ModalHeader, ModalContent } from './styled-components/GameStartModal';
import { useDispatch } from 'react-redux';
import { startGame } from '../store/gameSlice';
import Button from './Button';
import { useCallback } from 'react';

const GameStartModal = () => {
  const dispatch = useDispatch();

  const startGameHandler = useCallback(() => {
    dispatch(startGame());
  }, [dispatch]);

  return (
    <Modal>
      <LogoContainer>
        <img src={logo} alt='Straw Hat Logo' height={96} width={96} />
      </LogoContainer>
      <ModalHeader>Welcome to Grand Line Adventure</ModalHeader>
      <ModalContent>
        Embark on an epic Grand Line Adventure, where thrilling quests, mysterious treasures, and unforgettable
        encounters await your journey ahead!
      </ModalContent>
      <Button onClick={startGameHandler} textContent='Start Adventure' />
    </Modal>
  );
};

export default GameStartModal;
