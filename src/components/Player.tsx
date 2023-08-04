import styled from 'styled-components';
import ship from '../assets/ship.png';
import { useCallback, useEffect, useState } from 'react';
import { changePlayerPosition } from '../utils/player';
import { PlayerPosition } from '../types';

const PlayerElement = styled.div<PlayerPosition>`
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  z-index: 100;
  transition: all 0.3s;
`;

const PlayerImage = styled.img`
  width: 48px;
  height: 48px;
`;

const Player = ({ onPlayerMove }: { onPlayerMove: () => void }) => {
  const [playerPosition, setPlayerPosition] = useState<PlayerPosition>({ x: 96, y: 96 });

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
      <PlayerImage src={ship} alt='Ship' width={48} height={48} />
    </PlayerElement>
  );
};

export default Player;
