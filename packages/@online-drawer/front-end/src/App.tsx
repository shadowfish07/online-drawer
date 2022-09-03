import { ReactElement, useEffect, useRef, useState } from "react";
import DrawBoard from "./components/DrawBoard";
import Header from "./components/Header";
import { StyledApp } from "./StyledApp";
import { fabric } from "fabric";
import { HEADER_HEIGHT } from "./constants";
import WebSocketProvider from "./websocket";
import { getWebsocketServerUrl } from "./config";
import MouseCursor from "./components/MouseCursor";
import { useAppDispatch, useAppSelector } from "./hooks";
import { setUsername } from "./slices/UserSlice";

type CoworkerMousePosition = {
  [username: string]: [number, number];
};

function App() {
  const canvasRef = useRef(null);
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);
  const [size, setSize] = useState<[number, number]>([0, 0]);
  const [mousePosition, setMousePosition] = useState<[number, number]>([0, 0]);
  const usernameSelector = useAppSelector((state) => state.user.username);
  const usernameRef = useRef(usernameSelector);
  const [coworkerMousePositionMap, setCoworkerMousePositionMap] =
    useState<CoworkerMousePosition>({});
  const dispatch = useAppDispatch();
  WebSocketProvider.connect(getWebsocketServerUrl());

  useEffect(() => {
    usernameRef.current = usernameSelector;
  }, [usernameSelector]);

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

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      setMousePosition([e.clientX, e.clientY]);
      WebSocketProvider.sendMousePosition(
        [e.clientX, e.clientY],
        usernameRef.current
      );
    }
    window.addEventListener("mousemove", handleMouseMove);

    if (usernameRef.current === "") {
      const defaultUsername = "大帅逼";
      dispatch(setUsername(defaultUsername));
    }

    WebSocketProvider.addOnMessageCallback((data) => {
      const parsedData = JSON.parse(data);
      if (parsedData.type !== "mousePosition") return;
      if (parsedData.data.username !== usernameRef) {
        setCoworkerMousePositionMap({
          ...coworkerMousePositionMap,
          [parsedData.data.username]: parsedData.data.mousePosition,
        });
      }
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      WebSocketProvider.clearOnMessageCallBack();
    };
  }, []);

  let MouseCursors: ReactElement[] = [];

  Object.entries(coworkerMousePositionMap).forEach(([key, value]) =>
    MouseCursors.push(
      <MouseCursor username={key} key={key} mousePosition={value} />
    )
  );

  return (
    <StyledApp>
      <Header canvas={fabricCanvas} />
      <DrawBoard ref={canvasRef} canvas={fabricCanvas} size={size} />
      {MouseCursors}
    </StyledApp>
  );
}

export default App;
