import styled from 'styled-components';
import ship from '../assets/ship.png';
import { useCallback, useEffect, useState } from 'react';
import { changePlayerPosition } from '../utils/player';
import { PlayerPosition } from '../types';
import { MAP_ASPECT_RATIO, PLAYER_SIZE } from '../constants';

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

const Player = ({
  onPlayerMove,
  startingPosition,
}: {
  onPlayerMove: () => void;
  startingPosition: { x: number; y: number };
}) => {
  const [playerPosition, setPlayerPosition] = useState<PlayerPosition>(startingPosition);

  const movePlayerHandler = useCallback(
    (e: KeyboardEvent): void => {
      const newPosition = changePlayerPosition(e, playerPosition);

      setPlayerPosition(newPosition);
      onPlayerMove();
    },
    [playerPosition, onPlayerMove]
  );

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
