import worldMap from '../assets/world-map.jpeg';
import Player from './Player';
import styled from 'styled-components';

const MapElement = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const MapImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const Map = ({ onPlayerMove, scale }: { onPlayerMove: () => void; scale: number }) => {
  return (
    <MapElement id='map'>
      <Player onPlayerMove={onPlayerMove} scale={scale} />
      <MapImage src={worldMap} alt='World Map' width='100%' height='100%' />
    </MapElement>
  );
};

export default Map;
