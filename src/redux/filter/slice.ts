import { createSlice } from "@reduxjs/toolkit";

interface IFilterSlice {}

const initialState: IFilterSlice = {};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {},
});

export const {} = filterSlice.actions;

export default filterSlice.reducer;
