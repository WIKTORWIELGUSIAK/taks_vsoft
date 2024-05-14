import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PlayerSelectionProps = {
  onSelect: (value: string) => void;
};

export const PlayerSelection: React.FC<PlayerSelectionProps> = ({
  onSelect,
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <h1 className="text-2xl font-bold text-center mb-3">
        Witaj w grze Super Farmer!
      </h1>
      <h2 className="text-xl font-semibold text-center mb-5">
        Wybierz liczbę graczy
      </h2>

      <Select onValueChange={onSelect}>
        <SelectTrigger className="w-[180px] bg-white border border-gray-300 rounded-md shadow-sm hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50">
          <SelectValue placeholder="Liczba graczy" />
        </SelectTrigger>
        <SelectContent className="bg-white shadow-lg rounded-md">
          <SelectItem value="2" className="p-2 hover:bg-gray-100">
            2 graczy
          </SelectItem>
          <SelectItem value="3" className="p-2 hover:bg-gray-100">
            3 graczy
          </SelectItem>
          <SelectItem value="4" className="p-2 hover:bg-gray-100">
            4 graczy
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
