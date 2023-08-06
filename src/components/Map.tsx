import worldMap from '../assets/world-map.jpeg';
import Player from './Player';
import { MapElement, MapImage, MapCover } from './styled-components/Map';

import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Tile from './Tile';

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
