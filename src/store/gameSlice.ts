import { createSlice } from '@reduxjs/toolkit';
import { randomizePlayerStartingPosition, changePlayerPosition } from '../utils/player';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PlayerPosition } from '../types';
import { ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';
import { zoomToCurrentPosition } from '../utils/map';
import { updateVisitedPoints } from '../utils/tile';

interface GameState {
  playerPosition: PlayerPosition;
  transformComponentRef: ReactZoomPanPinchRef | null;
  visitedPoints: PlayerPosition[];
}

const initialPlayerPosition = randomizePlayerStartingPosition();

const initialState: GameState = {
  playerPosition: initialPlayerPosition,
  transformComponentRef: null,
  visitedPoints: [initialPlayerPosition],
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    movePlayer: (state, action: PayloadAction<{ key: string }>) => {
      const newPosition = changePlayerPosition(action.payload.key, state.playerPosition);
      const visitedPoints = updateVisitedPoints(state.visitedPoints, newPosition);

      if (state.transformComponentRef) {
        zoomToCurrentPosition(state.transformComponentRef as ReactZoomPanPinchRef);
      }

      return { ...state, playerPosition: newPosition, visitedPoints };
    },

    setTransformComponentRef: (state, action: PayloadAction<{ ref: ReactZoomPanPinchRef | null }>) => {
      return { ...state, transformComponentRef: action.payload.ref };
    },
  },
});

export const { movePlayer, setTransformComponentRef } = gameSlice.actions;

export default gameSlice.reducer;
