// @ts-nocheck

import React, { useState, useEffect, useReducer } from "react";
import styles from "./MockDataChart.module.scss";
import useInterval from "@use-it/interval";

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Brush,
  AreaChart,
  Area,
  ReferenceLine,
  Label,
} from "recharts";
import {
  last,
  getPredictions,
  maxValidDataSize,
} from "../../../utils/dataManagers/forecastManager";
import { parse, addMonths, format } from "date-fns";
import { Typography, Button } from "antd";
import { mockData1 } from "../../../utils/dataSource/dummy";


const initialState = {
  start: 0,
  end: 2,
  isPlaying: false,
};

const reducer = (state: typeof initialState, action) => {
  switch (action.type) {
    case "play":
      return {
        ...state,
        end: 3,
        start: 0,
        isPlaying: true,
      };
    case "stop":
      return {
        ...state,
        end: 3,
        start: 0,
        isPlaying: false,
      };
    case "increase":
      return {
        ...state,
        start: state.end - state.start > 15 ? state.start + 1 : state.start,
        end: state.end + 1,
      };
    default:
      return state;
  }
};

const FORECAST_CONFIG = {
  periodSize: 12,
  observationsToForeast: 4,
};

const CustomTooltip = (props) => {
  const { active, label, data } = props;
  const dataItem = data.find((i) => i.Period === label);

  const precisionLabel = () => {
    if (dataItem?.precisionArea[0] === dataItem?.precisionArea[1]) return null;
    else return dataItem?.precisionArea.join(" ~ ");
  };

  if (active) {
    return (
      <div className={styles.TooltipContainer}>
        <p className={styles.TooltipLabel}>{label}</p>
        {dataItem?.Energy && (
          <p className={styles.TooltipValue}>
            <b>Спожито:</b>: {dataItem?.Energy} млрд кВт∙год
          </p>
        )}
        {!dataItem?.Energy && dataItem?.predicted && (
          <p className={styles.TooltipValue}>
            <b>Прогнозоване значення:</b> {dataItem?.predicted}
          </p>
        )}
        {precisionLabel() && (
          <p className={styles.TooltipValue}>
            <b>Діапазон точності:</b> {precisionLabel()}
          </p>
        )}
      </div>
    );
  }

  return null;
};

const CustomizedAxisTick = (props) => {
  const { x, y, payload, data } = props;
  const content = data.find((i) => i.Period === payload.value)?.Energy;
  const contentPredicted = data.find((i) => i.Period === payload.value)
    ?.predicted;


  return (
    <>
      <g transform={`translate(${x}, ${0})`} z={9999}>
        <text
          x={10}
          y={0}
          dy={16}
          fontSize={12}
          textAnchor="end"
          fill="#fff"
          transform="rotate(0)"
        >
          {content ? `${content}кВт` : `${contentPredicted.toFixed(2)}кВт`}
        </text>
      </g>
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          fontSize={12}
          textAnchor="end"
          fill="#fff"
          transform="rotate(-35)"
        >
          {payload.value}
        </text>
      </g>
    </>
  );
};

