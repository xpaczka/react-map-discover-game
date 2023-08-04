import { PlayerPosition } from '../types';
import { MAP_ASPECT_RATIO, PLAYER_SIZE, PLAYER_POSITION_CHANGE_VALUE } from '../constants';

type ChangePlayerPosition = (e: KeyboardEvent, initialPosition: PlayerPosition) => PlayerPosition;

type RandomizePlayerStartingPosition = () => { x: number; y: number };

export const randomizePlayerStartingPosition: RandomizePlayerStartingPosition = () => {
  const x = Math.floor(Math.random() * (100 - PLAYER_SIZE + 1) + PLAYER_SIZE);
  const y = Math.floor(Math.random() * (100 - PLAYER_SIZE + 1) + PLAYER_SIZE);

  return { x, y };
};

export const changePlayerPosition: ChangePlayerPosition = (e, initialPosition) => {
  switch (e.key) {
    case 'ArrowUp':
      return {
        ...initialPosition,
        y:
          initialPosition.y >= PLAYER_POSITION_CHANGE_VALUE
            ? initialPosition.y - PLAYER_POSITION_CHANGE_VALUE * MAP_ASPECT_RATIO
            : 0,
      };

    case 'ArrowDown':
      return {
        ...initialPosition,
        y:
          initialPosition.y + PLAYER_SIZE / 100 + PLAYER_POSITION_CHANGE_VALUE <= 100 - PLAYER_SIZE
            ? initialPosition.y + PLAYER_POSITION_CHANGE_VALUE
            : 100 - PLAYER_SIZE,
      };

    case 'ArrowLeft':
      return {
        ...initialPosition,
        x: initialPosition.x >= PLAYER_POSITION_CHANGE_VALUE ? initialPosition.x - PLAYER_POSITION_CHANGE_VALUE : 0,
      };

    case 'ArrowRight':
      return {
        ...initialPosition,
        x:
          initialPosition.x + PLAYER_SIZE / 100 + PLAYER_POSITION_CHANGE_VALUE <= 100 - PLAYER_SIZE * MAP_ASPECT_RATIO
            ? initialPosition.x + PLAYER_POSITION_CHANGE_VALUE
            : 100 - PLAYER_SIZE * MAP_ASPECT_RATIO,
      };

    default:
      return initialPosition;
  }
};
