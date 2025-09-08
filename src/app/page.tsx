import Table from "@/app/components/Table";
import { Holding } from "@/lib/types";
import { GET } from "./api/stocks/route";
import SummaryTable from "./components/SummaryTable";


export default async function Home() {
  const response = await GET();
  const quotes:Holding[] = await response.json();
  // console.log(await data.json());
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <SummaryTable data={quotes} />
        <Table initialData={quotes} />
      </div>
    </div>
  );
}
