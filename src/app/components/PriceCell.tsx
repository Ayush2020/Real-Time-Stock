"use client";
import { useEffect, useRef, useState } from "react";

type PriceCellProps = {
  value: number;
};

export default function PriceCell({ value }: PriceCellProps) {
  const [cls, setCls] = useState("text-gray-700"); 
  const prev = useRef<number>(value);

  useEffect(() => {
    if (prev.current !== value) {
      if (value > prev.current) {
        setCls("text-green-500 font-semibold transition-colors duration-500"); 
      } else if (value < prev.current) {
        setCls("text-red-500 font-semibold transition-colors duration-500"); 
      } else {
        setCls("text-gray-700"); // neutral
      }
      prev.current = value;
    }
  }, [value]);

  return <span className={cls}>{value.toFixed(2)}</span>;
}
