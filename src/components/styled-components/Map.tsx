import styled from 'styled-components';

export const MapElement = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const MapImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  clip-path: url(#map-clip-path);
`;

export const MapCover = styled.svg`
  position: absolute;
  inset: 0;
`;
