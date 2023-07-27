import React from "react";
import { useSelector } from "react-redux";
import fetchFlight from "../../redux/fetch/asyncAction";

import { getMissions } from "../../redux/fetch/selectors";
import { getSort } from "../../redux/filter/selectors";
import { setColumn } from "../../redux/filter/slice";
import { useAppDispatch } from "../../redux/store";
import { DIRECTION, IMissions, Status, TableTitles } from "../../types";
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

  const getContent = () => {
    if (status === Status.LOADING)
      return (
        <>
          {[...new Array(5)].map((_, index) => (
            <tr key={index}>
              <td colSpan={4} className={styles.skeleton}>
                Подождите идет загрузка
              </td>
            </tr>
          ))}
        </>
      );
    if (!Missions)
      return (
        <tr>
          <td colSpan={4}>Не найдено результатов по запросу</td>
        </tr>
      );
    return Missions.map((obj) => (
      <tr key={obj.id}>
        <td>{obj.name}</td>
        <td>{obj.date}</td>
        <td>{obj.description}</td>
        <td>
          <img className={styles.rocket__img} src={obj.img} alt="Rocket" />
        </td>
      </tr>
    ));
  };

  if (status === Status.ERROR) return <div>Ошибка при загрузке</div>;

  return (
    <table className={styles.root}>
      <thead>
        <tr>
          {Object.entries(TableTitles).map(([key, val]) => (
            <th
              onClick={() => onClickColumn(key)}
              key={key}
              style={
                key === "DESCRIPTION"
                  ? {
                      width: "100%",
                    }
                  : {}
              }
            >
              {val}
              {key === "DATE" && direction === DIRECTION.DESC && <>&#9660;</>}
              {key === "DATE" && direction === DIRECTION.ASC && <>&#9650;</>}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>{getContent()}</tbody>
    </table>
  );
};
