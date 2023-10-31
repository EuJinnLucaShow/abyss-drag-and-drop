import { CSSProperties, FC } from 'react';
import { IconButton } from '@material-tailwind/react';
import { IPosition } from '../../context/OverlayContext';

const styleTop: CSSProperties = {
  position: 'fixed',
  zIndex: 100,
  top: 68,
  left: '50%',
  transform: 'translateX(-50%)',
};
const styleRight: CSSProperties = {
  position: 'fixed',
  zIndex: 100,
  top: '50%',
  right: 0,
  transform: 'translateY(-50%)',
};

const styleBottom: CSSProperties = {
  position: 'fixed',
  zIndex: 100,
  bottom: 0,
  left: '50%',
  transform: 'translateX(-50%)',
};
const styleLeft: CSSProperties = {
  position: 'fixed',
  zIndex: 100,
  top: '50%',
  left: 0,
  transform: 'translateY(-50%)',
};

interface OveredButtonProps {
  onArrowClick: (coordinate: keyof IPosition, value: number) => void;
}

const OverlayNavigation: FC<OveredButtonProps> = ({ onArrowClick }) => {
  return (
    <>
      <div style={styleTop}>
        <IconButton
          onClick={() => onArrowClick('y', -30)}
          size={'sm'}
          id={'top'}
          color={'gray'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        </IconButton>
      </div>
      <div style={styleRight}>
        <IconButton
          onClick={() => onArrowClick('x', 30)}
          size={'sm'}
          id={'right'}
          color={'gray'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </IconButton>
      </div>
      <div style={styleBottom}>
        <IconButton
          onClick={() => onArrowClick('y', 30)}
          size={'sm'}
          id={'bottom'}
          color={'gray'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </IconButton>
      </div>
      <div style={styleLeft}>
        <IconButton
          onClick={() => onArrowClick('x', -30)}
          id={'left'}
          size={'sm'}
          color={'gray'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </IconButton>
      </div>
    </>
  );
};

export default OverlayNavigation;
