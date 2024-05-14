export type ExchangeRulesType = {
  [animal: string]: {
    tradeFor: {
      [tradeAnimal: string]: number;
    };
  };
};
