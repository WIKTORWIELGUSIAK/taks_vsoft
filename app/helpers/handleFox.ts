import { PlayerData } from "@/types/PlayerDataType";

export const handleFox = (playerData: PlayerData) => {
  if (playerData.animals.smallDog > 0) {
    playerData.animals.smallDog--;
  } else {
    if (playerData.animals.rabbit > 1) {
      playerData.animals.rabbit = 1;
    }
  }
};
