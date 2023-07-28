import { RootState } from "../store";

export const getMissions = (state: RootState) => state.data.flight;
export const getPage = (state: RootState) => {
  return {
    page: state.data.page,
    totalPages: state.data.totalPages,
  };
};
