"use client";

import { useEffect, useState } from "react";
import IncidentCard from "./IncidentCard";
import type { Incident } from "../../types/incident.types";

export default function IncidentList() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        <IncidentCard key={incident.id} incident={incident} />
      ))}
    </div>
  );
}
