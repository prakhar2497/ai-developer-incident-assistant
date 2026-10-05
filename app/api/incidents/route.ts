import { PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

import { dynamoDb } from "@/lib/dynamodb";
import { Incident } from "@/types/incident.types";

const TABLE_NAME = "Incidents";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (
      !body.title ||
      !body.description ||
      !body.repository ||
      !body.issueNumber
    ) {
      return NextResponse.json(
        {
          error: "title, description, repository and issueNumber are required",
        },
        { status: 400 },
      );
    }

    const incidentId = randomUUID();
    const now = new Date().toISOString();

    const incident = {
      PK: `INCIDENT#${incidentId}`,

      GSI1PK: "INCIDENT",
      GSI1SK: `${now}#${incidentId}`,

      id: incidentId,

      title: body.title,
      description: body.description,
      repository: body.repository,
      issueNumber: body.issueNumber,

      status: "NEW",
      severity: body.severity ?? "MEDIUM",

      createdAt: now,
      updatedAt: now,
    };

    await dynamoDb.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: incident,
      }),
    );

    return NextResponse.json(incident, { status: 201 });
  } catch (error) {
    console.error("Failed to create incident:", error);

    return NextResponse.json(
      { error: "Failed to create incident" },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const rawLimit = Number(searchParams.get("limit") ?? "20");

    const limit = Math.min(
      Math.max(Number.isFinite(rawLimit) ? rawLimit : 20, 1),
      20,
    );

    const result = await dynamoDb.send(
      new QueryCommand({
        TableName: TABLE_NAME,
        IndexName: "IncidentsByCreatedAt",
        KeyConditionExpression: "GSI1PK = :pk",
        ExpressionAttributeValues: {
          ":pk": "INCIDENT",
        },
        ScanIndexForward: false,
        Limit: limit,
      }),
    );

    const incidents: Incident[] = (result.Items ?? []).map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      repository: item.repository,
      issueNumber: item.issueNumber,
      status: item.status,
      severity: item.severity,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));

    return NextResponse.json(incidents, { status: 200 });
  } catch (error) {
    console.error("Failed to retrieve incidents:", error);

    return NextResponse.json(
      { error: "Failed to retrieve incidents" },
      { status: 500 },
    );
  }
}
