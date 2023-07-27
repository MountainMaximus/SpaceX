export type IMissions = {
  id: number;
  name: string;
  date: string;
  description: string;
  img?: string;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "completed",
  ERROR = "error",
}

export enum DIRECTION {
  ASC = "asc",
  DESC = "desc",
}

export enum TableTitles {
  NAME = "Название миссии",
  DATE = "Дата запуска",
  DESCRIPTION = "Информация о запуске",
  IMG = "Фотография ракеты",
}
