import { MAP_ASPECT_RATIO, PLAYER_SIZE, PLAYER_VISIBILITY_RADIUS } from '../constants';

interface TilePoints {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

type GenerateTilePoints = (x: number, y: number, width: number, height: number) => TilePoints;

export const generateTilePoints: GenerateTilePoints = (x, y, width, height) => {
  const top = ((y - PLAYER_VISIBILITY_RADIUS) * height) / 100;
  const right = ((x + PLAYER_VISIBILITY_RADIUS + PLAYER_SIZE * MAP_ASPECT_RATIO) * width) / 100;
  const bottom = ((y + PLAYER_VISIBILITY_RADIUS + PLAYER_SIZE) * height) / 100;
  const left = ((x - PLAYER_VISIBILITY_RADIUS) * width) / 100;

  return { top, right, bottom, left };
};
