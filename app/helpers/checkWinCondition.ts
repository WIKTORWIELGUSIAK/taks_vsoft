import { PlayerData } from "@/types/PlayerDataType";

const requiredAnimals = ["rabbit", "sheep", "pig", "cow", "horse"];

export const checkWinCondition = (playerData: PlayerData) => {
  return requiredAnimals.every((animal) => playerData.animals[animal] > 0);
};
