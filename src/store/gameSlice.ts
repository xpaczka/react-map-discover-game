import { createSlice } from '@reduxjs/toolkit';
import { randomizePlayerStartingPosition, changePlayerPosition } from '../utils/player';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PlayerPosition } from '../types';
import { ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';
import { zoomToCurrentPosition } from '../utils/map';
import { calculateTileCoverageArea, updateVisitedPoints } from '../utils/tile';

interface GameState {
  playerPosition: PlayerPosition;
  transformComponentRef: ReactZoomPanPinchRef | null;
  visitedPoints: PlayerPosition[];
  progress: number;
}

const initialPlayerPosition = randomizePlayerStartingPosition();

const initialState: GameState = {
  playerPosition: initialPlayerPosition,
  transformComponentRef: null,
  visitedPoints: [initialPlayerPosition],
  progress: 0,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    movePlayer: (state, action: PayloadAction<{ key: string }>) => {
      const newPosition = changePlayerPosition(action.payload.key, state.playerPosition);
      const visitedPoints = updateVisitedPoints(state.visitedPoints, newPosition);
      const progress = calculateTileCoverageArea();

      if (state.transformComponentRef) {
        zoomToCurrentPosition(state.transformComponentRef as ReactZoomPanPinchRef);
      }

      return { ...state, playerPosition: newPosition, visitedPoints, progress };
    },

    setTransformComponentRef: (state, action: PayloadAction<{ ref: ReactZoomPanPinchRef | null }>) => {
      return { ...state, transformComponentRef: action.payload.ref };
    },
  },
});

export const { movePlayer, setTransformComponentRef } = gameSlice.actions;

export default gameSlice.reducer;
