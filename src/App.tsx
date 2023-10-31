import { Spinner } from "@material-tailwind/react";
import React, { MutableRefObject, Suspense, useRef, useState } from "react";
import Header from "./components/Header/Header";
import Overlay from "./components/Overlay/Overlay";
import { ChildTreeContext, IChildTree } from "./context/ChildTreeContext";
import { IPosition, OverlayContext } from "./context/OverlayContext";

function App() {
  const [tree, setTree] = useState<IChildTree>({
    parent: {
      text: "Categories",
      isDefaultChild: true,
      children: {},
    },
  });
  const [isCentering, setIsCentering] = useState<boolean>(false);
  const [position, setPosition] = useState<IPosition>({ x: 0, y: 0 });
  const overlayRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  return (
    <Suspense
      fallback={
        <>
          <Spinner />
        </>
      }
    >
      <ChildTreeContext.Provider value={{ tree, setTree }}>
        <OverlayContext.Provider
          value={{ position, setPosition, isCentering, setIsCentering }}
        >
          <div style={{ height: "100vh" }} className={"flex flex-col"}>
            <Header overlayRef={overlayRef} />
            <Overlay overlayRef={overlayRef} />
          </div>
        </OverlayContext.Provider>
      </ChildTreeContext.Provider>
    </Suspense>
  );
}

export default App;
