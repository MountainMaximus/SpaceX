import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IFlight, Status } from "../../types";
import fetchFlight from "./asyncAction";

interface flightSlice {
  flight: {
    items: IFlight[];
    status: Status;
  };
}

const initialState: flightSlice = {
  flight: {
    items: [],
    status: Status.LOADING, // loading | success | error
  },
};

const flightSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFlight.pending, (state) => {
      state.flight.status = Status.LOADING;
    });

    builder.addCase(fetchFlight.fulfilled, (state, action) => {
      state.flight.items = action.payload;

      state.flight.status = Status.SUCCESS;

      state.flight.status = Status.SUCCESS;
    });
    builder.addCase(fetchFlight.rejected, (state) => {
      state.flight.status = Status.ERROR;
    });
  },
});

export default flightSlice.reducer;
