import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { NextResponse } from "next/server";
import { dynamoDb } from "@/lib/dynamodb";

const TABLE_NAME = "Incidents";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const repository = searchParams.get("repository");
    const issueNumber = searchParams.get("issueNumber");

    if (!repository || !issueNumber || !/^\d+$/.test(issueNumber)) {
      return NextResponse.json(
        { error: "Valid repository and issueNumber are required" },
        { status: 400 },
      );
    }

    const result = await dynamoDb.send(
      new GetCommand({
        TableName: TABLE_NAME,
        Key: {
          PK: `GITHUB#${repository}#${issueNumber}`,
        },
      }),
    );

    if (!result.Item) {
      return NextResponse.json(
        { error: "Incident not found for this GitHub issue" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        id: result.Item.id,
        repository: result.Item.repository,
        issueNumber: result.Item.issueNumber,
        status: result.Item.status,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Failed to find GitHub incident:", error);

    return NextResponse.json(
      { error: "Failed to find incident" },
      { status: 500 },
    );
  }
}
