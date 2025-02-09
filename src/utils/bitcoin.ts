
export const fetchBitcoinPrice = async () => {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.bitcoin.usd;
  } catch (error) {
    console.error('Error fetching Bitcoin price:', error);
    throw error;
  }
};

export const fetchHistoricalPrices = async (startDate: Date, endDate: Date) => {
  try {
    const start = Math.floor(startDate.getTime() / 1000);
    const end = Math.floor(endDate.getTime() / 1000);
    
    // Validate date range
    const now = Math.floor(Date.now() / 1000);
    const oneYearAgo = now - (365 * 24 * 60 * 60);
    
    if (start < oneYearAgo) {
      throw new Error('Start date cannot be more than 1 year ago');
    }
    
    if (end > now) {
      throw new Error('End date cannot be in the future');
    }

    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=${start}&to=${end}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.prices;
  } catch (error) {
    console.error('Error fetching historical prices:', error);
    throw error;
  }
};

export const findClosestPrice = (timestamp: number, prices: [number, number][]) => {
  return prices.reduce((closest, current) => {
    const currentDiff = Math.abs(current[0] - timestamp);
    const closestDiff = Math.abs(closest[0] - timestamp);
    return currentDiff < closestDiff ? current : closest;
  })[1];
};
