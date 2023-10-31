import { createContext, Dispatch, SetStateAction } from "react";

export interface IChildTree {
  [key: string]: {
    text: string;
    isDefaultChild?: boolean;
    children: IChildTree;
  };
}

interface IChildTreeContextProps {
  tree: IChildTree;
  setTree?: Dispatch<SetStateAction<IChildTree>>;
}

export const ChildTreeContext = createContext<IChildTreeContextProps>({
  tree: {},
});
