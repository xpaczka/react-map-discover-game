import { FC, useEffect, useState } from 'react';
import { PlayerPosition } from '../types';
import { MAP_ASPECT_RATIO } from '../constants';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { generateTilePoints } from '../utils/tile';

interface TileProps {
  coords: PlayerPosition;
}

interface Dimensions {
  width: number;
  height: number;
}

const Tile: FC<TileProps> = ({ coords }) => {
  const { x, y } = coords;
  const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 });
  const transformComponentRef = useSelector((state: RootState) => state.game.transformComponentRef);

  useEffect(() => {
    if (!transformComponentRef || !transformComponentRef.instance.wrapperComponent?.getBoundingClientRect()) return;
    const { width } = transformComponentRef.instance.wrapperComponent.getBoundingClientRect();

    setDimensions({ width, height: width * MAP_ASPECT_RATIO });
  }, [transformComponentRef]);

  const { top, right, bottom, left } = generateTilePoints(x, y, dimensions.width, dimensions.height);

  const topLeftPosition = `${left},${top}`;
  const topRightPosition = `${right},${top}`;
  const bottomLeftPosition = `${left},${bottom}`;
  const bottomRightPosition = `${right},${bottom}`;

  const points = `${topLeftPosition} ${topRightPosition} ${bottomRightPosition} ${bottomLeftPosition}`;

  return <polygon points={points} />;
};

export default Tile;
