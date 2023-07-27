import { RootState } from "../store";

export const getMissions = (state: RootState) => state.data.flight;
