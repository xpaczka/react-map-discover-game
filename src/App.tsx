import Map from './components/Map';
import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';
import { MAP_CONFIG, zoomToCurrentPosition } from './utils/map';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTransformComponentRef } from './store/gameSlice';
import ProgressBar from './components/ProgressBar';
import GameStartModal from './components/GameStartModal';
import { RootState } from './store';

const App = () => {
  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null);

  const gameRunning = useSelector((state: RootState) => state.game.gameRunning);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => zoomToCurrentPosition(transformComponentRef.current), 50);
  }, []);

  useEffect(() => {
    if (transformComponentRef.current) {
      dispatch(setTransformComponentRef({ ref: transformComponentRef.current }));
    }
  }, [dispatch]);

  return (
    <>
      {!gameRunning && <GameStartModal />}
      <ProgressBar />
      <TransformWrapper {...MAP_CONFIG} ref={transformComponentRef}>
        <TransformComponent>
          <Map />
        </TransformComponent>
      </TransformWrapper>
    </>
  );
};

export default App;
