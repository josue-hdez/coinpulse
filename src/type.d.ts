type QueryParams = Record<string, string | number | boolean | undefined>;

type Period = "daily" | "weekly" | "monthly" | "3months" | "6months" | "yearly";

type PriceData = [number, number];

type OHLCData = [number, number, number, number, number];

type TrendingCoin = {
  item: {
    id: string;
    name: string;
    symbol: string;
    large: string;
    data: {
      price_change_percentage_24h: {
        usd: number;
      };
    };
  };
};

type SearchCoin = {
  id: string;
  name: string;
  symbol: string;
  large: string;
  data: {
    price_change_percentage_24h: number;
  };
};

interface CoinGeckoErrorBody {
  error?: string;
}

interface CryptoGlobalData {
  data: {
    active_cryptocurrencies: number;
    total_market_cap: {
      usd: number;
    };
    total_volume: {
      usd: number;
    };
    market_cap_percentage: {
      btc: number;
      eth: number;
    };
    market_cap_change_percentage_24h_usd: number;
    volume_change_percentage_24h_usd: number;
  };
}

interface CoinMarketData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
}

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  image: {
    large: string;
    small: string;
  };
  market_data: {
    current_price: {
      usd: number;
      [key: string]: number;
    };
    price_change_percentage_24h_in_currency: {
      usd: number;
    };
    market_cap: {
      usd: number;
    };
    total_volume: {
      usd: number;
    };
    fully_diluted_valuation: {
      usd: number;
    };
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
  };
  market_cap_rank: number;
  description: {
    en: string;
  };
  links: {
    homepage: string[];
    blockchain_site: string[];
    subreddit_url: string;
    whitepaper: string;
  };
}

interface CoinMarketChartData {
  prices: PriceData[];
}

interface TrendingCoinData {
  coins: TrendingCoin[];
}

interface SearchData {
  coins: SearchCoin[];
}