const MockDataChart = () => {
  const [mockData, setMockData] = useState(null);
  const [displayData, setDisplayData] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  const fitMockData = () => {
    const dataPreparedToPredict: number[] = mockData1.map((i) => i.Energy);
    // Taking only predicted values + one point for existing history to make chart smoother
    const predictedRow = last(
      getPredictions(dataPreparedToPredict, FORECAST_CONFIG),
      FORECAST_CONFIG.observationsToForeast + 1
    );

    // We need this to avoid 0-values on chart with areas
    let newChartData = mockData1.map((i) => ({
      ...i,
      precisionArea: [null, null],
      predicted: null,
    }));

    // Make point with pre-last available historical data and 0 predicted one
    newChartData[newChartData.length - 2] = {
      ...newChartData[newChartData.length - 2],
      predicted: newChartData[newChartData.length - 2].Energy,
      precisionArea: [
        newChartData[newChartData.length - 2].Energy,
        newChartData[newChartData.length - 2].Energy,
      ],
    };

    const lastDate = last(newChartData, 2)[0]?.Period;
    console.log(last(newChartData, 2));

    const lastDateParsed = parse(lastDate, "yyyy-MMM", new Date());
    console.log(lastDateParsed, addMonths(lastDateParsed, 1));

    // Here we need to pick last period as it is not ended yet
    const currentPeriodIndex = -1;
    newChartData[newChartData.length - 1] = {
      Period: format(
        addMonths(
          parse(last(newChartData)[0]?.Period, "yyyy-MMM", new Date()),
          0
        ),
        "yyyy-MMM"
      ),
      Energy: newChartData[newChartData.length - 1].Energy,
      precisionArea: [
        Number(
          (
            predictedRow[currentPeriodIndex + 1] *
            (1 + (currentPeriodIndex + 1) / 9)
          ).toFixed(2)
        ),
        Number(
          (
            predictedRow[currentPeriodIndex + 1] *
            (1 - (currentPeriodIndex + 1) / 9)
          ).toFixed(2)
        ),
      ],
      predicted: Number(predictedRow[currentPeriodIndex + 1].toFixed(2)),
    };

    // // See how predictions correlate with historical data
    // newChartData = newChartData.map((i, index) => {
    //   return {
    //     ...i,
    //     predicted: getPredictions(dataPreparedToPredict, FORECAST_CONFIG)[
    //       index + 1
    //     ],
    //   };
    // });

    for (let i = 0; i < FORECAST_CONFIG.observationsToForeast; i++) {
      newChartData.push({
        Period: format(addMonths(lastDateParsed, i + 2), "yyyy-MMM"),
        Energy: null,
        precisionArea: [
          Number((predictedRow[i + 1] * (1 + (i + 1) / 9)).toFixed(2)),
          Number((predictedRow[i + 1] * (1 - (i + 1) / 9)).toFixed(2)),
        ],
        predicted: Number(predictedRow[i + 1].toFixed(2)),
      });
    }
    return newChartData;
  };

  useInterval(() => {
    if (state.isPlaying) {
      const buffer = displayData;
      const bufferOffset = state.end;
      const current = buffer.slice(state.start, bufferOffset);

      if (state.end === buffer.length) {
        dispatch({ type: "stop" });
      } else {
        setMockData(current);
        // console.log(state.end);
        dispatch({ type: "increase" });
      }
    }
  }, 1000);

  useEffect(() => {
    const mockData = fitMockData();
    setMockData(mockData);
    setDisplayData(mockData);
  }, []);

  const title = (
    <div style={{ color: "white", marginBottom: "30px" }}>
      <Typography.Title level={3}>Графічне представлення</Typography.Title>
      <Typography.Text type="secondary">
        К-сть записів : <b>{mockData?.length} </b>. Прогнози базуються на останніх{" "}
        <b>
          {mockData &&
            maxValidDataSize(mockData.length, FORECAST_CONFIG.periodSize)}{" "}
        </b>
        записах.
      </Typography.Text>
    </div>
  );

  const refLinePeriodName = mockData?.find((i) => i.predicted && i.Energy)
    ?.Period;

  return (
    <div
      style={{
        width: "50%",
        height: "100%",
        paddingBottom: "150px",
        margin: "auto",
        minWidth: "100%",
        backgroundColor:"#7fc7c8",
        backgroundPositionX: "initial",
        backgroundPositionY: "initial",
        backgroundSize: "initial",
        backgroundAttachment: "initial",
        backgroundOrigin: "initial",
        backgroundClip: "initial"
      }}
    >
      {title}

      <ResponsiveContainer width="100%">
        <AreaChart
          width={600}
          height={300}
          data={mockData}
          margin={{
            top: 25,
            right: 30,
            left: 50,
            bottom: 5,
          }}
        >
          <CartesianGrid
            horizontal={false}
            strokeDasharray="3 5"
            strokeWidth={2}
            // Custom grid calculations
            verticalCoordinatesGenerator={(e) => {
              const itemWidth = e.xAxis.width / (e.xAxis.domain.length - 1);

              return e.xAxis.domain.map((i, idx) => {
                // Skip if reference line on this position
                if (refLinePeriodName === i) {
                  return 0;
                }
                return e.offset.left + itemWidth * idx;
              });
            }}
            x={mockData?.find((i) => i.predicted && i.Energy)?.Period}
          />
          <XAxis
            height={60}
            dataKey="Period"
            interval={0}
            tick={<CustomizedAxisTick data={mockData} />}
          />
          <YAxis type="number" hide domain={["dataMin", "dataMax"]} />
          <Tooltip content={<CustomTooltip data={mockData} />} />

          <Area
            isAnimationActive={true}
            type="monotone"
            dataKey="predicted"
            stroke="#f18153"
            fill="#f18153"
            activeDot={{ r: 3 }}
          />

         <Area
          isAnimationActive={true}
            type="monotone"
            dataKey="precisionArea"
            stroke="#2a9d8f"
            activeDot={{ r: 3 }}
          />

          <Area
            isAnimationActive={true}
            type="linear"
            dataKey="Energy"
            stroke="#fff"
            fill="#f18153"
            dot={{ stroke: "white", strokeWidth: 2, r: 4, fill: "black" }}
            strokeWidth={3}
            fillOpacity={1}
            activeDot={{ r: 3 }}
          />

          <ReferenceLine
            x={refLinePeriodName}
            stroke="black"
            strokeWidth={2}
            strokeDasharray="15 5"
            label={
              <Label
                value="Початок"
                fontWeight={700}
                fontSize={18}
                position="centerBottom"
                fill="#fff"
              />
            }
          />
          {!state.isPlaying && (
            <Brush height={20} startIndex={mockData?.length - 10} />
          )}
        </AreaChart>
      </ResponsiveContainer>

      <Button
        type="default"
        color="primary"
        style={{padding:"6px 20px",backgroundColor:"rgb(28,135,84)",color:"white",border:"none"}}
        onClick={() => {
          dispatch({ type: state.isPlaying ? "stop" : "play" });
          state.isPlaying && setMockData(displayData);
        }}
      >
        {state.isPlaying ? "Stop" : "Play"}
      </Button>
    </div>
  );
};

export default MockDataChart;
