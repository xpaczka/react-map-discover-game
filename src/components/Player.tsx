import ship from '../assets/ship.png';
import { useCallback, useEffect } from 'react';
import { PlayerElement } from './styled-components/Player';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { movePlayer } from '../store/gameSlice';

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
    <PlayerElement
      id='player'
      x={playerPosition.x}
      y={playerPosition.y}
      style={{ left: `${playerPosition.x}%`, top: `${playerPosition.y}%` }}
    >
      <img src={ship} alt='Ship' width='100%' height='100%' />
    </PlayerElement>
  );
};

export default Player;
