export const handleAnimalAddition = (result: string) => {
  if (
    ["rabbit", "sheep", "pig", "cow", "horse"].includes(result) &&
    (playerData.animals[result] > 0 || result1 === result2)
  ) {
    playerData.animals[result] += 1;
  }
};
