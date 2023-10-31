import {
  Chip,
  IconButton,
  Typography,
  Navbar,
  Popover,
  PopoverHandler,
  PopoverContent,
  List,
  Tooltip,
} from "@material-tailwind/react";
import React, {
  FC,
  MutableRefObject,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { flushSync } from "react-dom";
import { OverlayContext } from "../../context/OverlayContext";
import { ChildTreeContext, IChildTree } from "../../context/ChildTreeContext";

interface HeaderProps {
  overlayRef: MutableRefObject<HTMLDivElement | null>;
}

const Header: FC<HeaderProps> = ({ overlayRef }) => {
  const scaleValue = 0.1;
  const { tree } = useContext(ChildTreeContext);
  const [selectValue, setSelectValue] = useState(100);
  const { setIsCentering, setPosition } = useContext(OverlayContext);
  const handleCenterLayout = useCallback(() => {
    flushSync(() => {
      setIsCentering?.(true);
    });
    if (overlayRef.current) {
      setPosition?.({
        x: window.innerWidth / 2 - overlayRef.current.clientWidth / 2,
        y: window.innerHeight / 2 - overlayRef.current.clientHeight / 2,
      });
    }
    setTimeout(() => {
      setIsCentering?.(false);
    }, 300);
  }, [setPosition]);

  const handleZoomOut = useCallback(() => {
    if (overlayRef.current) {
      const currentTransform = overlayRef.current.style.transform;
      const scale = +currentTransform.slice(
        currentTransform.indexOf("(") + 1,
        currentTransform.indexOf(")")
      );

      const updatedScale = scale - scaleValue > 0 ? scale - scaleValue : scale;
      setSelectValue(Math.round(updatedScale * 100));
      overlayRef.current.style.transform = `scale(${updatedScale})`;
    }
  }, []);

  const handleZoomIn = useCallback(() => {
    if (overlayRef.current) {
      const currentTransform = overlayRef.current.style.transform;
      const scale = +currentTransform.slice(
        currentTransform.indexOf("(") + 1,
        currentTransform.indexOf(")")
      );

      const updatedScale = scale + scaleValue < 3 ? scale + scaleValue : scale;
      setSelectValue(Math.round(updatedScale * 100));
      overlayRef.current.style.transform = `scale(${updatedScale})`;
    }
  }, []);

  const handleSelectZoom = useCallback((value: number) => {
    if (overlayRef.current) {
      const updatedScale = value / 100;
      overlayRef.current.style.transform = `scale(${updatedScale})`;
      setSelectValue(value);
    }
  }, []);

  const childCount = useMemo(() => {
    let count = 0;
    const recurse = (tree: IChildTree) => {
      Object.keys(tree).forEach((key) => {
        ++count;
        if (Object.keys(tree[key].children).length) {
          recurse(tree[key].children);
        }
      });
    };
    recurse(tree);
    return count;
  }, [tree]);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      const preventDefault = (func: () => void) => {
        e.preventDefault();
        func();
      };

      e.key === "=" && preventDefault(handleZoomIn);
      e.key === "-" && preventDefault(handleZoomOut);
      e.key === "c" && preventDefault(handleCenterLayout);
    });
  }, []);

  return (
    <Navbar
      className={
        "fixed p-3 z-50 mx-auto min-w-full flex justify-between rounded-none bg-white"
      }
    >
      <div className={"flex items-center"}>
        <Typography
          as="li"
          variant="h4"
          color="blue-gray"
          className="p-1 font-bold"
        >
          Services
        </Typography>
        <Chip value={childCount} />
      </div>
      <div className={"flex gap-1"}>
        <Tooltip placement={"bottom"} content="Center: (c)">
          <IconButton onClick={handleCenterLayout}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
          </IconButton>
        </Tooltip>
        <Tooltip placement={"bottom"} content="ZoomOut: (-)">
          <IconButton
            onClick={handleZoomOut}
            variant={"outlined"}
            color={"gray"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </IconButton>
        </Tooltip>

        <Popover>
          <PopoverHandler>
            <div
              className={
                "border cursor-pointer rounded-md border-gray-500 flex items-center text-gray-500 px-4"
              }
            >
              <Typography as={"span"}>{selectValue}%</Typography>
            </div>
          </PopoverHandler>
          <PopoverContent className={"z-50 h-60 w-28 overflow-auto p-0"}>
            <List defaultValue={""}>
              {Array.from({ length: 29 }).map((_, i) => {
                const count = i + 1;
                return (
                  <div
                    key={i}
                    className={`w-24 rounded p-2 cursor-pointer transition hover:bg-opacity-80 ${
                      selectValue === count * 10 ? "bg-blue-gray-50 " : ""
                    }`}
                    onClick={() => handleSelectZoom(count * 10)}
                  >
                    {count * 10}%
                  </div>
                );
              })}
            </List>
          </PopoverContent>
        </Popover>
        <Tooltip placement={"bottom"} content="ZoomIn: (+)">
          <IconButton
            onClick={handleZoomIn}
            variant={"outlined"}
            color={"gray"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </IconButton>
        </Tooltip>
      </div>
    </Navbar>
  );
};

export default Header;
