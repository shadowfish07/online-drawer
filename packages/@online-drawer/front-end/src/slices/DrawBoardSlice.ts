import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DrawBoardState {}

const initialState: DrawBoardState = {};

const DrawBoardSlice = createSlice({
  name: "drawBoard",
  initialState,
  reducers: {},
});

export const {} = DrawBoardSlice.actions;

export default DrawBoardSlice.reducer;
