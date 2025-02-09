
import { CalculationResult } from "@/types/calculator";

interface ResultsProps {
  result: CalculationResult;
}

export const Results = ({ result }: ResultsProps) => {
  return (
    <div className="mt-8 space-y-4 border border-retro-orange/20 rounded-md p-4 bg-black/20">
      <h3 className="text-xl font-bold mb-4">Investment Summary</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm opacity-80">Total Invested</p>
          <p className="text-lg font-bold">${result.totalInvested.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm opacity-80">Current Value</p>
          <p className="text-lg font-bold">${result.currentValue.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm opacity-80">Estimated Bitcoin</p>
          <p className="text-lg font-bold">{result.estimatedBitcoin.toFixed(8)} BTC</p>
        </div>
        <div>
          <p className="text-sm opacity-80">Return on Investment</p>
          <p className={`text-lg font-bold ${result.roi >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {result.roi.toFixed(2)}%
          </p>
        </div>
        <div className="col-span-2">
          <p className="text-sm opacity-80">Average Buy Price</p>
          <p className="text-lg font-bold">${result.averageBuyPrice.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};
