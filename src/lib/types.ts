export type Holding = {
  shortName: string
  longName: string;
  purchasePrice: number;
  quantity: number;
  investment: number; // (purchasePrice * Quantity)
  portfolioPercentage: number;
  exchange: string;
  cmp: number;
  presentValue: number; // (cmp * qty)
  gainLoss: number; //(presentValue - investment)
  peRatio: number;
  latestEarnings: number;
  sector: string;
};
