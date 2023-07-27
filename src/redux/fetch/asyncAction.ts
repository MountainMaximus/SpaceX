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
}

const fetchFlight = createAsyncThunk<
  { data: IMissions[]; update?: boolean },
  { direction: string; page?: string; update?: boolean }
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
  console.log(data, Date.now());

  const rockets = await axios.get<{ id: string; flickr_images: string[] }[]>(
    `/rockets`
  );
  console.log(rockets, Date.now());

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
  console.log(newData, Date.now());

  return { data: newData as unknown as IMissions[], update };
});

export default fetchFlight;
