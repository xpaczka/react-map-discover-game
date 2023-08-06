import { MAP_ASPECT_RATIO, PLAYER_SIZE, PLAYER_VISIBILITY_RADIUS } from '../constants';
import { PlayerPosition } from '../types';

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

type UpdateVisitedPoints = (visitedPoints: PlayerPosition[], newPosition: PlayerPosition) => PlayerPosition[];

export const updateVisitedPoints: UpdateVisitedPoints = (visitedPoints, newPosition) => {
  let updatedVisitedPoints: PlayerPosition[];

  if (visitedPoints.some(point => point.x === newPosition.x && point.y === newPosition.y)) {
    updatedVisitedPoints = visitedPoints;
  } else {
    updatedVisitedPoints = [...visitedPoints, newPosition];
  }

  return updatedVisitedPoints;
};

// https://leetcode.com/problems/rectangle-area-ii/solutions/3570731/beats-100-using-line-sweep-algorithm/

type Event = [number, 'open' | 'close', number, number];
type ActiveRectangle = [number, number];
type CalculateTileCoverageArea = () => number;

export const calculateTileCoverageArea: CalculateTileCoverageArea = () => {
  const polygonElements = document.querySelectorAll('#map-clip-path polygon');

  const map = document.getElementById('map')!;
  const { width: mapWidth, height: mapHeight, bottom: mapBottom, right: mapRight } = map.getBoundingClientRect();
  const mapArea = mapWidth * mapHeight;

  const events: Event[] = [];
  const activeRectangles: ActiveRectangle[] = [];
  const mod = BigInt(1000000007);
  let totalArea = 0n;

  for (const element of polygonElements) {
    const { left, right, top, bottom } = element.getBoundingClientRect();

    // Exclude area of polygons outside the map area
    const adjustedTop = top < 0 ? 0 : top;
    const adjustedLeft = left < 0 ? 0 : left;
    const adjustedRight = right > mapRight ? mapRight : right;
    const adjustedBottom = bottom > mapBottom ? mapBottom : bottom;

    events.push([adjustedTop, 'open', adjustedLeft, adjustedRight]);
    events.push([adjustedBottom, 'close', adjustedLeft, adjustedRight]);
  }

  events.sort((a, b) => a[0] - b[0]);

  let previousY = events[0][0];

  for (const event of events) {
    const [currentY, type, x1, x2] = event;
    let maxLength = 0;
    let currentRight = -1;

    for (const rectangle of activeRectangles) {
      currentRight = Math.max(currentRight, rectangle[0]);
      maxLength += Math.max(0, rectangle[1] - currentRight);
      currentRight = Math.max(currentRight, rectangle[1]);
    }

    totalArea += (BigInt(Math.round(maxLength)) * BigInt(Math.round(currentY - previousY))) % mod;
    totalArea %= mod;

    if (type === 'open') {
      activeRectangles.push([x1, x2]);
      activeRectangles.sort((a, b) => a[0] - b[0]);
    } else {
      for (let i = 0; i < activeRectangles.length; i++) {
        const rectangle = activeRectangles[i];

        if (rectangle[0] === x1 && rectangle[1] === x2) {
          activeRectangles.splice(i, 1);
          break;
        }
      }
    }

    previousY = currentY;
  }

  return +Math.round((Number(totalArea) / mapArea) * 100).toFixed(0);
};
