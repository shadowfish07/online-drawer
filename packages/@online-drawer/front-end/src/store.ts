import { configureStore } from "@reduxjs/toolkit";
import toolBoxReducer from "./slices/ToolBoxSlice";
import drawBoardReducer from "./slices/DrawBoardSlice";
import userReducer from "./slices/UserSlice";

export const store = configureStore({
  reducer: {
    toolBox: toolBoxReducer,
    drawBoard: drawBoardReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
