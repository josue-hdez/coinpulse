"use client";

import Autoplay from "embla-carousel-autoplay";
import { formatCurrency, cn, formatPercentage } from "@/lib/utils";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Image from "next/image";
import { TrendingUp, TrendingDown } from "lucide-react";
import Link from "next/link";

const TrendingCoins = ({
  trendingCoins = [],
}: {
  trendingCoins: TrendingCoin[];
}) => {
  return (
    <Carousel
      orientation="horizontal"
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
    >
      <CarouselContent>
        {trendingCoins.map(({ item: coin }) => {
          const isTrendingUp = coin.data.price_change_percentage_24h.usd > 0;
          const isTrendingDown = coin.data.price_change_percentage_24h.usd < 0;

          return (
            <CarouselItem
              key={coin.id}
              className="xs:basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
            >
              <div className="h-[150px] max-h-[150px] px-3 rounded-md flex flex-col justify-center gap-1.5 relative bg-bg-primary">
                <Image
                  className="w-7.5 h-7.5 rounded-full"
                  src={coin.large}
                  alt={coin.name}
                  width={30}
                  height={30}
                />
                <p className="text-text-muted">{coin.symbol.toUpperCase()}</p>
                <h3 className="font-medium text-xl">
                  {formatCurrency(coin.data.price)}
                </h3>
                <p
                  className={cn(
                    "font-medium flex items-center gap-1.5",
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
                    Math.abs(coin.data.price_change_percentage_24h.usd),
                  )}
                </p>
                <Link
                  className="absolute z-15 inset-0"
                  href={`/coins/${coin.id}`}
                  aria-label="View coin"
                />
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
};

export default TrendingCoins;
