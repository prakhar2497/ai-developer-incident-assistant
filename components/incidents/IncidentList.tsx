"use client";

import { useEffect, useState } from "react";
import IncidentCard from "./IncidentCard";
import type { Incident, IncidentStatus } from "../../types/incident.types";

export default function IncidentList() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleStatusChange = async (
    incidentId: string,
    status: IncidentStatus,
  ) => {
    try {
      const response = await fetch(`/api/incidents/${incidentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update incident status");
      }

      const updatedIncident: Incident = await response.json();

      setIncidents((currentIncidents) =>
        currentIncidents.map((incident) =>
          incident.id === updatedIncident.id ? updatedIncident : incident,
        ),
      );
    } catch (error) {
      console.error("Failed to update incident status:", error);
    }
  };

  useEffect(() => {
    async function fetchIncidents() {
      try {
        const response = await fetch("/api/incidents?limit=20");

        if (!response.ok) {
          throw new Error("Failed to fetch incidents");
        }

        const data: Incident[] = await response.json();

        setIncidents(data);
      } catch (error) {
        console.error("Failed to fetch incidents:", error);
        setError("Failed to load incidents");
      } finally {
        setLoading(false);
      }
    }

    fetchIncidents();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading incidents...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (incidents.length === 0) {
    return <p className="text-gray-500">No incidents found.</p>;
  }

  return (
    <div className="space-y-4">
      {incidents.map((incident) => (
        <IncidentCard
          key={incident.id}
          incident={incident}
          onStatusChange={(status) => handleStatusChange(incident.id, status)}
        />
      ))}
    </div>
  );
}
