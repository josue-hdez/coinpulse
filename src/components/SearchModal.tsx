"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useKey, useDebounce } from "react-use";
import useSWR from "swr";
import { searchCoins } from "@/lib/coingecko.actions";
import { cn, formatPercentage } from "@/lib/utils";
import Image from "next/image";
import { TrendingUp, TrendingDown, Search as SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  CommandDialog,
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
} from "./ui/command";

const TRENDING_LIMIT = 10;
const SEARCH_LIMIT = 10;

const SearchItem = ({
  coin,
  onSelect,
}: {
  coin: TrendingCoin["item"] | SearchCoin;
  onSelect: (coinId: string) => void;
}) => {
  const isSearchCoin =
    typeof coin.data?.price_change_percentage_24h === "number";

  const change = isSearchCoin
    ? ((coin as SearchCoin).data?.price_change_percentage_24h ?? 0)
    : ((coin as TrendingCoin["item"]).data.price_change_percentage_24h?.usd ??
      0);

  return (
    <CommandItem
      className="cursor-pointer"
      value={coin.id}
      onSelect={() => onSelect(coin.id)}
    >
      <div className="w-full flex items-center gap-3">
        <Image
          className="w-auto h-auto rounded-full"
          src={coin.large}
          alt={coin.name}
          width={30}
          height={30}
        />
        <div className="max-w-30 xs:max-w-45 space-y-0.5">
          <h3 className="font-medium truncate">{coin.name}</h3>
          <p className="text-xs text-text-muted">{coin.symbol.toUpperCase()}</p>
        </div>
      </div>
      <div
        className={cn(
          "font-medium flex justify-end items-center gap-1.5",
          change > 0 ? "text-positive" : change < 0 ? "text-negative" : "",
        )}
      >
        {change > 0 ? (
          <TrendingUp className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        ) : change < 0 ? (
          <TrendingDown className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        ) : null}
        <span>{formatPercentage(Math.abs(change))}</span>
      </div>
    </CommandItem>
  );
};

export const SearchModal = ({
  initialTrendingCoins = [],
}: {
  initialTrendingCoins: TrendingCoin[];
}) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const router = useRouter();

  useKey(
    (event) => event.key?.toLowerCase() === "/",
    (event) => {
      event.preventDefault();
      setOpen((prev) => !prev);
    },
    {},
    [setOpen],
  );

  useDebounce(
    () => {
      setDebouncedQuery(searchQuery.trim());
    },
    300,
    [searchQuery],
  );

  const { data: searchResults = [], isValidating: isSearching } = useSWR<
    SearchCoin[]
  >(
    debouncedQuery ? ["coin-search", debouncedQuery] : null,
    ([, query]) => searchCoins(query as string),
    {
      revalidateOnFocus: false,
    },
  );

  const handleSelect = (coinId: string) => {
    setOpen(false);
    setSearchQuery("");
    setDebouncedQuery("");
    router.push(`/coins/${coinId}`);
  };

  const hasQuery = debouncedQuery.length > 0;
  const trendingCoins = initialTrendingCoins.slice(0, TRENDING_LIMIT);
  const showTrending = !hasQuery && trendingCoins.length > 0;
  const isTrendingListVisible = !isSearching && showTrending;
  const isResultsVisible = !isSearching && hasQuery && searchResults.length > 0;
  const isSearchEmpty = !isSearching && !hasQuery && !showTrending;
  const isNoResults = !isSearching && hasQuery && searchResults.length === 0;

  return (
    <div>
      <Button
        className="text-white w-36 h-10.5 px-3 bg-bg-primary cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <SearchIcon />
        Search
        <kbd className="text-xs py-1.5 px-2.5 rounded-md ml-auto bg-bg-secondary">
          /
        </kbd>
      </Button>
      <CommandDialog data-search-modal open={open} onOpenChange={setOpen}>
        <Command>
          <div>
            <CommandInput
              placeholder="Search for a token by name or symbol"
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
          </div>
          <CommandList>
            {isTrendingListVisible && (
              <CommandGroup heading="Trending Coins">
                {trendingCoins.map(({ item }) => (
                  <SearchItem
                    key={item.id}
                    coin={item}
                    onSelect={handleSelect}
                  />
                ))}
              </CommandGroup>
            )}
            {isResultsVisible && (
              <CommandGroup heading="Search Results">
                {searchResults.slice(0, SEARCH_LIMIT).map((coin) => (
                  <SearchItem
                    key={coin.id}
                    coin={coin}
                    onSelect={handleSelect}
                  />
                ))}
              </CommandGroup>
            )}
            {isSearching && (
              <div className="text-center py-6">Searching...</div>
            )}
            {isSearchEmpty && (
              <div className="text-center py-6">Type to search for coins.</div>
            )}
            {isNoResults && <CommandEmpty>No results found.</CommandEmpty>}
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
};
