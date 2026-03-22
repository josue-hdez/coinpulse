import {
  DeepPartial,
  ChartOptions,
  ColorType,
  AreaSeriesPartialOptions,
  CandlestickSeriesPartialOptions,
} from "lightweight-charts";

export const ELLIPSIS = "ellipsis" as const;

export const PERIOD_BUTTONS: { value: Period; label: string }[] = [
  { value: "daily", label: "1D" },
  { value: "weekly", label: "1W" },
  { value: "monthly", label: "1M" },
  { value: "3months", label: "3M" },
  { value: "6months", label: "6M" },
  { value: "yearly", label: "1Y" },
];

export const PERIOD_CONFIG: Record<Period, number> = {
  daily: 1,
  weekly: 7,
  monthly: 30,
  "3months": 90,
  "6months": 180,
  yearly: 365,
};

const CHART_COLORS = {
  background: "#0b1116",
  text: "#8f9fb1",
  grid: "#1a2332",
  border: "#1a2332",
  crosshairVertical: "#ffffff40",
  crosshairHorizontal: "#ffffff20",
  lineColor: "#ffffff",
  topColor: "#ffffff",
  bottomColor: "rgba(255, 255, 255, 0.30)",
  candleUp: "#158A6E",
  candleDown: "#EB1C36",
} as const;

export const getChartConfig = (
  height: number,
  timeVisible: boolean = true,
): DeepPartial<ChartOptions> => ({
  width: 0,
  height,
  layout: {
    background: { type: ColorType.Solid, color: CHART_COLORS.background },
    textColor: CHART_COLORS.text,
    fontSize: 12,
    fontFamily: 'Inter, Roboto, "Helvetica Neue", Arial',
  },
  grid: {
    vertLines: { visible: false },
    horzLines: {
      visible: true,
      color: CHART_COLORS.grid,
      style: 2,
    },
  },
  rightPriceScale: {
    borderColor: CHART_COLORS.border,
  },
  timeScale: {
    borderColor: CHART_COLORS.border,
    timeVisible,
    secondsVisible: false,
  },
  handleScroll: true,
  handleScale: true,
  crosshair: {
    mode: 1,
    vertLine: {
      visible: true,
      color: CHART_COLORS.crosshairVertical,
      width: 1,
      style: 0,
    },
    horzLine: {
      visible: true,
      color: CHART_COLORS.crosshairHorizontal,
      width: 1,
      style: 0,
    },
  },
  localization: {
    priceFormatter: (price: number) =>
      "$" + price.toLocaleString(undefined, { maximumFractionDigits: 2 }),
  },
});

export const getAreaConfig = (): AreaSeriesPartialOptions => ({
  lineColor: CHART_COLORS.lineColor,
  topColor: CHART_COLORS.topColor,
  bottomColor: CHART_COLORS.bottomColor,
  lineWidth: 2,
});

export const getCandlestickConfig = (): CandlestickSeriesPartialOptions => ({
  upColor: CHART_COLORS.candleUp,
  downColor: CHART_COLORS.candleDown,
  wickUpColor: CHART_COLORS.candleUp,
  wickDownColor: CHART_COLORS.candleDown,
  borderVisible: true,
  wickVisible: true,
});
