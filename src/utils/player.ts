import { PlayerPosition } from '../types';

const POSITION_CHANGE_VALUE = 8;
export const PLAYER_SIZE = 48;

type ChangePlayerPosition = (
  e: KeyboardEvent,
  initialPosition: PlayerPosition,
  mapBoundaries: { width: number; height: number }
) => PlayerPosition;

export const changePlayerPosition: ChangePlayerPosition = (e, initialPosition, mapBoundaries) => {
  const { width, height } = mapBoundaries;

  switch (e.key) {
    case 'ArrowUp':
      return {
        ...initialPosition,
        y: initialPosition.y >= POSITION_CHANGE_VALUE ? initialPosition.y - POSITION_CHANGE_VALUE : 0,
      };

    case 'ArrowDown':
      return {
        ...initialPosition,
        y:
          initialPosition.y + PLAYER_SIZE + POSITION_CHANGE_VALUE < height
            ? initialPosition.y + POSITION_CHANGE_VALUE
            : height - PLAYER_SIZE,
      };

    case 'ArrowLeft':
      return {
        ...initialPosition,
        x: initialPosition.x >= POSITION_CHANGE_VALUE ? initialPosition.x - POSITION_CHANGE_VALUE : 0,
      };

    case 'ArrowRight':
      return {
        ...initialPosition,
        x:
          initialPosition.x + PLAYER_SIZE + POSITION_CHANGE_VALUE < width
            ? initialPosition.x + POSITION_CHANGE_VALUE
            : width - PLAYER_SIZE,
      };

    default:
      return initialPosition;
  }
};
