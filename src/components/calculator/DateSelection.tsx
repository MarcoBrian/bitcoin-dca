
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, parse } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";

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
  const [startDateInput, setStartDateInput] = useState(startDate ? format(startDate, "yyyy-MM-dd") : "");
  const [endDateInput, setEndDateInput] = useState(endDate ? format(endDate, "yyyy-MM-dd") : "");

  const handleStartDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDateInput(e.target.value);
    try {
      const date = parse(e.target.value, "yyyy-MM-dd", new Date());
      if (!isNaN(date.getTime())) {
        setStartDate(date);
      }
    } catch (error) {
      // Invalid date format, do nothing
    }
  };

  const handleEndDateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDateInput(e.target.value);
    try {
      const date = parse(e.target.value, "yyyy-MM-dd", new Date());
      if (!isNaN(date.getTime())) {
        setEndDate(date);
      }
    } catch (error) {
      // Invalid date format, do nothing
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="block text-sm">Start Date</label>
        <Popover>
          <PopoverTrigger className="retro-input w-full flex items-center justify-between">
            <input
              type="date"
              value={startDateInput}
              onChange={handleStartDateInput}
              className="bg-transparent border-none outline-none w-full"
            />
            <CalendarIcon className="h-4 w-4 opacity-50 flex-shrink-0" />
          </PopoverTrigger>
          <PopoverContent 
            className="w-auto p-0 bg-black/90 border-retro-orange/30" 
            side="bottom" 
            align="start"
            sideOffset={4}
          >
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={(date) => {
                setStartDate(date);
                if (date) {
                  setStartDateInput(format(date, "yyyy-MM-dd"));
                }
              }}
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
            <input
              type="date"
              value={endDateInput}
              onChange={handleEndDateInput}
              className="bg-transparent border-none outline-none w-full"
            />
            <CalendarIcon className="h-4 w-4 opacity-50 flex-shrink-0" />
          </PopoverTrigger>
          <PopoverContent 
            className="w-auto p-0 bg-black/90 border-retro-orange/30" 
            side="bottom" 
            align="start"
            sideOffset={4}
          >
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={(date) => {
                setEndDate(date);
                if (date) {
                  setEndDateInput(format(date, "yyyy-MM-dd"));
                }
              }}
              disabled={(date) => date > new Date() || (startDate ? date < startDate : false)}
              className="bg-transparent"
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
