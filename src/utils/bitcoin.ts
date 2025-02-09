
export const fetchBitcoinPrice = async () => {
  const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
  const data = await response.json();
  return data.bitcoin.usd;
};

export const fetchHistoricalPrices = async (startDate: Date, endDate: Date) => {
  const start = Math.floor(startDate.getTime() / 1000);
  const end = Math.floor(endDate.getTime() / 1000);
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=${start}&to=${end}`
  );
  const data = await response.json();
  return data.prices;
};

export const findClosestPrice = (timestamp: number, prices: [number, number][]) => {
  return prices.reduce((closest, current) => {
    const currentDiff = Math.abs(current[0] - timestamp);
    const closestDiff = Math.abs(closest[0] - timestamp);
    return currentDiff < closestDiff ? current : closest;
  })[1];
};
