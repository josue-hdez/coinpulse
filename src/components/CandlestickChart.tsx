"use client";

import { useRef, useEffect } from "react";
import { convertOHLCData } from "@/lib/utils";
import { getChartConfig, getCandlestickConfig } from "@/lib/constants";
import {
  IChartApi,
  ISeriesApi,
  createChart,
  CandlestickSeries,
} from "lightweight-charts";

const CandlestickChart = ({
  data,
  period,
  height = 360,
}: {
  data: OHLCData[];
  period: Period;
  height?: number;
}) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  useEffect(() => {
    const container = chartContainerRef.current;

    if (!container) return;

    const showTime = ["daily", "weekly", "monthly"].includes(period);

    const chart = createChart(container, {
      ...getChartConfig(height, showTime),
      width: container.clientWidth,
    });
    const series = chart.addSeries(CandlestickSeries, getCandlestickConfig());

    const convertedToSeconds = data.map(
      (item) =>
        [
          Math.floor(item[0] / 1000),
          item[1],
          item[2],
          item[3],
          item[4],
        ] as OHLCData,
    );

    series.setData(convertOHLCData(convertedToSeconds));
    chart.timeScale().fitContent();

    chartRef.current = chart;
    candleSeriesRef.current = series;

    const observer = new ResizeObserver((entries) => {
      if (entries.length)
        chart.applyOptions({ width: entries[0].contentRect.width });
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
      chart.remove();

      chartRef.current = null;
      candleSeriesRef.current = null;
    };
  }, [height]);

  useEffect(() => {
    if (!candleSeriesRef.current) return;

    const convertedToSeconds = data.map(
      (item) =>
        [
          Math.floor(item[0] / 1000),
          item[1],
          item[2],
          item[3],
          item[4],
        ] as OHLCData,
    );

    const showTime = ["daily", "weekly", "monthly"].includes(period);

    candleSeriesRef.current?.setData(convertOHLCData(convertedToSeconds));
    chartRef?.current?.applyOptions(getChartConfig(height, showTime));
    chartRef.current?.timeScale().fitContent();
  }, [period, data]);

  return <div className="chart" style={{ height }} ref={chartContainerRef} />;
};

export default CandlestickChart;
