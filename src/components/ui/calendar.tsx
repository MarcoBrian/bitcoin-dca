
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium text-retro-orange",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-retro-orange border-retro-orange/30 hover:bg-retro-orange/20"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-retro-orange rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative text-retro-orange [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-retro-orange/20 [&:has([aria-selected])]:bg-retro-orange/20 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal text-retro-orange hover:bg-retro-orange/20 hover:text-retro-orange aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected: "bg-retro-orange/30 text-retro-orange hover:bg-retro-orange/40 hover:text-retro-orange focus:bg-retro-orange/40 focus:text-retro-orange",
        day_today: "bg-retro-orange/20 text-retro-orange",
        day_outside: "text-retro-orange/50 opacity-50 aria-selected:bg-retro-orange/20 aria-selected:text-retro-orange aria-selected:opacity-30",
        day_disabled: "text-retro-orange/40 opacity-50",
        day_range_middle: "aria-selected:bg-retro-orange/20 aria-selected:text-retro-orange",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
