import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { NextResponse } from "next/server";

import { dynamoDb } from "@/lib/dynamodb";
import { INCIDENT_STATUSES, type IncidentStatus } from "@/types/incident.types";

const TABLE_NAME = "Incidents";

export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    const repository = body.repository;
    const issueNumber = body.issueNumber;
    const status: unknown = body.status;

    if (
      typeof repository !== "string" ||
      !repository.trim() ||
      !Number.isInteger(issueNumber) ||
      issueNumber <= 0
    ) {
      return NextResponse.json(
        { error: "Valid repository and issueNumber are required" },
        { status: 400 },
      );
    }

    if (
      typeof status !== "string" ||
      !INCIDENT_STATUSES.includes(status as IncidentStatus)
    ) {
      return NextResponse.json(
        { error: "Invalid incident status" },
        { status: 400 },
      );
    }

    const updatedAt = new Date().toISOString();

    const result = await dynamoDb.send(
      new UpdateCommand({
        TableName: TABLE_NAME,
        Key: {
          PK: `GITHUB#${repository}#${issueNumber}`,
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

    return NextResponse.json(
      {
        id: result.Attributes?.id,
        repository: result.Attributes?.repository,
        issueNumber: result.Attributes?.issueNumber,
        status: result.Attributes?.status,
        updatedAt: result.Attributes?.updatedAt,
      },
      { status: 200 },
    );
  } catch (error) {
    if (
      error instanceof Error &&
      error.name === "ConditionalCheckFailedException"
    ) {
      return NextResponse.json(
        { error: "Incident not found for this GitHub issue" },
        { status: 404 },
      );
    }

    console.error("Failed to update GitHub incident status:", error);

    return NextResponse.json(
      { error: "Failed to update incident status" },
      { status: 500 },
    );
  }
}
