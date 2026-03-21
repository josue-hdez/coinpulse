"use client";

import { cn, formatCurrency, formatPercentage } from "@/lib/utils";
import { ReactNode } from "react";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import { TrendingUp, TrendingDown } from "lucide-react";
import DataTable from "./DataTable";

const columns: ColumnDef<CoinMarketData>[] = [
  {
    accessorKey: "market_cap_rank",
    header: () => "#",
    cell: ({ row }) => (
      <div className="font-medium">{row.original.market_cap_rank}</div>
    ),
  },
  {
    accessorKey: "name",
    header: () => "Coin",
    cell: ({ row }) => (
      <div className="pr-6 flex items-center gap-3">
        <Image
          className="w-auto h-auto rounded-full"
          src={row.original.image}
          alt={row.original.name}
          width={30}
          height={30}
        />
        <div className="max-w-45 space-y-0.5">
          <h3 className="font-medium truncate">{row.original.name}</h3>
          <p className="text-xs text-text-muted">
            {row.original.symbol.toUpperCase()}
          </p>
        </div>
        <Link
          className="absolute z-15 inset-0"
          href={`/coins/${row.original.id}`}
          aria-label="View coin"
        />
      </div>
    ),
  },
  {
    accessorKey: "current_price",
    header: () => <div className="text-end">Price</div>,
    cell: ({ row }) => (
      <div className="font-medium text-end">
        {formatCurrency(row.original.current_price)}
      </div>
    ),
  },
  {
    accessorKey: "price_change_percentage_1h_in_currency",
    header: () => <div className="text-end">1h</div>,
    cell: ({ row }) => {
      const isTrendingUp =
        row.original.price_change_percentage_1h_in_currency > 0;
      const isTrendingDown =
        row.original.price_change_percentage_1h_in_currency < 0;

      return (
        <div
          className={cn(
            "font-medium flex justify-end items-center gap-1.5",
            isTrendingUp
              ? "text-positive"
              : isTrendingDown
                ? "text-negative"
                : "",
          )}
        >
          {isTrendingUp ? (
            <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          ) : isTrendingDown ? (
            <TrendingDown className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          ) : null}
          {formatPercentage(
            Math.abs(row.original.price_change_percentage_1h_in_currency),
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "price_change_percentage_24h_in_currency",
    header: () => <div className="text-end">24h</div>,
    cell: ({ row }) => {
      const isTrendingUp =
        row.original.price_change_percentage_24h_in_currency > 0;
      const isTrendingDown =
        row.original.price_change_percentage_24h_in_currency < 0;

      return (
        <div
          className={cn(
            "font-medium flex justify-end items-center gap-1.5",
            isTrendingUp
              ? "text-positive"
              : isTrendingDown
                ? "text-negative"
                : "",
          )}
        >
          {isTrendingUp ? (
            <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          ) : isTrendingDown ? (
            <TrendingDown className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          ) : null}
          {formatPercentage(
            Math.abs(row.original.price_change_percentage_24h_in_currency),
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "price_change_percentage_7d_in_currency",
    header: () => <div className="text-end">7d</div>,
    cell: ({ row }) => {
      const isTrendingUp =
        row.original.price_change_percentage_7d_in_currency > 0;
      const isTrendingDown =
        row.original.price_change_percentage_7d_in_currency < 0;

      return (
        <div
          className={cn(
            "font-medium flex justify-end items-center gap-1.5",
            isTrendingUp
              ? "text-positive"
              : isTrendingDown
                ? "text-negative"
                : "",
          )}
        >
          {isTrendingUp ? (
            <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          ) : isTrendingDown ? (
            <TrendingDown className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          ) : null}
          {formatPercentage(
            Math.abs(row.original.price_change_percentage_7d_in_currency),
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "total_volume",
    header: () => <div className="text-end">Total Volume</div>,
    cell: ({ row }) => (
      <div className="font-medium text-end">
        {formatCurrency(row.original.total_volume)}
      </div>
    ),
  },
  {
    accessorKey: "market_cap",
    header: () => <div className="text-end">Market Cap</div>,
    cell: ({ row }) => (
      <div className="font-medium text-end">
        {formatCurrency(row.original.market_cap)}
      </div>
    ),
  },
];

const CoinTable = ({
  coinMarkets,
  children,
}: {
  coinMarkets: CoinMarketData[];
  children: ReactNode;
}) => {
  return (
    <div className="space-y-6">
      <DataTable columns={columns} data={coinMarkets} />
      {children}
    </div>
  );
};

export default CoinTable;
