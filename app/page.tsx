"use client";
import React, { useEffect, useState } from "react";
import { PlayerPanel } from "../components/PlayerPanel";
import { PlayerSelection } from "../components/PlayerSelection";
import { Button } from "@/components/ui/button";
import { PlayerData } from "@/types/PlayerDataType";
import { checkWinCondition } from "./helpers/checkWinCondition";
import { rollDice } from "./helpers/rollDice";
import { findNextActivePlayer } from "./helpers/findNextActivePlayer";
import { dice1, dice2 } from "@/constants";
import { handleFox } from "./helpers/handleFox";
import { handleWolf } from "./helpers/handleWolf";
import { ExchangeRulesType } from "@/types/ExchangeRulesType";

const exchangeRules: ExchangeRulesType = {
  rabbit: { tradeFor: { sheep: 6 } },
  sheep: { tradeFor: { rabbit: 1 / 6, pig: 2, smallDog: 1 } },
  pig: { tradeFor: { sheep: 1 / 2, cow: 3 } },
  cow: { tradeFor: { pig: 1 / 3, horse: 2, bigDog: 1 } },
  horse: { tradeFor: { cow: 1 / 2 } },
  smallDog: { tradeFor: { sheep: 1 } },
  bigDog: { tradeFor: { cow: 1 } },
};

const Game: React.FC = () => {
  const [numberOfPlayers, setNumberOfPlayers] = useState<number | null>(null);
  const [playersData, setPlayersData] = useState<PlayerData[]>([]);
  const [activePlayer, setActivePlayer] = useState<number>(1);
  const [winners, setWinners] = useState<number[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    if (numberOfPlayers !== null && winners.length + 1 >= numberOfPlayers) {
      setGameOver(true);
    }
  }, [numberOfPlayers, winners.length]);

  const initializePlayers = (num: number) => {
    const initialData = Array.from({ length: num }, (_, i) => ({
      playerNumber: i + 1,
      animals: {
        rabbit: 1,
        sheep: 0,
        pig: 0,
        cow: 0,
        horse: 0,
        smallDog: 0,
        bigDog: 0,
      },
      isWinner: false,
    }));
    setPlayersData(initialData);
  };

  const resetGame = () => {
    setNumberOfPlayers(null);
    setPlayersData([]);
    setActivePlayer(1);
    setWinners([]);
    setGameOver(false);
  };

  const handleRollDice = (playerNumber: number) => {
    if (!playersData.find((p) => p.playerNumber === playerNumber)!.isWinner) {
      const result1 = rollDice(dice1);
      const result2 = rollDice(dice2);
      updateAnimals(playerNumber, result1, result2);

      const playerData = playersData.find(
        (p) => p.playerNumber === playerNumber
      )!;
      const hasWon = checkWinCondition(playerData);

      if (hasWon) {
        alert(`Player ${playerNumber} has won!`);
        setWinners((prevWinners) => [...prevWinners, playerNumber]);
      }

      const nextPlayer = findNextActivePlayer(
        playerNumber,
        numberOfPlayers,
        winners
      );
      setActivePlayer(nextPlayer);
    }
  };

  const updateAnimals = (
    playerNumber: number,
    result1: string,
    result2: string
  ) => {
    const playerData = playersData.find(
      (p) => p.playerNumber === playerNumber
    )!;

    const handleAnimalAddition = (result: string) => {
      if (
        ["rabbit", "sheep", "pig", "cow", "horse"].includes(result) &&
        (playerData.animals[result] > 0 || result1 === result2)
      ) {
        playerData.animals[result] += 1;
      }
    };

    handleAnimalAddition(result1);
    if (result1 !== result2) {
      handleAnimalAddition(result2);
    }

    if (result1 === "fox" || result2 === "fox") {
      handleFox(playerData);
    }
    if (result1 === "wolf" || result2 === "wolf") {
      handleWolf(playerData);
    }

    setPlayersData([...playersData]);
  };

  const handleExchange = (
    playerNumber: number,
    fromAnimal: string,
    toAnimal: string
  ) => {
    const playerIndex = playersData.findIndex(
      (p) => p.playerNumber === playerNumber
    );
    const playerData = playersData[playerIndex];
    const rule = exchangeRules[fromAnimal]?.tradeFor[toAnimal];

    if (!rule) {
      alert("Invalid trade");
      return;
    }

    const requiredFrom = rule >= 1 ? Math.ceil(rule) : 1;
    const toReceive = rule >= 1 ? 1 : Math.floor(1 / rule);

    if (playerData.animals[fromAnimal] >= requiredFrom) {
      playerData.animals[fromAnimal] -= requiredFrom;
      playerData.animals[toAnimal] += toReceive;

      alert(
        `Exchanged ${requiredFrom} ${fromAnimal} for ${toReceive} ${toAnimal}`
      );

      const hasWon = checkWinCondition(playerData);

      setPlayersData([...playersData]);

      if (hasWon) {
        setTimeout(() => {
          alert(`Player ${playerNumber} has won!`);
          setWinners((prevWinners) => [...prevWinners, playerNumber]);

          const nextPlayer = findNextActivePlayer(
            playerNumber,
            numberOfPlayers,
            winners
          );
          setActivePlayer(nextPlayer);
        }, 0);
      }
    } else {
      alert("Not enough animals to trade");
    }

    if (numberOfPlayers !== null && winners.length + 1 >= numberOfPlayers) {
      setGameOver(true);
    }
  };

  if (gameOver) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75">
        <h1 className="text-4xl text-white mb-4">Gra została zakończona!</h1>
        <Button
          onClick={resetGame}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Resetuj grę
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] px-4 mx-auto">
      {!numberOfPlayers ? (
        <PlayerSelection
          onSelect={(num) => {
            const parsedNum = parseInt(num, 10);
            setNumberOfPlayers(parsedNum);
            initializePlayers(parsedNum);
            setActivePlayer(1);
          }}
        />
      ) : (
        <div>
          <h1 className="text-center text-2xl font-bold mb-4">Super Farmer!</h1>
          <div className="flex justify-end mb-4">
            <Button
              onClick={resetGame}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Resetuj grę
            </Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {playersData.map((player) => (
              <PlayerPanel
                key={player.playerNumber}
                playerData={player}
                onRollDice={() => handleRollDice(player.playerNumber)}
                onExchange={handleExchange}
                active={activePlayer === player.playerNumber}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
