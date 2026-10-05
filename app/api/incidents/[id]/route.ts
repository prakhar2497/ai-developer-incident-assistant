import { GetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { NextResponse } from "next/server";

import { dynamoDb } from "@/lib/dynamodb";
import { INCIDENT_STATUSES, type IncidentStatus } from "@/types/incident.types";

const TABLE_NAME = "Incidents";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const result = await dynamoDb.send(
      new GetCommand({
        TableName: TABLE_NAME,
        Key: {
          PK: `INCIDENT#${id}`,
        },
      }),
    );

    if (!result.Item) {
      return NextResponse.json(
        { error: "Incident not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(result.Item, { status: 200 });
  } catch (error) {
    console.error("Failed to retrieve incident:", error);

    return NextResponse.json(
      { error: "Failed to retrieve incident" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const body = await request.json();
    const status: unknown = body.status;

    const validStatus = status as IncidentStatus;

    if (!INCIDENT_STATUSES.includes(validStatus)) {
      return NextResponse.json(
        {
          error:
            "Invalid status. Status must be NEW, INVESTIGATING or RESOLVED",
        },
        { status: 400 },
      );
    }

    const updatedAt = new Date().toISOString();

    const result = await dynamoDb.send(
      new UpdateCommand({
        TableName: TABLE_NAME,
        Key: {
          PK: `INCIDENT#${id}`,
        },
        UpdateExpression: "SET #status = :status, updatedAt = :updatedAt",
        ConditionExpression: "attribute_exists(PK)",
        ExpressionAttributeNames: {
          "#status": "status",
        },
        ExpressionAttributeValues: {
          ":status": status,
          ":updatedAt": updatedAt,
        },
        ReturnValues: "ALL_NEW",
      }),
    );

    return NextResponse.json(result.Attributes, { status: 200 });
  } catch (error) {
    if (
      error instanceof Error &&
      error.name === "ConditionalCheckFailedException"
    ) {
      return NextResponse.json(
        { error: "Incident not found" },
        { status: 404 },
      );
    }

    console.error("Failed to update incident:", error);

    return NextResponse.json(
      { error: "Failed to update incident" },
      { status: 500 },
    );
  }
}
