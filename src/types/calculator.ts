
export type Period = "weekly" | "monthly" | "one-time";

export interface CalculationResult {
  totalInvested: number;
  estimatedBitcoin: number;
  currentValue: number;
  roi: number;
  averageBuyPrice: number;
}

export const PERIODS = [
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "one-time", label: "One Time Purchase" },
] as const;

