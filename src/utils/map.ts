import { ReactZoomPanPinchRef } from 'react-zoom-pan-pinch';

interface MapConfig {
  initialScale: number;
  minScale: number;
  maxScale: number;
}

export const MAP_CONFIG: MapConfig = {
  initialScale: 5,
  minScale: 1,
  maxScale: 6,
};

type GetMapBoundaries = (scale: number) => { height: number; width: number };

export const getMapBoundaries: GetMapBoundaries = scale => {
  const mapElement = document.getElementById('map')!;
  const { width, height } = mapElement.getBoundingClientRect();

  return { width: width / scale, height: height / scale };
};

export const zoomToCurrentPosition = (transformComponentRef: ReactZoomPanPinchRef | null) => {
  if (!transformComponentRef) return;

  const { zoomToElement } = transformComponentRef;
  const { scale } = transformComponentRef.instance.transformState;

  zoomToElement('player', scale, 300);
};
