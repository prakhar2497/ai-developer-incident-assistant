import StatCard from "./StatCard";

export default function Dashboard() {
  return (
    <main className="flex-1 p-8">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>

        <p className="mt-1 text-gray-500">
          Monitor and analyze your developer incidents.
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <StatCard title="Total Incidents" value={0} />

        <StatCard title="New" value={0} />

        <StatCard title="Investigating" value={0} />
      </div>
    </main>
  );
}
