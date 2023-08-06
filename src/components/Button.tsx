import { FC } from 'react';
import { Button as ButtonElement } from './styled-components/Button';

interface ButtonProps {
  onClick: () => void;
  textContent: string;
}

const Button: FC<ButtonProps> = ({ onClick, textContent }) => {
  return <ButtonElement onClick={onClick}>{textContent}</ButtonElement>;
};

export default Button;
