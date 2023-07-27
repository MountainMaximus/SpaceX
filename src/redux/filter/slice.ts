import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IFilterSlice {
  direction: boolean;
}

const initialState: IFilterSlice = {
  direction: true,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setColumn(state) {
      state.direction = !state.direction;
    },
  },
});

export const { setColumn } = filterSlice.actions;

export default filterSlice.reducer;
