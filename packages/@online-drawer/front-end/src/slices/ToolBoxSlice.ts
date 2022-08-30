import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ToolBoxState {
  isDrawingMode: boolean;
  isCreatingRectMode: boolean;
}

const initialState: ToolBoxState = {
  isDrawingMode: false,
  isCreatingRectMode: false,
};

export const toolBoxSlice = createSlice({
  name: "toolBox",
  initialState,
  reducers: {
    reverseDrawingMode: (state) => {
      state.isDrawingMode = !state.isDrawingMode;
      if (state.isDrawingMode) {
        state.isCreatingRectMode = false;
      }
    },
    reverseIsCreatingRectMode: (state) => {
      state.isCreatingRectMode = !state.isCreatingRectMode;
      if (state.isCreatingRectMode) {
        state.isDrawingMode = false;
      }
    },
  },
});

export const { reverseDrawingMode, reverseIsCreatingRectMode } =
  toolBoxSlice.actions;

export const selectIsDrawingMode = (state: RootState) =>
  state.toolBox.isDrawingMode;

export const selectIsCreatingRectMode = (state: RootState) =>
  state.toolBox.isCreatingRectMode;

export default toolBoxSlice.reducer;
