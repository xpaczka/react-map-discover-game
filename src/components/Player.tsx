import styled from 'styled-components';
import ship from '../assets/ship.png';
import { useCallback, useEffect } from 'react';
import { PlayerPosition } from '../types';
import { MAP_ASPECT_RATIO, PLAYER_SIZE } from '../constants';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { movePlayer } from '../store/gameSlice';

const PlayerElement = styled.div<PlayerPosition>`
  position: absolute;
  left: ${props => props.x}%;
  top: ${props => props.y}%;
  z-index: 100;
  transition: all 0.3s;
  width: ${PLAYER_SIZE * MAP_ASPECT_RATIO}%;
  height: ${PLAYER_SIZE}%;

  img {
    object-fit: contain;
  }
`;

const Player = () => {
  const playerPosition = useSelector((state: RootState) => state.game.playerPosition);
  const dispatch = useDispatch();

  const movePlayerHandler = useCallback((e: KeyboardEvent) => dispatch(movePlayer({ key: e.key })), [dispatch]);

  useEffect(() => {
    document.addEventListener('keydown', movePlayerHandler);

    return () => {
      document.removeEventListener('keydown', movePlayerHandler);
    };
  }, [movePlayerHandler]);

  return (
    <PlayerElement id='player' x={playerPosition.x} y={playerPosition.y}>
      <img src={ship} alt='Ship' width='100%' height='100%' />
    </PlayerElement>
  );
};

export default Player;
