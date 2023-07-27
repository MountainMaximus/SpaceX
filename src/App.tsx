import React from "react";
import { Header, MissionTable } from "./components";
import style from "./App.module.scss";

export const App = () => {
  return (
    <div className={style.content}>
      <Header />
      <MissionTable />
    </div>
  );
};
