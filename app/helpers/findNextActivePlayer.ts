export const findNextActivePlayer = (
  currentPlayerNumber: number,
  numberOfPlayers: number | null,
  winners: number[]
) => {
  let nextPlayerIndex = currentPlayerNumber;
  do {
    nextPlayerIndex = (nextPlayerIndex % numberOfPlayers!) + 1;
  } while (winners.includes(nextPlayerIndex));
  return nextPlayerIndex;
};
