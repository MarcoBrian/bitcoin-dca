
import { useState } from 'react';
import { Bitcoin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { DateSelection } from "./calculator/DateSelection";
import { InvestmentDetails } from "./calculator/InvestmentDetails";
import { Results } from "./calculator/Results";
import { InvestmentChart } from "./calculator/InvestmentChart";
import { fetchBitcoinPrice, fetchHistoricalPrices } from "@/utils/bitcoin";
import { calculateInvestmentResults } from "@/utils/calculations";
import type { CalculationResult, Period } from "@/types/calculator";

const DCACalculator = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [amount, setAmount] = useState<string>('100');
  const [period, setPeriod] = useState<Period>("monthly");
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);

  const { data: bitcoinPrice, isLoading: isPriceLoading } = useQuery({
    queryKey: ['bitcoinPrice'],
    queryFn: fetchBitcoinPrice,
    refetchInterval: 60000, // Refresh every minute
  });

  const { data: historicalPrices, isLoading: isHistoricalLoading } = useQuery({
    queryKey: ['historicalPrices', startDate?.getTime(), endDate?.getTime()],
    queryFn: () => startDate && endDate ? fetchHistoricalPrices(startDate, endDate) : null,
    enabled: !!startDate && !!endDate,
  });

  const handleCalculate = () => {
    if (!startDate || !endDate || !amount || !bitcoinPrice || !historicalPrices) return;

    const result = calculateInvestmentResults(
      startDate,
      endDate,
      parseFloat(amount),
      period,
      bitcoinPrice,
      historicalPrices
    );

    setCalculationResult(result);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="retro-card space-y-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold tracking-tight">Bitcoin DCA Calculator</h2>
          <Bitcoin className="w-8 h-8 text-retro-orange animate-glow" />
        </div>

        <div className="p-4 border border-retro-orange/20 rounded-md bg-black/20">
          <p className="text-sm opacity-80">Current Bitcoin Price</p>
          <p className="text-xl font-bold">
            {isPriceLoading ? (
              "Loading..."
            ) : (
              `$${bitcoinPrice?.toLocaleString() ?? "Error"}`
            )}
          </p>
        </div>

        <div className="space-y-4">
          <DateSelection
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />

          <InvestmentDetails
            amount={amount}
            setAmount={setAmount}
            period={period}
            setPeriod={setPeriod}
          />

          <button
            onClick={handleCalculate}
            disabled={isHistoricalLoading}
            className="retro-button w-full mt-6"
          >
            {isHistoricalLoading ? "Loading Historical Data..." : "Calculate Returns"}
          </button>

          {calculationResult && <Results result={calculationResult} />}
          
          {startDate && endDate && historicalPrices && amount && (
            <InvestmentChart
              startDate={startDate}
              endDate={endDate}
              amount={parseFloat(amount)}
              period={period}
              historicalPrices={historicalPrices}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DCACalculator;
