import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DIRECTION } from "../../types";

interface IFilterSlice {
  direction: DIRECTION;
}

const initialState: IFilterSlice = {
  direction: DIRECTION.ASC,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setColumn(state) {
      state.direction === DIRECTION.ASC
        ? (state.direction = DIRECTION.DESC)
        : (state.direction = DIRECTION.ASC);
    },
  },
});

export const { setColumn } = filterSlice.actions;

export default filterSlice.reducer;
