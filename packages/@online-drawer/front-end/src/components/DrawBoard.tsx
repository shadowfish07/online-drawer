import { useRef, useEffect, useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { fabric } from "fabric";
import { HEADER_HEIGHT } from "../constants";
import { useAppSelector, useAppDispatch } from "../hooks";
import {
  selectIsCreatingRectMode,
  selectIsDrawingMode,
} from "../slices/ToolBoxSlice";
import { setSelectedItems } from "../slices/DrawBoardSlice";
import React from "react";

type Props = {
  canvas: fabric.Canvas | null;
  size: [number, number];
};

const DrawBoard = React.forwardRef<HTMLCanvasElement, Props>(
  ({ canvas, size }, ref) => {
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
      if (!canvas) return;

      canvas.on("mouse:down", function (options) {
        if (isCreatingRectMode.current) {
          setIsCreatingRect(true);
          creatingRect.current = new fabric.Rect({
            left: options.e.offsetX,
            top: options.e.offsetY,
            fill: "green",
            selectable: true,
          });
          canvas?.add(creatingRect.current);
          creatingRectStartPosition.current = {
            x: options.e.offsetX,
            y: options.e.offsetY,
          };
        }
      });
      canvas.on("mouse:up", function (options) {
        if (isCreatingRectMode.current) {
          setIsCreatingRect(false);
          creatingRect.current = null;
          creatingRectStartPosition.current = null;
        }
      });
      canvas.on("mouse:move", function (options) {
        if (isCreatingRectMode.current) {
          if (!creatingRect.current || !creatingRectStartPosition.current)
            return;

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

          canvas?.renderAll();
        }
      });

      canvas.on("selection:created", function (options) {
        console.log(options);
        selectedItems.current = options.selected ?? [];
        // dispatch(setSelectedItems(options.selected));
      });

      updateCanvasContext(canvas);

      return () => {
        updateCanvasContext(null);
      };
    }, [canvas]);

    useEffect(() => {
      if (canvas) {
        canvas.isDrawingMode = isDrawingMode.current;
      }
    }, [isDrawingMode.current]);

    useEffect(() => {
      if (canvas) {
        canvas.selection = !isCreatingRectMode.current;
      }
    }, [isCreatingRectMode.current]);

    const updateCanvasContext = (canvas: fabric.Canvas | null) => {
      if (!canvas) return;
    };
    return (
      <div>
        <StyledDrawBoard
          id="draw-board"
          width={size[0]}
          height={size[1]}
          ref={ref}
        ></StyledDrawBoard>
      </div>
    );
  }
);

const StyledDrawBoard = styled.canvas`
  .canvas-container {
    top: ${HEADER_HEIGHT};
  }
`;

export default DrawBoard;
