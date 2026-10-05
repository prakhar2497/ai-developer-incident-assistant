export type IncidentStatus = "NEW" | "INVESTIGATING" | "RESOLVED";

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
