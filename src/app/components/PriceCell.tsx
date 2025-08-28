"use client";
import { useEffect, useRef, useState } from "react";

type PriceCellProps = {
  value: number;
};

export default function PriceCell({ value }: PriceCellProps) {
  const [cls, setCls] = useState("price-neutral"); 
  const prev = useRef<number>(value);

  useEffect(() => {
    if (prev.current !== value) {
      if (value > prev.current) {
        setCls("price-up");   // green text
      } else if (value < prev.current) {
        setCls("price-down"); // red text
      }
      prev.current = value;
      
    }
  }, [value]);

  return <span className={cls}>{value.toFixed(2)}</span>;
}
