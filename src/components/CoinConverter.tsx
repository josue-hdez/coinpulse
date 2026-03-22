"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { Input } from "./ui/input";
import Image from "next/image";
import { Separator } from "./ui/separator";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const CoinConverter = ({
  symbol,
  icon,
  priceList,
}: {
  symbol: string;
  icon: string;
  priceList: Record<string, number>;
}) => {
  const [currency, setCurrency] = useState("usd");
  const [amount, setAmount] = useState("10");

  const convertedPrice = (parseFloat(amount) || 0) * (priceList[currency] || 0);

  return (
    <div className="space-y-3">
      <h3 className="font-medium text-xl">
        <span className="text-text-muted">{symbol.toUpperCase()}</span>{" "}
        Converter
      </h3>
      <div className="px-4.5 py-6 rounded-xl space-y-1.5 bg-bg-primary">
        <div className="w-full h-12 rounded-md relative bg-bg-secondary">
          <Input
            className="font-medium text-lg! h-full border-none flex-1 bg-bg-secondary! focus-visible:ring-0 shadow-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            type="number"
            min={0}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="flex items-center gap-1.5 absolute top-1/2 right-3 -translate-y-1/2">
            <Image src={icon} alt={symbol} width={20} height={20} />
            <p>{symbol.toUpperCase()}</p>
          </div>
        </div>
        <Separator className="my-6! bg-accent-deep!" />
        <div className="w-full h-12 py-3 pl-3 rounded-md flex items-center justify-between bg-bg-secondary">
          <p className="font-medium text-lg">
            {formatCurrency(convertedPrice, 2, currency, false)}
          </p>
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger
              className="w-fit! h-12! border-none! focus-visible:ring-0! bg-bg-secondary! hover:bg-bg-secondary! cursor-pointer!"
              value={currency}
            >
              <SelectValue>{currency.toUpperCase()}</SelectValue>
            </SelectTrigger>
            <SelectContent data-converter>
              {Object.keys(priceList).map((currencyCode) => (
                <SelectItem key={currencyCode} value={currencyCode}>
                  {currencyCode.toUpperCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default CoinConverter;
