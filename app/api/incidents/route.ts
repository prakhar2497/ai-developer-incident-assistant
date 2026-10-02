import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

import { dynamoDb } from "@/lib/dynamodb";

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
