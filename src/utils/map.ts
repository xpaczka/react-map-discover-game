export const MAP_CONFIG = {
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
