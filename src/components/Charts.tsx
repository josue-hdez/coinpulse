"use client";

import { useState, useEffect } from "react";
import { fetcher } from "@/lib/coingecko.actions";
import { cn } from "@/lib/utils";
import { PERIOD_BUTTONS, PERIOD_CONFIG } from "@/lib/constants";
import { Button } from "./ui/button";
import { ChartArea, ChartCandlestick } from "lucide-react";
import AreaChart from "./AreaChart";
import CandlestickChart from "./CandlestickChart";

const Charts = ({
  coinId,
  height = 360,
}: {
  coinId: string;
  height?: number;
}) => {
  const [chartType, setChartType] = useState<"area" | "candlestick">("area");
  const [period, setPeriod] = useState<Period>("daily");
  const [areaChartData, setAreaChartData] = useState<PriceData[]>([]);
  const [candlestickChartData, setCandlestickChartData] = useState<OHLCData[]>(
    [],
  );

  const fetchChartData = async (
    type: "area" | "candlestick",
    period: Period,
  ) => {
    const days = PERIOD_CONFIG[period];

    if (type === "area") {
      const res = await fetcher<CoinMarketChartData>(
        `coins/${coinId}/market_chart`,
        {
          vs_currency: "usd",
          days,
        },
      );

      setAreaChartData(res?.prices ?? []);
    } else {
      const res = await fetcher<OHLCData[]>(`coins/${coinId}/ohlc`, {
        vs_currency: "usd",
        days,
        precision: "full",
      });

      setCandlestickChartData(res ?? []);
    }
  };

  useEffect(() => {
    const loadInitialData = async () => await fetchChartData(chartType, period);

    loadInitialData();
  }, [coinId, chartType, period]);

  return (
    <div className="py-6 px-4.5 rounded-xl space-y-4.5 bg-bg-primary">
      <div className="max-sm:space-y-1.5 xs:flex xs:justify-between">
        <div className="flex items-center gap-0.5">
          <Button
            className={cn(
              "font-medium text-sm text-white w-10.5 py-1.5 px-3 rounded-md bg-bg-primary cursor-pointer",
              chartType === "area"
                ? "text-gray-900 bg-positive"
                : "hover:bg-bg-primary",
            )}
            onClick={() => setChartType("area")}
          >
            <ChartArea />
          </Button>
          <Button
            className={cn(
              "font-medium text-sm text-white w-10.5 py-1.5 px-3 rounded-md bg-bg-primary cursor-pointer",
              chartType === "candlestick"
                ? "text-gray-900 bg-positive"
                : "hover:bg-bg-primary",
            )}
            onClick={() => setChartType("candlestick")}
          >
            <ChartCandlestick />
          </Button>
        </div>
        <div className="flex items-center gap-0.5">
          {PERIOD_BUTTONS.map(({ value, label }) => (
            <Button
              key={value}
              className={cn(
                "font-medium text-sm text-white w-10.5 py-1.5 px-3 rounded-md bg-bg-primary cursor-pointer",
                value === period
                  ? "text-gray-900 bg-positive"
                  : "hover:bg-bg-primary",
              )}
              onClick={() => setPeriod(value)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
      {chartType === "area" ? (
        <AreaChart data={areaChartData} period={period} height={height} />
      ) : (
        <CandlestickChart
          data={candlestickChartData}
          period={period}
          height={height}
        />
      )}
    </div>
  );
};

export default Charts;
