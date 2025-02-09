
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

interface DateSelectionProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  setEndDate: (date: Date | undefined) => void;
}

export const DateSelection = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate
}: DateSelectionProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="block text-sm">Start Date</label>
        <Popover>
          <PopoverTrigger className="retro-input w-full flex items-center justify-between">
            {startDate ? format(startDate, "PPP") : "Select date"}
            <CalendarIcon className="h-4 w-4 opacity-50" />
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-black/90 border-retro-orange/30">
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
          <PopoverContent className="w-auto p-0 bg-black/90 border-retro-orange/30">
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
  );
};
