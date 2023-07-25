import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

import { IFlight } from "../../types";

const fetchFlight = createAsyncThunk<
  IFlight[],
  { page?: number; category?: string; tags?: string }
>("SpaceX/fetchFlight ", async (params) => {
  const { page } = params;
  const { data } = await axios.get<IFlight[]>(`/article`, {
    params: {
      page,
    },
  });

  return data;
});

export default fetchFlight;
