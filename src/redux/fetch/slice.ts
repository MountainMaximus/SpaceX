import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IMissions, Status } from "../../types";
import fetchFlight from "./asyncAction";

interface flightSlice {
  flight: {
    items: IMissions[];
    status: Status;
  };
}

const initialState: flightSlice = {
  flight: {
    items: [
      {
        id: 1,
        name: "string",
        date: "string",
        description: "string",
        img: "string",
      },
    ],
    status: Status.SUCCESS, // loading | success | error
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
      action.payload.update
        ? (state.flight.items = action.payload.data)
        : (state.flight.items = [
            ...state.flight.items,
            ...action.payload.data,
          ]);

      state.flight.status = Status.SUCCESS;

      state.flight.status = Status.SUCCESS;
    });
    builder.addCase(fetchFlight.rejected, (state) => {
      state.flight.status = Status.ERROR;
    });
  },
});

export default flightSlice.reducer;
