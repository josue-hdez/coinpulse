"use server";

import qs from "query-string";

const BASE_URL = process.env.COINGECKO_BASE_URL;
const API_KEY = process.env.COINGECKO_API_KEY;

if (!BASE_URL)
  throw new Error(
    "Missing environment variable: COINGECKO_BASE_URL. Please add it to your environment configuration (e.g., .env.local).",
  );

if (!API_KEY)
  throw new Error(
    "Missing environment variable: COINGECKO_API_KEY. Please add your CoinGecko API key to .env.local or your deployment environment.",
  );

export const fetcher = async <T>(
  endpoint: string,
  params?: QueryParams,
  revalidate = 60,
): Promise<T> => {
  const url = qs.stringifyUrl(
    {
      url: `${BASE_URL}/${endpoint}`,
      query: params,
    },
    { skipEmptyString: true, skipNull: true },
  );

  const response = await fetch(url, {
    headers: {
      "x-cg-demo-api-key": API_KEY,
      "Content-Type": "application/json",
    } as Record<string, string>,
    next: { revalidate },
  });

  if (!response.ok) {
    let errorMessage = response.statusText;

    try {
      const errorBody: CoinGeckoErrorBody = await response.json();

      if (errorBody?.error) {
        errorMessage = errorBody.error;
      }
    } catch {
      // ignore JSON parsing errors
    }

    throw new Error(
      `CoinGecko API request failed (${response.status}). Endpoint: "${endpoint}". URL: ${url}. Message: ${errorMessage}`,
    );
  }

  return response.json();
};
