import { fetcher } from "@/lib/coingecko.actions";
import { formatCurrency, cn, formatPercentage } from "@/lib/utils";
import TrendingCoins from "@/components/TrendingCoins";
import { TrendingUp, TrendingDown } from "lucide-react";
import ReadMore from "@/components/ReadMore";
import CoinTable from "@/components/CoinTable";
import PaginationControls from "@/components/PaginationControls";
import RowsPerPageSelect from "@/components/RowsPerPageSelect";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { page, perPage } = await searchParams;

  const rowsPerPage = Number(perPage) || 25;
  const currentPage = Number(page) || 1;

  const [trendingCoins, cryptoGlobal, coinMarkets] = await Promise.all([
    fetcher<TrendingCoinData>("search/trending"),
    fetcher<CryptoGlobalData>("global"),
    fetcher<CoinMarketData[]>("coins/markets", {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: rowsPerPage,
      page: currentPage,
      sparkline: false,
      price_change_percentage: "1h,24h,7d",
    }),
  ]);

  const isTrendingUp =
    cryptoGlobal.data.market_cap_change_percentage_24h_usd > 0;
  const isTrendingDown =
    cryptoGlobal.data.market_cap_change_percentage_24h_usd < 0;

  const estimatedTotalPages =
    currentPage >= 100 ? Math.ceil(currentPage / 100) * 100 + 100 : 100;
  const hasMorePages = coinMarkets.length === rowsPerPage;

  return (
    <main className="container px-4.5 py-6 mx-auto space-y-6">
      <section className="space-y-6">
        <div className="space-y-3">
          <h2 className="font-bold text-xl sm:text-2xl md:text-3xl mb-3">
            Top Trending Cryptocurrencies Today
          </h2>
          <p className="text-sm sm:text-base">
            Discover the top trending cryptocurrencies on CoinPulse. This list
            is sorted by coins that are most searched for in the last 3 hours.
          </p>
        </div>
        <TrendingCoins trendingCoins={trendingCoins?.coins ?? []} />
      </section>
      <section className="space-y-6">
        <div className="space-y-3">
          <h1 className="font-bold text-xl sm:text-2xl md:text-3xl mb-3">
            Cryptocurrency Prices by Market Cap
          </h1>
          <ReadMore>
            <p className="text-sm sm:text-base">
              The global cryptocurrency market cap today is{" "}
              <span className="font-medium">
                {formatCurrency(cryptoGlobal.data.total_market_cap.usd)}
              </span>
              , a{" "}
              <span
                className={cn(
                  "font-medium inline-flex items-center gap-1.5",
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
                  Math.abs(
                    cryptoGlobal.data.market_cap_change_percentage_24h_usd,
                  ),
                )}
              </span>{" "}
              change in the last 24 hours.{" "}
            </p>
            <p className="text-sm sm:text-base">
              Total cryptocurrency trading volume in the last day is at{" "}
              <span className="font-medium">
                {formatCurrency(cryptoGlobal.data.total_volume.usd)}
              </span>
              . Bitcoin dominance is at{" "}
              <span className="font-medium">
                {formatPercentage(cryptoGlobal.data.market_cap_percentage.btc)}
              </span>{" "}
              and Ethereum dominance is at{" "}
              <span className="font-medium">
                {formatPercentage(cryptoGlobal.data.market_cap_percentage.eth)}
              </span>
              . CoinGecko is now tracking{" "}
              <span className="font-medium">
                {cryptoGlobal.data.active_cryptocurrencies.toLocaleString(
                  "en-US",
                )}
              </span>{" "}
              cryptocurrencies.
            </p>
          </ReadMore>
        </div>
        <CoinTable coinMarkets={coinMarkets}>
          <div className="flex items-center relative">
            <PaginationControls
              currentPage={currentPage}
              totalPages={estimatedTotalPages}
              hasMorePages={hasMorePages}
            />
            <RowsPerPageSelect />
          </div>
        </CoinTable>
      </section>
    </main>
  );
};

export default Home;
