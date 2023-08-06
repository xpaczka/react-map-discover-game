import worldMap from '../assets/world-map.jpeg';
import Player from './Player';
import { MapElement, MapImage } from './styled-components/Map';
import MapCover from './MapCover';

const Map = () => {
  return (
    <MapElement id='map'>
      <Player />
      <MapImage src={worldMap} alt='World Map' width='100%' height='100%' />
      <MapCover />
    </MapElement>
  );
};

export default Map;
