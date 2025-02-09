
export const fetchBitcoinPrice = async () => {
  try {
    const response = await fetch('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.USD;
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

    // Get daily historical data
    const response = await fetch(
      `https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&toTs=${end}&limit=365`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform the data to match the expected format [timestamp, price]
    const prices = data.Data.Data.map((item: { time: number; close: number; }) => [
      item.time * 1000, // Convert to milliseconds
      item.close
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
