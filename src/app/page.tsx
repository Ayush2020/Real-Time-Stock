// import { Table } from "@/components/ui/table";
// import Image from "next/image";

// export default function Home() {
//   return (
//      <main className="p-6">
//       <h1 className="text-2xl font-bold mb-4">📊 Real-Time Portfolio Dashboard</h1>
//       <Table />
//     </main>
//   );
// }

// app/page.tsx
import Table from "@/app/components/Table";
import { Holding } from "@/lib/types";
import { GET } from "./api/stocks/route";

export default async function Home() {
  const response = await GET();
  const quotes:Holding[] = await response.json();
  // console.log(await data.json());
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <Table initialData={quotes} />
      </div>
    </div>
  );
}
