import React from "react";
import { useSelector } from "react-redux";

import { getMissions } from "../../redux/fetch/selectors";
import { getSort } from "../../redux/filter/selectors";
import { setColumn } from "../../redux/filter/slice";
import { useAppDispatch } from "../../redux/store";
import { Status, TableTitles } from "../../types";
import styles from "./Table.module.scss";

export const MissionTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: Missions, status } = useSelector(getMissions);
  const { direction } = useSelector(getSort);

  const onClickColumn = (key: string) => {
    if (key === "NAME") dispatch(setColumn());
  };
  if (status === Status.LOADING) return <div>Идет загрузка</div>;
  if (status === Status.ERROR) return <div>Ошибка при загрузке</div>;

  return (
    <table className={styles.root}>
      <thead>
        <tr>
          {Object.entries(TableTitles).map(([key, val]) => (
            <th onClick={() => onClickColumn(key)} key={key}>
              {val}
              {key === "NAME" && direction && <>&#9660;</>}
              {key === "NAME" && !direction && <>&#9650;</>}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {Missions ? (
          Missions.map((val) => (
            <tr key={val.id}>
              <td>{val.name}</td>
              <td>{val.date}</td>
              <td>{val.description}</td>
              <td>{val.img}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3}>Папка пуста</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
