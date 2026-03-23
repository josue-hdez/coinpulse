import { fetcher } from "@/lib/coingecko.actions";
import Link from "next/link";
import Image from "next/image";
import { SearchModal } from "./SearchModal";

const Header = async () => {
  const trendingCoins = await fetcher<TrendingCoinData>("search/trending");

  return (
    <header className="h-24 border-b border-accent-deep">
      <div className="container h-full px-4.5 mx-auto flex justify-between items-center">
        <Link href="/">
          <Image
            src="/assets/logo.svg"
            alt="CoinPulse logo"
            width={122}
            height={30}
            loading="eager"
          />
        </Link>
        <SearchModal initialTrendingCoins={trendingCoins?.coins ?? []} />
      </div>
    </header>
  );
};

export default Header;
