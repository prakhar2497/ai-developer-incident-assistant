import type { IncidentSeverity } from "../../types/incident.types";

interface SeverityBadgeProps {
  severity: IncidentSeverity;
}

export const SeverityBadge = ({ severity }: SeverityBadgeProps) => {
  return (
    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
      {severity}
    </span>
  );
};
