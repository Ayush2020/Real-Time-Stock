"use client";

import { useEffect, useState } from "react";
import { fetchPortfolio } from "@/lib/fetchData";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/app/ui/select";
import { Holding } from "@/lib/types";
import PriceCell from "./PriceCell";

type Props = {
  initialData: Holding[];
};

export default function PortfolioTable({ initialData }: Props) {
  const [data, setData] = useState(initialData);
  const [selectedSector, setSelectedSector] = useState("All");

  useEffect(() => {
    fetchPortfolio();
    const interval = setInterval(async () => {
      const longPoolingData = await fetchPortfolio();
      // console.log(longPoolingData);
      setData(longPoolingData);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredData =
    selectedSector === "All"
      ? data
      : data.filter((h) => h.sector === selectedSector);

  const columns: ColumnDef<Holding>[] = [
    { header: "Particulars", accessorKey: "stockName" },
    {
      header: "Purchase Price",
      accessorKey: "purchasePrice",
      cell: ({ row }) =>
        row.original.purchasePrice
          ? row.original.purchasePrice.toFixed(2)
          : "-",
    },
    { header: "Qty", accessorKey: "qty" },
    {
      header: "Investment",
      accessorKey: "investment",
      cell: ({ row }) => row.original.investment.toFixed(2),
    },
    {
      header: "Portfolio %",
      accessorKey: "portfolioPercent",
      cell: ({ row }) =>
        (row.original.portfolioPercentage * 100).toFixed(2) + "%",
    },
    { header: "NSE/BSE", accessorKey: "exchange" },
    {
      header: "CMP",
      accessorKey: "cmp",
      cell: ({ row }) => row.original.cmp.toFixed(2),
    },
    {
      header: "Present Value",
      accessorKey: "presentValue",
      cell: ({ row }) => row.original.presentValue.toFixed(2),
    },
    {
      header: "Gain/Loss",
      accessorKey: "gainLoss",
      cell: ({ row }) => {
        const val = row.original.gainLoss;
        return (
          <span className={val >= 0 ? "text-green-600" : "text-red-600"}>
            {val.toFixed(2)}
          </span>
        );
      },
    },
    {
      header: "P/E Ratio",
      accessorKey: "peRatio",
      cell: ({ row }) => row.original.peRatio,
    },
    {
      header: "Latest Earnings",
      accessorKey: "latestEarnings",
      cell: ({ row }) =>
        row.original.latestEarnings ? row.original.latestEarnings : "-",
    },
  ];

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const sectors = ["All", ...new Set(data.map((d) => d.sector))];

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Filter Section */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          📊 Stock Portfolio
          <span className="ml-3 px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
            Live view
          </span>
        </h1>

        <div className="flex items-center gap-3">
          <span className="font-medium text-gray-700 text-sm">
            Filter by Sector:
          </span>
          <Select
            value={selectedSector}
            onValueChange={(value) => setSelectedSector(value)}
          >
            <SelectTrigger className="w-48 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-violet-500 focus:ring-2 focus:ring-violet-400 focus:outline-none transition">
              {selectedSector}
            </SelectTrigger>
            <SelectContent className="rounded-lg shadow-md bg-white">
              {sectors.map((s) => (
                <SelectItem
                  key={s}
                  value={s}
                  className="cursor-pointer px-3 py-2 text-sm hover:bg-violet-100"
                >
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full border-collapse bg-white text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-3 font-medium text-gray-600">Stock Name</th>
              <th className="px-4 py-3 font-medium text-gray-600">Exchange</th>
              <th className="px-4 py-3 font-medium text-gray-600 text-right">
                Purchase Price
              </th>
              <th className="px-4 py-3 font-medium text-gray-600 text-right">
                Quantity
              </th>
              <th className="px-4 py-3 font-medium text-gray-600 text-right">
                Investment
              </th>
              <th className="px-4 py-3 font-medium text-gray-600 text-right">
                CMP
              </th>
              <th className="px-4 py-3 font-medium text-gray-600 text-right">
                Present Value
              </th>
              <th className="px-4 py-3 font-medium text-gray-600 text-right">
                Gain / Loss
              </th>
              <th className="px-4 py-3 font-medium text-gray-600 text-right">
                P/E
              </th>
              <th className="px-4 py-3 font-medium text-gray-600 text-right">
                Latest Earnings
              </th>
              <th className="px-4 py-3 font-medium text-gray-600">Sector</th>
              <th className="px-4 py-3 font-medium text-gray-600 text-right">
                Portfolio %
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((rowData, index) => (
              <tr
                key={index}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-800">
                    {rowData.shortName}
                  </div>
                  <div className="text-xs text-gray-500">
                    {rowData.longName}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                    {rowData.exchange}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  ₹{rowData.purchasePrice}
                </td>
                <td className="px-4 py-3 text-right">{rowData.quantity}</td>
                <td className="px-4 py-3 text-right">{rowData.investment}</td>
                <td className="px-4 py-3 text-right">
                  <PriceCell value={rowData.cmp} />
                </td>
                <td className="px-4 py-3 text-right">{rowData.presentValue}</td>
                <td className="px-4 py-3 text-right">
                  <span
                    className={
                      rowData.gainLoss > 0
                        ? "text-green-600 font-medium"
                        : "text-red-600 font-medium"
                    }
                  >
                    ₹{rowData.gainLoss.toFixed(2)}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">{rowData.peRatio}</td>
                <td className="px-4 py-3 text-right">
                  {rowData.latestEarnings}
                </td>
                <td className="px-4 py-3">IT Services</td>
                <td className="px-4 py-3 text-right">
                  {rowData.portfolioPercentage}
                </td>
              </tr>
            ))}
          </tbody>

          <caption className="caption-bottom text-xs text-gray-500 p-3">
            Investment = Purchase Price × Quantity; Present Value = CMP ×
            Quantity; Gain/Loss = Present Value − Investment.
          </caption>
        </table>
      </div>
    </div>
  );
}
