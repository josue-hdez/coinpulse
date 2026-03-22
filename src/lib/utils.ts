import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ELLIPSIS } from "./constants";
import { Time } from "lightweight-charts";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (
  value: number | null | undefined,
  digits?: number,
  currency?: string,
  showSymbol?: boolean,
) => {
  if (value === null || value === undefined || isNaN(value))
    return showSymbol !== false ? "$0.00" : "0.00";

  if (showSymbol === undefined || showSymbol === true)
    return value.toLocaleString(undefined, {
      style: "currency",
      currency: currency?.toUpperCase() || "USD",
      minimumFractionDigits: digits ?? 2,
      maximumFractionDigits: digits ?? 2,
    });

  return value.toLocaleString(undefined, {
    minimumFractionDigits: digits ?? 2,
    maximumFractionDigits: digits ?? 2,
  });
};

export const formatPercentage = (change: number | null | undefined): string => {
  if (change === null || change === undefined || isNaN(change)) return "0.0%";

  return `${change.toFixed(1)}%`;
};

export const buildPageNumbers = (
  currentPage: number,
  totalPages: number,
): (number | typeof ELLIPSIS)[] => {
  const MAX_VISIBLE_PAGES = 5;
  const pages: (number | typeof ELLIPSIS)[] = [];

  if (totalPages <= MAX_VISIBLE_PAGES) {
    for (let i = 1; i <= totalPages; i += 1) {
      pages.push(i);
    }

    return pages;
  }

  pages.push(1);

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  if (start > 2) pages.push(ELLIPSIS);

  for (let i = start; i <= end; i += 1) {
    pages.push(i);
  }

  if (end < totalPages - 1) pages.push(ELLIPSIS);

  pages.push(totalPages);

  return pages;
};

export const convertPriceData = (data: PriceData[]) =>
  data.map((item) => ({
    time: Math.floor(item[0] / 1000) as Time, // Convert ms to seconds
    value: item[1], // The price
  }));

export const convertOHLCData = (data: OHLCData[]) =>
  data
    .map((d) => ({
      time: d[0] as Time,
      open: d[1],
      high: d[2],
      low: d[3],
      close: d[4],
    }))
    .filter(
      (item, index, arr) => index === 0 || item.time !== arr[index - 1].time,
    );
