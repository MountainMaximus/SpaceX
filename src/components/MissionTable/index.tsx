import React from "react";
import { useSelector } from "react-redux";
import fetchFlight from "../../redux/fetch/asyncAction";

import { getMissions } from "../../redux/fetch/selectors";
import { getSort } from "../../redux/filter/selectors";
import { setColumn } from "../../redux/filter/slice";
import { useAppDispatch } from "../../redux/store";
import { DIRECTION, Status, TableTitles } from "../../types";
import styles from "./Table.module.scss";

export const MissionTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: Missions, status } = useSelector(getMissions);
  const { direction } = useSelector(getSort);

  React.useEffect(() => {
    dispatch(fetchFlight({ direction, update: true }));
  }, [direction]);

  const onClickColumn = (key: string) => {
    if (key === "DATE") {
      dispatch(setColumn());
    }
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
              {key === "DATE" && direction === DIRECTION.DESC && <>&#9660;</>}
              {key === "DATE" && direction === DIRECTION.ASC && <>&#9650;</>}
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
              <td>
                <img
                  className={styles.rocket__img}
                  src={val.img}
                  alt="Rocket"
                />
              </td>
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
