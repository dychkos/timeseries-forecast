import React from "react";
import styles from "./DataGrid.module.scss";
import { random } from "lodash";
import { addMonths } from "date-fns";
import { format } from "date-fns/esm";
import { Typography } from "antd";
import MockDataChart from "./components/MockDataChart";


export const FORECAST_CONFIG = {
  periodSize: 24,
  observationsToForeast: 12,
};

export const generatedRandom = (size, bottom, top) => {
  const today = new Date();
  return Array.from({ length: size }).map((_, index) => {
    return {
      period: format(addMonths(today, index + 1), "yyyy-MMM"),
      value: random(bottom, top),
    };
  });
};

const DataGrid = () => {
  return (
    <div>
      <Typography.Title>Система прогнозування енергоспоживання будинків</Typography.Title>
      <div className={styles.DataGridContainer}>
        <MockDataChart />
      </div>
    </div>
  );
};

export default DataGrid;
