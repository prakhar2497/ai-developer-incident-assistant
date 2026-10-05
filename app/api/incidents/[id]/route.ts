import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { NextResponse } from "next/server";

import { dynamoDb } from "@/lib/dynamodb";

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
