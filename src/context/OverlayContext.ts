export interface IPosition {
  x: number;
  y: number;
}

import { createContext, Dispatch, SetStateAction } from "react";

interface IOverlayContextProps {
  isCentering: boolean;
  setIsCentering?: Dispatch<SetStateAction<boolean>>;
  position: IPosition;
  setPosition?: Dispatch<SetStateAction<IPosition>>;
}

export const OverlayContext = createContext<IOverlayContextProps>({
  isCentering: false,
  position: { x: 0, y: 0 },
});
