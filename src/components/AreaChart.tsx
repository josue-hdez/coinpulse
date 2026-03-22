"use client";

import { useRef, useEffect } from "react";
import { convertPriceData } from "@/lib/utils";
import { getChartConfig, getAreaConfig } from "@/lib/constants";
import {
  IChartApi,
  ISeriesApi,
  createChart,
  AreaSeries,
} from "lightweight-charts";

const AreaChart = ({
  data,
  period,
  height = 360,
}: {
  data: PriceData[];
  period: Period;
  height?: number;
}) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const areaSeriesRef = useRef<ISeriesApi<"Area"> | null>(null);

  useEffect(() => {
    const container = chartContainerRef.current;

    if (!container) return;

    const showTime = ["daily", "weekly", "monthly"].includes(period);

    const chart = createChart(container, {
      ...getChartConfig(height, showTime),
      width: container.clientWidth,
    });
    const series = chart.addSeries(AreaSeries, getAreaConfig());

    series.setData(convertPriceData(data));
    chart.timeScale().fitContent();

    chartRef.current = chart;
    areaSeriesRef.current = series;

    const observer = new ResizeObserver((entries) => {
      if (entries.length)
        chart.applyOptions({ width: entries[0].contentRect.width });
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
      chart.remove();
      chartRef.current = null;
      areaSeriesRef.current = null;
    };
  }, [height]);

  useEffect(() => {
    if (!areaSeriesRef.current) return;

    areaSeriesRef.current.setData(convertPriceData(data));
    chartRef.current?.timeScale().fitContent();
  }, [period, data]);

  return <div className="chart" style={{ height }} ref={chartContainerRef} />;
};

export default AreaChart;
