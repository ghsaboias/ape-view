import React from "react";

interface PairData {
  baseToken: {
    address: string;
    name: string;
    symbol: string;
  };
  chainId: string;
  dexId: string;
  fdv: number;
  liquidity: {
    base: number;
    quote: number;
    usd: number;
  };
  pairAddress: string;
  priceChange: {
    h1: number;
    h24: number;
    h6: number;
    m5: number;
  };
  priceNative: string;
  priceUsd: string;
  quoteToken: {
    address: string;
    name: string;
    symbol: string;
  };
  txns: {
    h1: { buys: number; sells: number };
    h24: { buys: number; sells: number };
    h6: { buys: number; sells: number };
    m5: { buys: number; sells: number };
  };
  url: string;
  volume: {
    h1: number;
    h24: number;
    h6: number;
    m5: number;
  };
}

const PairInfo: React.FC<PairData> = (data) => {
  return (
    <div className="pair-info">
      <h2>
        {data.baseToken.symbol} - {data.quoteToken.symbol} ({data.chainId})
      </h2>
      <p>
        Price: {data.priceUsd} USD ({data.priceChange.h24}% change in 24h)
      </p>
      <p>
        Liquidity: ${data.liquidity.usd.toFixed(2)} (USD)
      </p>
      <p>
        Volume (24h): ${data.volume.h24.toFixed(2)} (USD)
      </p>
      <a href={data.url} target="_blank" rel="noopener noreferrer">
        View on Dexscreener
      </a>
    </div>
  );
};

export default PairInfo;
