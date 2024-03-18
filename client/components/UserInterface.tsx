"use client";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

function UserInterface() {
  const [tokens, setTokens] = useState<string[]>(
    JSON.parse(localStorage.getItem("tokens") || "[]")
  );
  const [newToken, setNewToken] = useState<string>("");
  const userTokensData = [] as any;

  const handleAddToken = (newToken: string) => {
    // Prevent empty tokens
    if (newToken.trim()) {
      const newTokens = [...tokens, newToken];
      setTokens(newTokens);
      localStorage.setItem("tokens", JSON.stringify(newTokens));
      setNewToken("");
    }
  };

  const handleRemoveToken = (token: string) => {
    const newTokens = tokens.filter((t) => t !== token);
    setTokens(newTokens);
    localStorage.setItem("tokens", JSON.stringify(newTokens));
  };

  // Run queries for each of the tokens
  const runQueries = () => {
    tokens.forEach((token) => {
      fetchData(token);
    });
  };

  const fetchData = async (token: string) => {
    if (!token) return; // Prevent unnecessary calls without input
    const formattedTokenSymbol = token.replace("/", "%20");
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/${formattedTokenSymbol}`
      );
      const responseData = await response.json();
      console.log(responseData);
      userTokensData.push(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(userTokensData);

  return (
    <div className="flex-col text-center">
      <h1>User Interface</h1>
      <div className="flex items-center gap-4">
        <TextField
          id="outlined-basic"
          label="Search for a token"
          variant="outlined"
          size="small"
          value={newToken}
          onChange={(e) => setNewToken(e.target.value)} // Add this line
        />
        <Button variant="contained" onClick={() => handleAddToken(newToken)}>
          +
        </Button>
      </div>
      <div>
        {tokens && (
          <div>
            <h2>Your Tokens</h2>
            {tokens.map((token: string) => (
              <p key={token} className="flex gap-4 items-center justify-center">
                {token}
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleRemoveToken(token)}
                >
                  -
                </Button>
              </p>
            ))}
          </div>
        )}
      </div>
      <Button onClick={runQueries}>Run</Button>
    </div>
  );
}

export default UserInterface;
