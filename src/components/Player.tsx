import styled from 'styled-components';
import ship from '../assets/ship.png';
import { useCallback, useEffect, useState } from 'react';
import { changePlayerPosition } from '../utils/player';
import { PlayerPosition } from '../types';

const PlayerElement = styled.div<PlayerPosition>`
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
`;

const PlayerImage = styled.img`
  width: 128px;
  height: 128px;
`;

const Player = () => {
  const [playerPosition, setPlayerPosition] = useState<PlayerPosition>({ x: 100, y: 100 });

  const movePlayerHandler = useCallback(
    (e: KeyboardEvent): void => {
      const newPosition = changePlayerPosition(e, playerPosition);
      setPlayerPosition(newPosition);
    },
    [playerPosition]
  );

  useEffect(() => {
    document.addEventListener('keydown', movePlayerHandler);

    return () => {
      document.removeEventListener('keydown', movePlayerHandler);
    };
  }, [movePlayerHandler]);

  return (
    <PlayerElement x={playerPosition.x} y={playerPosition.y}>
      <PlayerImage src={ship} alt='Ship' />
    </PlayerElement>
  );
};

export default Player;
