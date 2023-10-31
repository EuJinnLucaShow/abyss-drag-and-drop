import React, { useCallback, useContext, useMemo, useState } from "react";
import { IPosition, OverlayContext } from "../context/OverlayContext";

export const useDragging = () => {
  const [dragging, setDragging] = useState<boolean>(false);
  const [clickPosition, setClickPosition] = useState<IPosition>({
    x: 0,
    y: 0,
  });
  const { position, setPosition } = useContext(OverlayContext);

  const handleMouseUp = useCallback(() => {
    setDragging(false);
  }, []);

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      setClickPosition({
        x: event.clientX,
        y: event.clientY,
      });
      setDragging(true);
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const x = e.clientX - clickPosition.x + position.x;
      const y = e.clientY - clickPosition.y + position.y;

      setPosition?.({ x, y });
    },
    [clickPosition]
  );

  return useMemo(
    () => ({
      dragging,
      handleMouseUp,
      handleMouseDown,
      handleMouseMove,
    }),
    [dragging, handleMouseUp, handleMouseDown, handleMouseMove]
  );
};
