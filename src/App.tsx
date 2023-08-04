import Map from './components/Map';
import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';
import { MAP_CONFIG } from './utils/map';
import { useRef } from 'react';

const App = () => {
  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null);

  const zoomToCurrentPosition = () => {
    if (!transformComponentRef.current) return;

    const { zoomToElement } = transformComponentRef.current;
    const { scale } = transformComponentRef.current.instance.transformState;

    zoomToElement('player', scale, 300);
  };

  return (
    <TransformWrapper {...MAP_CONFIG} ref={transformComponentRef}>
      <TransformComponent>
        <Map onPlayerMove={zoomToCurrentPosition} />
      </TransformComponent>
    </TransformWrapper>
  );
};

export default App;
