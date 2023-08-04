import styled from 'styled-components';
import ship from '../assets/ship.png';
import { useCallback, useEffect, useState } from 'react';
import { changePlayerPosition, PLAYER_SIZE } from '../utils/player';
import { PlayerPosition } from '../types';
import { getMapBoundaries } from '../utils/map';

const PlayerElement = styled.div<PlayerPosition>`
  position: absolute;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  z-index: 100;
  transition: all 0.3s;

  img {
    width: ${PLAYER_SIZE}px;
    height: ${PLAYER_SIZE}px;
  }
`;

// TODO: set random starting position on init

const Player = ({ onPlayerMove, scale }: { onPlayerMove: () => void; scale: number }) => {
  const [playerPosition, setPlayerPosition] = useState<PlayerPosition>({ x: 100, y: 100 });

  const movePlayerHandler = useCallback(
    (e: KeyboardEvent): void => {
      const mapBoundaries = getMapBoundaries(scale);
      const newPosition = changePlayerPosition(e, playerPosition, mapBoundaries);

      setPlayerPosition(newPosition);
      onPlayerMove();
    },
    [playerPosition, onPlayerMove, scale]
  );

  useEffect(() => {
    document.addEventListener('keydown', movePlayerHandler);

    return () => {
      document.removeEventListener('keydown', movePlayerHandler);
    };
  }, [movePlayerHandler]);

  return (
    <PlayerElement id='player' x={playerPosition.x} y={playerPosition.y}>
      <img src={ship} alt='Ship' width={48} height={48} />
    </PlayerElement>
  );
};

export default Player;
