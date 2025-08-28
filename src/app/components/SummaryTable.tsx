"use client";

import { Holding } from "@/lib/types";

type SectorSummary = {
  sector: string;
  totalInvestment: number;
  totalPresentValue: number;
  totalGainLoss: number;
};

type Props = {
  data: Holding[];
};

export default function SummaryTable({ data }: Props) {
  if (!data || data.length === 0) {
    return <p className="text-gray-500 p-4">No holdings available</p>;
  }

  // Group by sector
  const grouped = data.reduce((acc, h) => {
    if (!acc[h.sector]) {
      acc[h.sector] = {
        sector: h.sector,
        totalInvestment: 0,
        totalPresentValue: 0,
        totalGainLoss: 0,
      };
    }

    const investment = h.quantity * h.purchasePrice;
    const presentValue = h.quantity * h.cmp;

    acc[h.sector].totalInvestment += investment;
    acc[h.sector].totalPresentValue += presentValue;
    acc[h.sector].totalGainLoss += presentValue - investment;

    return acc;
  }, {} as Record<string, SectorSummary>);

  const summary = Object.values(grouped);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        📊 Sector-wise Summary
      </h2>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full border-collapse bg-white text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-3">Sector</th>
              <th className="px-4 py-3 text-right">Total Investment</th>
              <th className="px-4 py-3 text-right">Total Present Value</th>
              <th className="px-4 py-3 text-right">Gain / Loss</th>
            </tr>
          </thead>
          <tbody>
            {summary.map((s, idx) => (
              <tr key={idx} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{s.sector}</td>
                <td className="px-4 py-3 text-right">
                  ₹{s.totalInvestment.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-right">
                  ₹{s.totalPresentValue.toFixed(2)}
                </td>
                <td
                  className={`px-4 py-3 text-right font-medium transition-colors duration-500 ${
                    s.totalGainLoss >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  ₹{s.totalGainLoss.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
