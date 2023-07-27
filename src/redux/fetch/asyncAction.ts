import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

import { IMissions } from "../../types";

const fetchFlight = createAsyncThunk<
  IMissions[],
  { page?: number; category?: string; tags?: string }
>("SpaceX/fetchFlight ", async (params) => {
  const { page } = params;
  const { data } = await axios.get<IMissions[]>(`/article`, {
    params: {
      page,
    },
  });

  return data;
});

export default fetchFlight;
