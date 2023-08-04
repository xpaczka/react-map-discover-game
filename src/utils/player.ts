import { PlayerPosition } from '../types';

const POSITION_CHANGE_VALUE = 8;

// TODO: add boundaries to prevent player from getting of the map
export const changePlayerPosition = (e: KeyboardEvent, initialPosition: PlayerPosition): PlayerPosition => {
  switch (e.key) {
    case 'ArrowUp':
      return { ...initialPosition, y: initialPosition.y - POSITION_CHANGE_VALUE };
    case 'ArrowDown':
      return { ...initialPosition, y: initialPosition.y + POSITION_CHANGE_VALUE };
    case 'ArrowLeft':
      return { ...initialPosition, x: initialPosition.x - POSITION_CHANGE_VALUE };
    case 'ArrowRight':
      return { ...initialPosition, x: initialPosition.x + POSITION_CHANGE_VALUE };
    default:
      return initialPosition;
  }
};
