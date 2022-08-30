import { configureStore } from "@reduxjs/toolkit";
import toolBoxReducer from "./slices/ToolBoxSlice";
import drawBoardReducer from "./slices/DrawBoardSlice";

export const store = configureStore({
  reducer: {
    toolBox: toolBoxReducer,
    drawBoard: drawBoardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
