import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { ProgressBarElement, Progress } from './styled-components/ProgressBar';

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
