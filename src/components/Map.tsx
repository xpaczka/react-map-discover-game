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

const Map = ({ onPlayerMove }: { onPlayerMove: () => void }) => {
  return (
    <MapElement>
      <Player onPlayerMove={onPlayerMove} />
      <MapImage src={worldMap} alt='World Map' width='100%' height='100%' />
    </MapElement>
  );
};

export default Map;
