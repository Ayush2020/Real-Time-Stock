import { holdings } from "@/app/data/portfolio";
import { Holding } from "@/lib/types";

import yahooFinance from "yahoo-finance2";

// const quotes = holdings.map((item) => item.stockName);

export async function GET() {
  // console.log("I am here");

  const promiseArray = [];
  for (let i = 0; i < holdings.length; i++) {
    // console.log(i);
    const holdItem = holdings[i];
    // console.log(quote)
    const apiPromise = yahooFinance.quote(
      `${
        holdItem.targetExchange
          ? holdItem.stockName + "." + holdItem.targetExchange
          : holdItem.stockName
      }`
    );
    promiseArray.push(apiPromise);
    // console.log("promise ready for quote:" + holdItem.stockName);
  }
  const response = await Promise.all(promiseArray);
  console.log(`response: ${JSON.stringify(response, null, 2)}`);
  const finalData: Holding[] = [];
  response.forEach((item) => {
    // const stockSymbol = holdItem.targetExchange
    //       ? holdItem.stockName + "." + holdItem.targetExchange
    //       : holdItem.stockName
    const holdingObject = holdings.find(
      (holdingItem) =>
        (holdingItem.targetExchange
          ? holdingItem.stockName + ".NS"
          : holdingItem.stockName) === item?.symbol
    )!;
    if (holdingObject) {
      const cmp = item.regularMarketPrice || 0;
      const investment = holdingObject.purchasePrice * holdingObject.quantity;
      const presentValue = cmp ? cmp * holdingObject.quantity : 0;
      const gainLoss = presentValue - investment;
      const sector = holdingObject.sector;
      const exchange = item.fullExchangeName;
      const latestEarnings = 0;
      const peRatio = item.priceEpsCurrentYear || 0;
      const quantity = holdingObject.quantity;
      const purchasePrice = holdingObject.purchasePrice;
      const portfolioPercentage = 0;
      const longName = item.longName || holdingObject.stockName;
      const shortName = holdingObject.stockName;

      finalData.push({
        cmp,
        investment,
        presentValue,
        gainLoss,
        exchange,
        latestEarnings,
        quantity,
        purchasePrice,
        sector,
        portfolioPercentage,
        longName,
        shortName,
        peRatio,
      } as Holding);
    }
  });
  // console.log("finalData", JSON.stringify(finalData, null, 2));

  return new Response(JSON.stringify(finalData || []));
}
