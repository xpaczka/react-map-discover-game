import { useSelector } from 'react-redux';
import Tile from './Tile';
import { RootState } from '../store';
import { MapCoverElement } from './styled-components/MapCover';

const MapCover = () => {
  const visitedPoints = useSelector((state: RootState) => state.game.visitedPoints);

  return (
    <MapCoverElement height={0} width={0}>
      <clipPath id='map-clip-path'>
        {visitedPoints.map((point, index) => (
          <Tile key={index} coords={point} />
        ))}
      </clipPath>
    </MapCoverElement>
  );
};

export default MapCover;
