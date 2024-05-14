import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { translateAnimal } from "../app/helpers/translateAnimal";

interface ExchangeRules {
  [key: string]: {
    tradeFor: {
      [key: string]: number;
    };
  };
}

const exchangeRules: ExchangeRules = {
  rabbit: { tradeFor: { sheep: 6 } },
  sheep: { tradeFor: { rabbit: 1 / 6, pig: 2, smallDog: 1 } },
  pig: { tradeFor: { sheep: 1 / 2, cow: 3 } },
  cow: { tradeFor: { pig: 1 / 3, horse: 2, bigDog: 1 } },
  horse: { tradeFor: { cow: 1 / 2 } },
  smallDog: { tradeFor: { sheep: 1 } },
  bigDog: { tradeFor: { cow: 1 } },
};

const getAvailableExchanges = (animal: string): string[] => {
  const trades = exchangeRules[animal]?.tradeFor;
  if (!trades) {
    return [];
  }
  return Object.keys(trades);
};

interface PlayerData {
  playerNumber: number;
  animals: { [key: string]: number };
}

interface PlayerPanelProps {
  playerData: PlayerData;
  onRollDice: () => void;
  onExchange: (
    playerNumber: number,
    fromAnimal: string,
    toAnimal: string
  ) => void;
  active: boolean;
}

export const PlayerPanel: React.FC<PlayerPanelProps> = ({
  playerData,
  onRollDice,
  onExchange,
  active,
}) => {
  const [fromAnimal, setFromAnimal] = useState<string>("rabbit");
  const [toAnimal, setToAnimal] = useState<string>("sheep");

  const availableExchanges = getAvailableExchanges(fromAnimal);

  const animals = Object.keys(playerData.animals);
  const halfIndex = Math.ceil(animals.length / 2);

  return (
    <div
      className={`transition-opacity duration-300 ${
        active ? "opacity-100" : "opacity-50"
      } overflow-hidden`}
    >
      <h3 className="text-lg font-bold text-center mb-2">
        Panel Gracza {playerData.playerNumber}
      </h3>

      <div className="flex flex-wrap mt-4">
        <div className="w-1/2">
          {animals.slice(0, halfIndex).map((animal) => (
            <p key={animal} className="text-sm p-2 text-center">
              <span className="font-semibold capitalize">
                {translateAnimal(animal)}:
              </span>{" "}
              {playerData.animals[animal]}
            </p>
          ))}
        </div>
        <div className="w-1/2">
          {animals.slice(halfIndex).map((animal) => (
            <p key={animal} className="text-sm p-2 text-center">
              <span className="font-semibold capitalize">
                {translateAnimal(animal)}:
              </span>{" "}
              {playerData.animals[animal]}
            </p>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center mt-4 space-y-4">
        <div className="flex w-full justify-center items-center space-x-2 gap-5">
          <div className="w-full px-2">
            <Label className="font-medium text-sm">Co chcesz wymienić:</Label>
            <Select onValueChange={setFromAnimal} disabled={!active}>
              <SelectTrigger className="border border-gray-300 rounded p-2 shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 capitalize">
                <SelectValue placeholder="Wybierz zwierzę" />
              </SelectTrigger>
              <SelectContent>
                {animals.map((animal) => (
                  <SelectItem
                    key={animal}
                    value={animal}
                    className="capitalize"
                  >
                    {translateAnimal(animal)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full px-2">
            <Label className="font-medium text-sm">
              Na co chcesz wymienić:
            </Label>
            <Select onValueChange={setToAnimal} disabled={!active}>
              <SelectTrigger className="border border-gray-300 rounded p-2 shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 capitalize">
                <SelectValue placeholder="Wybierz zwierzę" />
              </SelectTrigger>
              <SelectContent className="capitalize">
                {availableExchanges.map((animal) => (
                  <SelectItem key={animal} value={animal}>
                    {translateAnimal(animal)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button
          onClick={() =>
            onExchange(playerData.playerNumber, fromAnimal, toAnimal)
          }
          disabled={!active}
          className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Wymień
        </Button>
        <Button
          onClick={onRollDice}
          disabled={!active}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300 w-full"
        >
          Rzuć kośćmi
        </Button>
      </div>
    </div>
  );
};
