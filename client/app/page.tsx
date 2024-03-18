"use client";
import PairInfo from "@/components/PairInfo";
import UserInterface from "@/components/UserInterface";
import { FormLabel, Input, InputLabel, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";

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

function Home() {
  const [data, setData] = useState([]);
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [chainId, setChainId] = useState("");
  const userTokens = Array.from(localStorage.getItem("tokens") || "[]");

  //   const searchParams = new URLSearchParams()

  const fetchData = async () => {
    if (!tokenSymbol) return; // Prevent unnecessary calls without input
    const formattedTokenSymbol = tokenSymbol.replace("/", "%20");
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/${formattedTokenSymbol}`
      );
      const responseData = await response.json();
      setData(responseData?.pairs);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTokenChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTokenSymbol(event.target.value);
  };

  const handleChainChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setChainId(event.target.value);
  };

  return (
    <main className="flex min-h-screen flex-col items-center ">
      <h1>ApeScreener</h1>
      <div className="flex gap-4 items-center">
        <label htmlFor="tokenSymbol">Token/Pair: </label>
        <TextField
          variant="outlined"
          type="text"
          id="tokenSymbol"
          value={tokenSymbol}
          onChange={handleTokenChange}
          size="small"
        />
        <Button variant="contained" onClick={fetchData} disabled={!tokenSymbol}>
          Search
        </Button>
      </div>
      <UserInterface />

      <div>
        {data &&
          data.map((pair: PairData) => {
            return <PairInfo key={pair.pairAddress} {...pair} />;
          })}
      </div>
      {/* <div>
        <label htmlFor="chainId">Chain ID: </label>
        <input type="text" id="chainId" value={chainId} onChange={handleChainChange} style={{ color: "black" }} />
      </div> */}
    </main>
  );
}

export default Home;
