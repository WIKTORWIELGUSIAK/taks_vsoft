export const rollDice = (dice: string[]): string => {
  const index = Math.floor(Math.random() * dice.length);
  return dice[index];
};
