import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import StatCard from "@/components/dashboard/StatCard";
import Dashboard from "@/components/dashboard/Dashboard";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Header />

        <Dashboard />
      </div>
    </div>
  );
}
