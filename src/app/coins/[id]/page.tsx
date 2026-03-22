import { fetcher } from "@/lib/coingecko.actions";
import { formatCurrency, cn, formatPercentage } from "@/lib/utils";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, ArrowUpRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import CoinConverter from "@/components/CoinConverter";
import Charts from "@/components/Charts";

const Page = async ({
  params,
}: {
  params: Promise<{ [key: string]: string }>;
}) => {
  const { id } = await params;

  const coin = await fetcher<CoinData>(`coins/${id}`, {
    dex_pair_format: "symbol",
  });

  const isTrendingUp =
    coin.market_data.price_change_percentage_24h_in_currency.usd > 0;
  const isTrendingDown =
    coin.market_data.price_change_percentage_24h_in_currency.usd < 0;

  const coinMarketData = [
    {
      label: "Market Cap",
      value: formatCurrency(coin.market_data.market_cap.usd),
    },
    {
      label: "Fully Diluted Valuation",
      value: formatCurrency(coin.market_data.fully_diluted_valuation.usd),
    },
    {
      label: "Total Volume",
      value: formatCurrency(coin.market_data.total_volume.usd),
    },
    {
      label: "Circulating Supply",
      value: formatCurrency(coin.market_data.circulating_supply),
    },
    {
      label: "Total Supply",
      value: formatCurrency(coin.market_data.total_supply),
    },
    {
      label: "Max Supply",
      value: formatCurrency(coin.market_data.max_supply),
    },
  ];

  const coinInfoData = [
    {
      label: "Website",
      value: "-",
      link: coin.links.homepage[0],
      linkText: "Homepage",
    },
    {
      label: "Explorer",
      value: "-",
      link: coin.links.blockchain_site[0],
      linkText: "Explorer",
    },
    {
      label: "Community",
      value: "-",
      link: coin.links.subreddit_url,
      linkText: "Community",
    },
    {
      label: "Whitepaper",
      value: "-",
      link: coin.links.whitepaper,
      linkText: "Whitepaper",
    },
  ];

  return (
    <main className="container px-4.5 py-6 mx-auto space-y-3 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-center lg:gap-6">
      <section className="space-y-3 lg:col-span-1">
        <div className="flex items-center gap-1.5">
          <h1 className="font-medium text-xl">
            {coin.name}{" "}
            <span className="text-text-muted">{coin.symbol.toUpperCase()}</span>
          </h1>
          <span className="text-xs py-1.5 px-2 rounded-md ml-1.5 bg-bg-primary">
            #{coin.market_cap_rank}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Image
            className="size-9 sm:size-12 md:size-15 rounded-full"
            src={coin.image.large}
            alt={coin.name}
            width={72}
            height={72}
          />
          <div className="flex items-center gap-3">
            <h3 className="font-medium text-3xl sm:text-4xl md:text-5xl">
              {formatCurrency(coin.market_data.current_price.usd)}
            </h3>
            <Badge
              className={cn(
                "font-medium h-fit py-1 mt-1 flex items-center gap-1.5",
                isTrendingUp
                  ? "text-positive! bg-positive/30!"
                  : isTrendingDown
                    ? "text-negative! bg-negative/30!"
                    : "",
              )}
            >
              {isTrendingUp ? (
                <TrendingUp />
              ) : isTrendingDown ? (
                <TrendingDown />
              ) : (
                ""
              )}
              {formatPercentage(
                coin.market_data.price_change_percentage_24h_in_currency.usd,
              )}
            </Badge>
          </div>
        </div>
        <ul className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-2">
          {coinMarketData.map(({ label, value }, index) => (
            <li
              key={index}
              className="text-sm p-4.5 rounded-md flex flex-col gap-3 bg-bg-primary"
            >
              <p className="font-medium">{label}</p>
              <p className="font-bold">{value}</p>
            </li>
          ))}
        </ul>
        <Separator className="my-6! bg-accent-deep!" />
        <ul className="mt-3 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-2">
          {coinInfoData.map(({ label, value, link, linkText }, index) => (
            <li
              key={index}
              className="text-sm p-4.5 rounded-md flex flex-col gap-3 bg-bg-primary"
            >
              <p className="font-medium">{label}</p>
              {link ? (
                <div className="text-positive flex items-center gap-1.5">
                  <Link
                    className="flex items-center gap-1.5"
                    href={link}
                    target="_blank"
                  >
                    {linkText || label}
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              ) : (
                <p className="font-bold">{value}</p>
              )}
            </li>
          ))}
        </ul>
        <Separator className="my-6! bg-accent-deep!" />
        <CoinConverter
          symbol={coin.symbol}
          icon={coin.image.small}
          priceList={coin.market_data.current_price}
        />
      </section>
      <Separator className="my-6! bg-accent-deep! lg:hidden" />
      <section className="space-y-3 xl:col-span-2">
        <Charts coinId={coin.id} />
        <Separator className="my-6! bg-accent-deep!" />
        <div className="space-y-3">
          <h3 className="font-medium text-xl mb-3">About {coin.name}</h3>
          {coin.description.en
            .split(/\r?\n\s*\r?\n/)
            .filter(Boolean) // Removes empty entries
            .map((value, index) => (
              <p key={index}>{value}</p>
            ))}
        </div>
      </section>
    </main>
  );
};

export default Page;
