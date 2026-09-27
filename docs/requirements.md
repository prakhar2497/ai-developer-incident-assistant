# AI Developer Incident Assistant - Requirements

## 1. Project Overview

AI Developer Incident Assistant is a developer-focused incident management
application that automatically processes technical issues reported through
GitHub.

The system uses n8n to orchestrate the workflow and an LLM to analyze
incidents and provide an initial assessment.

## 2. Problem Statement

When developers report technical issues, manually reviewing every issue,
understanding the problem, determining severity, and suggesting next steps
can be time-consuming.

This project aims to automate the initial analysis of technical incidents
and provide developers with a centralized dashboard.

## 3. MVP Workflow

The initial workflow will be:

GitHub Issue
→ n8n Webhook
→ Application API
→ DynamoDB
→ LLM Analysis
→ Application API
→ DynamoDB
→ Next.js Dashboard

## 4. Functional Requirements

### FR-1: GitHub Issue Ingestion

The system should receive GitHub issue events through an n8n webhook.

The following information should be captured:

- Repository
- Issue number
- Issue title
- Issue description
- Issue URL
- Author
- Created timestamp

### FR-2: Incident Creation

n8n should send the processed GitHub issue to the Application API.

The Application API should create an incident record in DynamoDB.

Each incident must have a unique incident ID.

### FR-3: AI Incident Analysis

The system should send relevant incident information to an LLM.

The LLM should provide:

- Incident summary
- Severity
- Possible cause
- Recommended next steps
- Confidence/limitations

### FR-4: AI Result Persistence

The AI analysis should be associated with the correct incident and
stored in DynamoDB.

The incident ID should be used to correlate the AI response with the
original incident.

### FR-5: Dashboard

The Next.js dashboard should allow developers to:

- View incidents
- View incident details
- View AI analysis
- View incident severity
- View incident status

### FR-6: Incident Status

The system should support basic incident statuses:

- New
- Investigating
- Resolved

### FR-7: Duplicate Prevention

The system should prevent duplicate incidents when the same GitHub
event is received more than once.

## 5. Non-Functional Requirements

### NFR-1: Scalability

The system should support multiple GitHub issues being processed
concurrently.

Each incident should have a unique identifier that does not depend
on sequential numbering.

### NFR-2: Security

API keys, AWS credentials, GitHub credentials, and other secrets
must not be committed to the repository.

### NFR-3: Reliability

Failures in external services such as GitHub, the LLM API, or AWS
should be handled gracefully and logged.

### NFR-4: Maintainability

Responsibilities should remain separated between:

- Next.js
- n8n
- Application API
- DynamoDB
- LLM API

## 6. MVP Success Criteria

The MVP will be considered successful when:

1. A GitHub issue can trigger the n8n workflow.
2. n8n can create an incident through the Application API.
3. The incident is stored in DynamoDB.
4. The incident can be analyzed by an LLM.
5. The AI result is associated with the correct incident.
6. The AI result is stored in DynamoDB.
7. The Next.js dashboard can display the incident and AI analysis.
8. Multiple incidents can be processed independently.
9. Duplicate GitHub events do not create duplicate incidents.

## 7. Out of Scope

The following are not part of the MVP:

- User authentication
- Role-based access control
- Multi-tenant organizations
- Mobile application
- Kubernetes
- Custom LLM training
- Advanced AI agents
- Microservices
- Real-time collaboration
