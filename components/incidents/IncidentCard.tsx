import { SeverityBadge } from "./SeverityBadge";
import type { Incident } from "./incident.types";

interface IncidentCardProps {
  incident: Incident;
}

export default function IncidentCard({ incident }: IncidentCardProps) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-semibold">{incident.title}</h2>

          <p className="mt-1 text-sm text-gray-500">
            {incident.repository} · GitHub #{incident.issueNumber}
          </p>
        </div>

        <SeverityBadge severity={incident.severity} />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-gray-500">{incident.createdAt}</span>

        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
          {incident.status}
        </span>
      </div>
    </div>
  );
}
