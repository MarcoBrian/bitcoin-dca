
export const fetchBitcoinPrice = async () => {
  try {
    const response = await fetch('https://api.coincap.io/v2/assets/bitcoin');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return parseFloat(data.data.priceUsd);
  } catch (error) {
    console.error('Error fetching Bitcoin price:', error);
    throw error;
  }
};

export const fetchHistoricalPrices = async (startDate: Date, endDate: Date) => {
  try {
    const start = startDate.getTime();
    const end = endDate.getTime();
    
    // Only validate that end date is not in the future
    const now = Date.now();
    
    if (end > now) {
      throw new Error('End date cannot be in the future');
    }

    // Fetch historical data from CoinCap API
    const response = await fetch(
      `https://api.coincap.io/v2/assets/bitcoin/history?interval=d1&start=${start}&end=${end}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform the data to match the expected format [timestamp, price]
    const prices = data.data.map((item: { time: number; priceUsd: string; }) => [
      item.time,
      parseFloat(item.priceUsd)
    ]);

    // Filter prices within the requested date range
    return prices.filter(([timestamp]) => 
      timestamp >= startDate.getTime() && timestamp <= endDate.getTime()
    );
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
