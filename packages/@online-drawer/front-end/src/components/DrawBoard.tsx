import { useRef, useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { fabric } from "fabric";
import { HEADER_HEIGHT } from "../constants";
import { useAppSelector, useAppDispatch } from "../hooks";
import {
  selectIsCreatingRectMode,
  selectIsDrawingMode,
} from "../slices/ToolBoxSlice";
import { setCanvas, setSelectedItems } from "../slices/DrawBoardSlice";
function DrawBoard() {
  const canvasEl = useRef(null);
  const canvas = useRef<fabric.Canvas | null>(null);
  const [size, setSize] = useState([0, 0]);
  const [isCreatingRect, setIsCreatingRect] = useState(false);
  const creatingRect = useRef<fabric.Object | null>(null);
  const creatingRectStartPosition = useRef<{ x: number; y: number } | null>(
    null
  );
  const isDrawingMode = useRef<boolean>(false);
  const isCreatingRectMode = useRef<boolean>(false);
  const selectedItems = useRef<fabric.Object[]>([]);

  isDrawingMode.current = useAppSelector(selectIsDrawingMode);
  isCreatingRectMode.current = useAppSelector(selectIsCreatingRectMode);

  const dispatch = useAppDispatch();

  useEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight - HEADER_HEIGHT]);
      canvas.current?.setDimensions({
        width: window.innerWidth,
        height: window.innerHeight - HEADER_HEIGHT,
      });
    }
    canvas.current = new fabric.Canvas(canvasEl.current, {
      isDrawingMode: isDrawingMode.current,
      selection: !isCreatingRectMode.current,
    });
    canvas.current.setDimensions({
      width: window.innerWidth,
      height: window.innerHeight - HEADER_HEIGHT,
    });

    canvas.current.on("mouse:down", function (options) {
      if (isCreatingRectMode.current) {
        setIsCreatingRect(true);
        creatingRect.current = new fabric.Rect({
          left: options.e.offsetX,
          top: options.e.offsetY,
          fill: "green",
          selectable: true,
        });
        canvas.current?.add(creatingRect.current);
        creatingRectStartPosition.current = {
          x: options.e.offsetX,
          y: options.e.offsetY,
        };
      }
    });
    canvas.current.on("mouse:up", function (options) {
      if (isCreatingRectMode.current) {
        setIsCreatingRect(false);
        creatingRect.current = null;
        creatingRectStartPosition.current = null;
      }
    });
    canvas.current.on("mouse:move", function (options) {
      if (isCreatingRectMode.current) {
        if (!creatingRect.current || !creatingRectStartPosition.current) return;

        let rectLeft = creatingRectStartPosition.current?.x ?? 0;
        let rectTop = creatingRectStartPosition.current?.y ?? 0;
        const rectWidth = options.e.offsetX - rectLeft;
        const rectHeight = options.e.offsetY - rectTop;
        if (options.e.offsetX < rectLeft) {
          creatingRect.current.set("left", options.e.offsetX);
          creatingRect.current.set(
            "width",
            creatingRectStartPosition.current?.x - options.e.offsetX
          );
        } else {
          creatingRect.current.set("width", rectWidth);
        }
        if (options.e.offsetY < rectTop) {
          creatingRect.current.set("top", options.e.offsetY);
          creatingRect.current.set(
            "height",
            creatingRectStartPosition.current?.y - options.e.offsetY
          );
        } else {
          creatingRect.current.set("height", rectHeight);
        }

        canvas.current?.renderAll();
      }
    });

    canvas.current.on("selection:created", function (options) {
      console.log(options);
      selectedItems.current = options.selected ?? [];
      dispatch(setSelectedItems(options.selected));
    });

    updateCanvasContext(canvas.current);

    window.addEventListener("resize", updateSize);
    updateSize();

    dispatch(setCanvas(canvas.current));

    return () => {
      updateCanvasContext(null);
      canvas.current?.dispose();
      dispatch(setCanvas(null));
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  useEffect(() => {
    if (canvas.current) {
      canvas.current.isDrawingMode = isDrawingMode.current;
    }
  }, [isDrawingMode.current]);

  const updateCanvasContext = (canvas: fabric.Canvas | null) => {
    if (!canvas) return;
    // var rect = new fabric.Rect({
    //   left: 548,
    //   top: 556,
    //   fill: "red",
    //   width: -582,
    //   height: -641,
    // });

    // canvas.add(rect);
  };
  return (
    <StyledDrawBoard
      id="draw-board"
      width={size[0]}
      height={size[1]}
      ref={canvasEl}
    ></StyledDrawBoard>
  );
}

const StyledDrawBoard = styled.canvas`
  .canvas-container {
    top: ${HEADER_HEIGHT};
  }
`;

export default DrawBoard;
