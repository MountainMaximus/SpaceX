import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";
import pickBy from "lodash/pickBy";

import { IMissions } from "../../types";

interface PayloadData {
  docs: {
    id: string;
    name: string;
    date_local: string;
    details: string;
    rocket: string;
  }[];
  totalPages: number;
  page: number;
}

const fetchFlight = createAsyncThunk<
  { data: IMissions[]; update: boolean; totalPages: number; page: number },
  { direction: string; page?: number; update: boolean }
>("SpaceX/fetchFlight ", async (params) => {
  const { direction, page, update } = params;
  const { data } = await axios.post<PayloadData>(`/launches/query`, {
    query: {
      date_utc: {
        $gte: "2015",
        $lte: "2020",
      },
    },
    options: {
      limit: 10,
      page: page ?? 1,
      sort: {
        flight_number: direction,
      },
    },
  });
  console.log(data);

  const rockets = await axios.get<{ id: string; flickr_images: string[] }[]>(
    `/rockets`
  );

  const newData = data.docs.map((obj) => {
    return {
      id: obj.id,
      name: obj.name,
      date: obj.date_local,
      description: obj.details,
      img: rockets.data.find((rocket) => rocket.id === obj.rocket)
        ?.flickr_images[0],
    };
  });

  return {
    data: newData as unknown as IMissions[],
    update,
    totalPages: data.totalPages,
    page: data.page,
  };
});

export default fetchFlight;
