import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store';

const ProgressBarElement = styled.div`
  position: fixed;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  width: 80%;
  max-width: 1400px;
  min-width: 300px;
  height: 30px;
  background: #000;
  text-align: center;
  border-radius: 60px;
  border: 2px solid #fff;
  overflow: hidden;
  z-index: 100;

  span {
    z-index: 1000;
    position: relative;
  }
`;

const Progress = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background: green;
  height: 100%;
  overflow: hidden;
  font-size: 14px;
  display: grid;
  place-items: center;
  line-height: 1;
`;

const ProgressBar = () => {
  const progress = useSelector((state: RootState) => state.game.progress);

  return (
    <ProgressBarElement>
      <Progress style={{ width: `${progress}%` }} />
      <span>{progress}%</span>
    </ProgressBarElement>
  );
};

export default ProgressBar;
