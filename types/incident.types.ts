export type IncidentSeverity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface Incident {
  id: string;
  title: string;
  repository: string;
  issueNumber: number;
  status: IncidentStatus;
  severity: IncidentSeverity;
  createdAt: string;
}

export const INCIDENT_STATUSES = ["NEW", "INVESTIGATING", "RESOLVED"] as const;

export type IncidentStatus = (typeof INCIDENT_STATUSES)[number];
