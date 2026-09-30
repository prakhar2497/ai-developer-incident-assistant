import IncidentCard from "./IncidentCard";
import type { Incident } from "./incident.types";

const mockIncidents: Incident[] = [
  {
    id: "inc-001",
    title: "API returning 500 errors",
    repository: "payment-service",
    issueNumber: 101,
    status: "NEW",
    severity: "HIGH",
    createdAt: "2 hours ago",
  },
  {
    id: "inc-002",
    title: "Database connection timeout",
    repository: "order-service",
    issueNumber: 98,
    status: "INVESTIGATING",
    severity: "MEDIUM",
    createdAt: "5 hours ago",
  },
  {
    id: "inc-003",
    title: "Authentication failing",
    repository: "auth-service",
    issueNumber: 94,
    status: "RESOLVED",
    severity: "LOW",
    createdAt: "Yesterday",
  },
];

export default function IncidentList() {
  return (
    <div className="space-y-4">
      {mockIncidents.map((incident) => (
        <IncidentCard key={incident.id} incident={incident} />
      ))}
    </div>
  );
}
