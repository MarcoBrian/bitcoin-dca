
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { findClosestPrice } from "@/utils/bitcoin";
import { getInvestmentDates } from "@/utils/calculations";
import { Period } from "@/types/calculator";

interface InvestmentChartProps {
  startDate: Date;
  endDate: Date;
  amount: number;
  period: Period;
  historicalPrices: [number, number][];
}

export const InvestmentChart = ({ startDate, endDate, amount, period, historicalPrices }: InvestmentChartProps) => {
  const investmentDates = getInvestmentDates(startDate, endDate, period);
  
  const chartData = investmentDates.map((date, index) => {
    const timestamp = date.getTime();
    const price = findClosestPrice(timestamp, historicalPrices);
    let totalBitcoin = 0;
    
    // Calculate cumulative Bitcoin owned up to this point
    for (let i = 0; i <= index; i++) {
      const historicalPrice = findClosestPrice(investmentDates[i].getTime(), historicalPrices);
      totalBitcoin += amount / historicalPrice;
    }
    
    return {
      date: date.toLocaleDateString(),
      bitcoinOwned: totalBitcoin,
      value: totalBitcoin * price
    };
  });

  return (
    <div className="mt-8 border border-retro-orange/20 rounded-md p-4 bg-black/20">
      <h3 className="text-xl font-bold mb-4">Investment Growth</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis 
              dataKey="date" 
              stroke="#888888"
              tickLine={false}
              tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { month: 'short' })}
            />
            <YAxis
              stroke="#888888"
              tickLine={false}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
              yAxisId="value"
            />
            <YAxis
              stroke="#888888"
              tickLine={false}
              tickFormatter={(value) => `₿${value.toFixed(8)}`}
              orientation="right"
              yAxisId="bitcoin"
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-background/95 border border-border p-2 rounded-lg shadow-xl">
                      <p className="text-sm text-muted-foreground">{payload[0].payload.date}</p>
                      <p className="font-bold">₿{payload[0].payload.bitcoinOwned.toFixed(8)}</p>
                      <p className="font-bold">${payload[0].payload.value.toLocaleString()}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#0EA5E9"
              yAxisId="value"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="bitcoinOwned"
              stroke="#9b87f5"
              yAxisId="bitcoin"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
