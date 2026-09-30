import IncidentList from "@/components/incidents/IncidentList";

export default function IncidentsPage() {
  return (
    <main className="flex-1 p-8">
      <div>
        <h1 className="text-2xl font-semibold">Incidents</h1>

        <p className="mt-1 text-gray-500">
          Review and manage your developer incidents.
        </p>
      </div>

      <div className="mt-8">
        <IncidentList />
      </div>
    </main>
  );
}
