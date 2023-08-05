import worldMap from '../assets/world-map.jpeg';
import Player from './Player';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Tile from './Tile';

const MapElement = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const MapImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  clip-path: url(#map-clip-path);
`;

const MapCover = styled.svg`
  position: absolute;
  inset: 0;
`;

const Map = () => {
  const visitedPoints = useSelector((state: RootState) => state.game.visitedPoints);

  return (
    <MapElement id='map'>
      <Player />
      <MapImage src={worldMap} alt='World Map' width='100%' height='100%' />
      <MapCover height={0} width={0}>
        <clipPath id='map-clip-path'>
          {visitedPoints.map((point, index) => (
            <Tile key={index} coords={point} />
          ))}
        </clipPath>
      </MapCover>
    </MapElement>
  );
};

export default Map;
