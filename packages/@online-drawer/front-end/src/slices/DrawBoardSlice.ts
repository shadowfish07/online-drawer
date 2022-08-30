import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DrawBoardState {
  selectedItems: fabric.Object[];
  canvas: fabric.Canvas | null;
}

const initialState: DrawBoardState = {
  selectedItems: [],
  canvas: null,
};

const DrawBoardSlice = createSlice({
  name: "drawBoard",
  initialState,
  reducers: {
    setSelectedItems(
      state,
      action: PayloadAction<fabric.Object[] | undefined>
    ) {
      //@ts-ignore
      state.selectedItems = action.payload ?? [];
    },
    setCanvas(state, action: PayloadAction<fabric.Canvas | null>) {
      //@ts-ignore
      state.canvas = action.payload;
    },
  },
});

export const { setSelectedItems, setCanvas } = DrawBoardSlice.actions;

export default DrawBoardSlice.reducer;
