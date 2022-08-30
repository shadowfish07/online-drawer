import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DrawBoardState {
  selectedItems: fabric.Object[];
}

const initialState: DrawBoardState = {
  selectedItems: [],
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
  },
});

export const { setSelectedItems } = DrawBoardSlice.actions;

export default DrawBoardSlice.reducer;
