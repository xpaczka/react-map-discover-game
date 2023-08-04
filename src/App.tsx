import Map from './components/Map';
import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';
import { MAP_CONFIG } from './utils/map';
import { useRef, useState } from 'react';

// TODO: create a global context for application
// TODO: zoom to current player position on init

const App = () => {
  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null);
  const [currentScale, setCurrentScale] = useState<number>(MAP_CONFIG.initialScale);

  const zoomToCurrentPosition = (): void => {
    if (!transformComponentRef.current) return;

    const { zoomToElement } = transformComponentRef.current;
    const { scale } = transformComponentRef.current.instance.transformState;

    zoomToElement('player', scale, 300);
    setCurrentScale(scale);
  };

  return (
    <TransformWrapper {...MAP_CONFIG} ref={transformComponentRef}>
      <TransformComponent>
        <Map onPlayerMove={zoomToCurrentPosition} scale={currentScale} />
      </TransformComponent>
    </TransformWrapper>
  );
};

export default App;
