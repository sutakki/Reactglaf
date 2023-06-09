import React from "react";
import RealtimeLineChart from "./RealtimeLineChart";

const TIME_RANGE_IN_MILLISECONDS = 30 * 1000;
const ADDING_DATA_INTERVAL_IN_MILLISECONDS = 1000;
const ADDING_DATA_RATIO = 0.8;

export default () => {
  const nameList = ["a", "b", "c"];
  const defaultDataList = nameList.map(name => ({
    name: name,
    data: []
  }));
  const [dataList, setDataList] = React.useState(defaultDataList);

  React.useEffect(() => {
    const addDataRandomly = data => {
      if (Math.random() < 1 - ADDING_DATA_RATIO) {
        return data;
      }
      return [
        ...data,
        {
          x: new Date(),
          y: data.length * Math.random()
        }
      ];
    };
    const interval = setInterval(() => {
      setDataList(
        dataList.map(val => {
          return {
            name: val.name,
            data: addDataRandomly(val.data)
          };
        })
      );
    }, ADDING_DATA_INTERVAL_IN_MILLISECONDS);

    return () => clearInterval(interval);
  });

  return (
    <div>
      <RealtimeLineChart
        dataList={dataList}
        range={TIME_RANGE_IN_MILLISECONDS}
      />
    </div>
  );
};