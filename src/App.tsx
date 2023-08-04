import Map from './components/Map';
import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';
import { MAP_CONFIG } from './utils/map';
import { useEffect, useRef } from 'react';

import { randomizePlayerStartingPosition } from './utils/player';

// TODO: create a global context for application
// TODO: improve zooming for player's initial position

const App = () => {
  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null);

  const startingPosition = randomizePlayerStartingPosition();

  const zoomToCurrentPosition = (): void => {
    if (!transformComponentRef.current) return;

    const { zoomToElement } = transformComponentRef.current;
    const { scale } = transformComponentRef.current.instance.transformState;

    zoomToElement('player', scale, 300);
  };

  useEffect(() => {
    setTimeout(() => zoomToCurrentPosition(), 50);
  }, []);

  return (
    <TransformWrapper {...MAP_CONFIG} ref={transformComponentRef}>
      <TransformComponent>
        <Map onPlayerMove={zoomToCurrentPosition} startingPosition={startingPosition} />
      </TransformComponent>
    </TransformWrapper>
  );
};

export default App;
