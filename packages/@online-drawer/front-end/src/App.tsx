import { useEffect, useRef, useState } from "react";
import DrawBoard from "./components/DrawBoard";
import Header from "./components/Header";
import { StyledApp } from "./StyledApp";
import { fabric } from "fabric";
import { HEADER_HEIGHT } from "./constants";
import WebSocketProvider from "./websocket";
import { getWebsocketServerUrl } from "./config";

function App() {
  const canvasRef = useRef(null);
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);
  const [size, setSize] = useState<[number, number]>([0, 0]);
  WebSocketProvider.connect(getWebsocketServerUrl());

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      selection: true,
    });
    setFabricCanvas(canvas);
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight - HEADER_HEIGHT]);
      canvas?.setDimensions({
        width: window.innerWidth,
        height: window.innerHeight - HEADER_HEIGHT,
      });
    }
    canvas.setDimensions({
      width: window.innerWidth,
      height: window.innerHeight - HEADER_HEIGHT,
    });

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => {
      window.removeEventListener("resize", updateSize);
      canvas?.dispose();
    };
  }, [canvasRef.current]);

  return (
    <StyledApp>
      <Header canvas={fabricCanvas} />
      <DrawBoard ref={canvasRef} canvas={fabricCanvas} size={size} />
    </StyledApp>
  );
}

export default App;
