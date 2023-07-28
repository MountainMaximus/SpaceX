import React from "react";
import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import fetchFlight from "../../redux/fetch/asyncAction";

import { getMissions, getPage } from "../../redux/fetch/selectors";
import { getSort } from "../../redux/filter/selectors";
import { setColumn } from "../../redux/filter/slice";
import { useAppDispatch } from "../../redux/store";
import { DIRECTION, IMissions, Status, TableTitles } from "../../types";
import styles from "./Table.module.scss";

export const MissionTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: Missions, status } = useSelector(getMissions);
  const { page, totalPages } = useSelector(getPage);
  const { direction } = useSelector(getSort);
  const { ref, inView } = useInView({
    threshold: 0.01,
  });
  React.useEffect(() => {
    dispatch(fetchFlight({ direction, update: true }));
  }, [direction]);

  const onClickColumn = (key: string) => {
    if (key === "DATE") {
      dispatch(setColumn());
    }
  };
  React.useEffect(() => {
    if (inView && status !== Status.LOADING) {
      dispatch(fetchFlight({ direction, update: false, page: page + 1 }));
    }
  }, [inView]);

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

      <tbody>
        {Missions ? (
          Missions.map((obj) => (
            <tr key={obj.id}>
              <td>{obj.name}</td>
              <td>{obj.date}</td>
              <td>{obj.description}</td>
              <td>
                <img
                  className={styles.rocket__img}
                  src={obj.img}
                  alt="Rocket"
                />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4}>Не найдено результатов по запросу</td>
          </tr>
        )}
        {(status === Status.LOADING || page < totalPages) && (
          <>
            {[...new Array(5)].map((_, index) => (
              <tr key={index} ref={!index ? ref : null}>
                <td colSpan={4} className={styles.skeleton}>
                  Подождите идет загрузка
                </td>
              </tr>
            ))}
          </>
        )}
      </tbody>
    </table>
  );
};
