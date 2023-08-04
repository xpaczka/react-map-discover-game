import worldMap from './assets/world-map.jpeg';
import Player from './components/Player';

const App = () => {
  return (
    <div style={{ position: 'relative' }}>
      <Player />
      <img src={worldMap} alt='World Map' width={4096} height={2800} style={{ maxWidth: 'unset' }} />
    </div>
  );
};

export default App;
