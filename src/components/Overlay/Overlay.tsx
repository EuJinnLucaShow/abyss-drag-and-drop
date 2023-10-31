import {
  FC,
  MutableRefObject,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
} from "react";
import OverlayNavigation from "../OverlayNavigation/OverlayNavigation";
import { ChildTreeContext } from "../../context/ChildTreeContext";
import Tree from "../Tree/Tree";
import { useDragging } from "../../hooks/useDragging";
import { flushSync } from "react-dom";
import { IPosition, OverlayContext } from "../../context/OverlayContext";
import { Spinner } from "@material-tailwind/react";

interface OverlayProps {
  overlayRef: MutableRefObject<HTMLDivElement | null>;
}

const Overlay: FC<OverlayProps> = ({ overlayRef }) => {
  const { tree } = useContext(ChildTreeContext);
  const { position, setPosition, setIsCentering } = useContext(OverlayContext);
  const { dragging, handleMouseUp, handleMouseDown, handleMouseMove } =
    useDragging();

  useLayoutEffect(() => {
    if (overlayRef.current) {
      setPosition?.({
        x: window.innerWidth / 2 - overlayRef.current.clientWidth / 2,
        y: 370,
      });
    }
  }, []);

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
  }, [dragging]);

  const handleNavigate = useCallback(
    (coordinate: keyof IPosition, value: number) => {
      flushSync(() => {
        setIsCentering?.(true);
      });

      setPosition?.((prevPosition) => {
        const updatedPosition = { ...prevPosition };
        updatedPosition[coordinate] += value;

        return updatedPosition;
      });

      setTimeout(() => {
        setIsCentering?.(false);
      }, 300);
    },
    []
  );

  return (
    <div className={"relative h-full flex-grow"}>
      <OverlayNavigation onArrowClick={handleNavigate} />
      <Suspense
        fallback={
          <>
            <Spinner />
          </>
        }
      >
        <div
          style={{
            top: position.y,
            left: position.x,
            transform: "scale(1.0)",
          }}
          ref={overlayRef}
          className={`overflow-hidden absolute cursor-move ${
            dragging ? "" : "transition-all"
          } ease-in`}
          onMouseDown={handleMouseDown}
        >
          <Tree tree={tree} />
        </div>
      </Suspense>
    </div>
  );
};

export default Overlay;
