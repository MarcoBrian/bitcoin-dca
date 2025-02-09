
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PERIODS } from "@/types/calculator";
import type { Period } from "@/types/calculator";

interface InvestmentDetailsProps {
  amount: string;
  setAmount: (amount: string) => void;
  period: Period;
  setPeriod: (period: Period) => void;
}

export const InvestmentDetails = ({
  amount,
  setAmount,
  period,
  setPeriod
}: InvestmentDetailsProps) => {
  return (
    <>
      <div className="space-y-2">
        <label className="block text-sm">Investment Amount (USD)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="retro-input w-full"
          placeholder="Enter amount"
          min="0"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm">Investment Period</label>
        <Select value={period} onValueChange={(value) => setPeriod(value as Period)}>
          <SelectTrigger className="retro-input w-full">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent className="bg-black/90 border-retro-orange/30">
            {PERIODS.map((p) => (
              <SelectItem 
                key={p.value} 
                value={p.value}
                className="text-retro-orange hover:bg-retro-orange/20"
              >
                {p.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
