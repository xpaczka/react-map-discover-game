import styled from 'styled-components';
import { PlayerPosition } from '../../types';
import { MAP_ASPECT_RATIO, PLAYER_SIZE } from '../../constants';

export const PlayerElement = styled.div<PlayerPosition>`
  position: absolute;
  z-index: 100;
  transition: all 0.3s;
  width: ${PLAYER_SIZE * MAP_ASPECT_RATIO}%;
  height: ${PLAYER_SIZE}%;

  img {
    object-fit: contain;
  }
`;
