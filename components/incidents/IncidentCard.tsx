import { SeverityBadge } from "./SeverityBadge";
import type { Incident, IncidentStatus } from "../../types/incident.types";

interface IncidentCardProps {
  incident: Incident;
  onStatusChange: (status: IncidentStatus) => void;
}

export default function IncidentCard({
  incident,
  onStatusChange,
}: IncidentCardProps) {
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

        <select
          value={incident.status}
          onChange={(event) =>
            onStatusChange(event.target.value as IncidentStatus)
          }
          className="rounded-full border bg-gray-100 px-3 py-1 text-xs font-medium"
        >
          <option value="NEW">NEW</option>
          <option value="INVESTIGATING">INVESTIGATING</option>
          <option value="RESOLVED">RESOLVED</option>
        </select>
      </div>
    </div>
  );
}
