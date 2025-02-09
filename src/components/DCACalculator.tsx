
import { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Bitcoin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const PERIODS = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "one-time", label: "One Time Purchase" },
];

const fetchBitcoinPrice = async () => {
  const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
  const data = await response.json();
  return data.bitcoin.usd;
};

const DCACalculator = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [amount, setAmount] = useState<string>('100');
  const [period, setPeriod] = useState<string>("monthly");

  const { data: bitcoinPrice, isLoading: isPriceLoading } = useQuery({
    queryKey: ['bitcoinPrice'],
    queryFn: fetchBitcoinPrice,
    refetchInterval: 60000, // Refresh every minute
  });

  const handleCalculate = () => {
    if (!startDate || !endDate || !amount) return;
    // Calculation logic will be implemented in the next iteration
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="retro-card space-y-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Bitcoin DCA Calculator</h2>
          <Bitcoin className="w-8 h-8 text-retro-green animate-glow" />
        </div>

        <div className="space-y-4">
          {/* Date Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm">Start Date</label>
              <Popover>
                <PopoverTrigger className="retro-input w-full flex items-center justify-between">
                  {startDate ? format(startDate, "PPP") : "Select date"}
                  <CalendarIcon className="h-4 w-4 opacity-50" />
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-black/90 border-retro-green/30">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    disabled={(date) => date > new Date() || (endDate ? date > endDate : false)}
                    className="bg-transparent"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="block text-sm">End Date</label>
              <Popover>
                <PopoverTrigger className="retro-input w-full flex items-center justify-between">
                  {endDate ? format(endDate, "PPP") : "Select date"}
                  <CalendarIcon className="h-4 w-4 opacity-50" />
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-black/90 border-retro-green/30">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    disabled={(date) => date > new Date() || (startDate ? date < startDate : false)}
                    className="bg-transparent"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Amount Input */}
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

          {/* Period Selection */}
          <div className="space-y-2">
            <label className="block text-sm">Investment Period</label>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="retro-input w-full">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent className="bg-black/90 border-retro-green/30">
                {PERIODS.map((p) => (
                  <SelectItem key={p.value} value={p.value} className="text-retro-green hover:bg-retro-green/20">
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Current Bitcoin Price */}
          <div className="p-4 border border-retro-green/20 rounded-md bg-black/20">
            <p className="text-sm opacity-80">Current Bitcoin Price</p>
            <p className="text-xl font-bold">
              {isPriceLoading ? (
                "Loading..."
              ) : (
                `$${bitcoinPrice?.toLocaleString() ?? "Error"}`
              )}
            </p>
          </div>

          {/* Calculate Button */}
          <button
            onClick={handleCalculate}
            className="retro-button w-full mt-6"
          >
            Calculate Returns
          </button>
        </div>
      </div>
    </div>
  );
};

export default DCACalculator;
