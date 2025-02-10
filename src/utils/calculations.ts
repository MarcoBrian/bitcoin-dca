
import { addDays, addWeeks, addMonths } from "date-fns";
import { Period } from "../types/calculator";
import { findClosestPrice } from "./bitcoin";

export const getInvestmentDates = (start: Date, end: Date, periodType: Period): Date[] => {
  const dates: Date[] = [];
  let currentDate = new Date(start);

  while (currentDate <= end) {
    dates.push(new Date(currentDate));
    switch (periodType) {
      case "daily":
        currentDate = addDays(currentDate, 1);
        break;
      case "weekly":
        currentDate = addWeeks(currentDate, 1);
        break;
      case "monthly":
        currentDate = addMonths(currentDate, 1);
        break;
      case "one-time":
        currentDate = new Date(end.getTime() + 1);
        break;
    }
  }
  return dates;
};

export const calculateInvestmentResults = (
  startDate: Date,
  endDate: Date,
  investmentAmount: number,
  period: Period,
  bitcoinPrice: number,
  historicalPrices: [number, number][]
) => {
  const investmentDates = getInvestmentDates(startDate, endDate, period);
  
  let totalBitcoin = 0;
  let totalInvested = 0;

  investmentDates.forEach(date => {
    const timestamp = date.getTime();
    const historicalPrice = findClosestPrice(timestamp, historicalPrices);
    
    const btcPurchased = investmentAmount / historicalPrice;
    totalBitcoin += btcPurchased;
    totalInvested += investmentAmount;
  });

  const currentValue = totalBitcoin * bitcoinPrice;
  const roi = ((currentValue - totalInvested) / totalInvested) * 100;
  const averageBuyPrice = totalInvested / totalBitcoin;

  return {
    totalInvested,
    estimatedBitcoin: totalBitcoin,
    currentValue,
    roi,
    averageBuyPrice
  };
};
