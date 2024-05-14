import { PlayerData } from "@/types/PlayerDataType";

export const handleWolf = (playerData: PlayerData) => {
  if (playerData.animals.bigDog > 0) {
    playerData.animals.bigDog--;
  } else {
    playerData.animals.sheep = 0;
    playerData.animals.pig = 0;
    playerData.animals.cow = 0;
  }
};
