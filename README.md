# AI Developer Incident Assistant

An event-driven AI-powered incident analysis platform that automates the initial processing of technical issues reported through GitHub.

The project combines **Next.js, TypeScript, n8n, AWS, DynamoDB, GitHub Webhooks, and LLMs** to demonstrate how workflow automation, cloud services, NoSQL databases, and AI can be used together to build a developer-focused application.

---

## 🚧 Project Status

**Status:** In Development

**Target Release:** November 15, 2026

This project is being developed incrementally as a hands-on learning and portfolio project.

---

## 📌 Problem

When a technical issue is reported, developers often need to manually:

- Understand the reported problem
- Collect relevant information
- Determine the severity
- Investigate possible causes
- Identify the next steps
- Communicate the issue with other team members

This process can involve multiple systems and repetitive manual work.

The goal of this project is to automate the initial incident-processing workflow while keeping developers in control of the final investigation and resolution.

---

## 💡 Solution

The application automates the initial incident workflow:

```text
GitHub Issue
     │
     ▼
GitHub Webhook
     │
     ▼
    n8n
     │
     ├── Validate Issue
     ├── Process Incident
     │
     ▼
   LLM / AI
     │
     ├── Generate Summary
     ├── Assess Severity
     ├── Identify Possible Causes
     └── Generate Recommendations
     │
     ▼
  DynamoDB
     │
     ▼
 Next.js Dashboard
```

When a GitHub issue is created, the system processes the issue through an n8n workflow, uses an LLM to analyze the incident, stores the resulting information, and presents it through a developer dashboard.

---

## ✨ Planned Features

- [ ] GitHub Issue Webhook Integration
- [ ] Automated Incident Creation
- [ ] n8n Workflow Orchestration
- [ ] AI-powered Incident Analysis
- [ ] Incident Severity Assessment
- [ ] Possible Cause Analysis
- [ ] Recommended Investigation Steps
- [ ] Incident Status Management
- [ ] DynamoDB Persistence
- [ ] S3-based Incident Attachments
- [ ] AWS Lambda Integration
- [ ] API Gateway Integration
- [ ] Next.js Developer Dashboard
- [ ] Error Handling and Retry Mechanisms
- [ ] Workflow Logging
- [ ] Docker-based Local Development
- [ ] Production-oriented Architecture

---

## 🏗️ Architecture

### Initial Architecture

```text
                         ┌──────────────┐
                         │    GitHub    │
                         │    Issues    │
                         └──────┬───────┘
                                │
                           Webhook Event
                                │
                                ▼
                         ┌──────────────┐
                         │     n8n      │
                         │ Orchestrator │
                         └──────┬───────┘
                                │
                    ┌───────────┴───────────┐
                    │                       │
                    ▼                       ▼
             ┌──────────────┐       ┌──────────────┐
             │ Application  │       │   LLM / AI   │
             │     API      │       │   Analysis   │
             └──────┬───────┘       └──────┬───────┘
                    │                      │
                    └──────────┬───────────┘
                               ▼
                        ┌──────────────┐
                        │  DynamoDB    │
                        └──────┬───────┘
                               │
                               ▼
                        ┌──────────────┐
                        │   Next.js    │
                        │  Dashboard   │
                        └──────────────┘
```

The architecture will evolve throughout the project as AWS services and additional capabilities are introduced.

---

## 🧰 Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

### Workflow Automation
- n8n
- Webhooks
- REST APIs
- HTTP Request integrations

### Backend
- TypeScript / Node.js
- REST APIs
- AWS Lambda
- API Gateway

### Database
- Amazon DynamoDB

### Storage
- Amazon S3

### AI
- LLM API
- Structured AI output
- AI-assisted incident analysis

### Cloud & Infrastructure
- AWS
- Docker

### Integrations
- GitHub
- GitHub Webhooks

---

## 🔄 Example Workflow

A typical incident will follow this workflow:

```text
1. Developer creates GitHub Issue
             │
             ▼
2. GitHub sends Webhook
             │
             ▼
3. n8n receives the event
             │
             ▼
4. Validate and extract issue information
             │
             ▼
5. Create Incident
             │
             ▼
6. Send incident context to LLM
             │
             ▼
7. Generate AI analysis
             │
             ├── Summary
             ├── Severity
             ├── Possible Cause
             └── Recommendations
             │
             ▼
8. Store Incident + Analysis
             │
             ▼
9. Display in Next.js Dashboard
```

---

## 🤖 AI Analysis

The AI component is intended to assist developers during the initial investigation.

For example, given an incident:

```text
Title:
PDF upload API returning HTTP 500

Description:
Users are receiving HTTP 500 errors when uploading PDFs.
```

The system may generate:

```text
Summary:
PDF upload requests appear to be failing during document processing.

Severity:
HIGH

Possible Cause:
The upload operation may be timing out while storing the
document in object storage.

Recommended Investigation:
1. Check application logs.
2. Verify object storage connectivity.
3. Check upload timeout configuration.
4. Test with a smaller PDF.
```

AI-generated analysis will be treated as **assistance for investigation**, not as a definitive diagnosis.

---

## 🗄️ Data Model

The primary domain entity is an **Incident**.

An initial representation may look like:

```json
{
  "incidentId": "INC-1001",
  "title": "PDF upload API returning HTTP 500",
  "description": "Users are receiving 500 errors when uploading PDFs.",
  "severity": "HIGH",
  "status": "OPEN",
  "source": "GITHUB",
  "sourceId": "github-12345",
  "createdAt": "2026-09-27T10:30:00Z",
  "updatedAt": "2026-09-27T10:30:00Z"
}
```

The final DynamoDB design will be determined based on application access patterns.

---

## 🔐 Security

The project will follow basic security practices including:

- Environment variables for configuration
- No secrets committed to Git
- GitHub webhook validation
- AWS IAM with appropriate permissions
- AWS Secrets Manager for sensitive credentials
- `.env.example` for local configuration
- Input validation for external webhook data

---

## 🐳 Local Development

The initial development environment will run locally using Docker.

Planned local services:

```text
┌─────────────────────────────┐
│        Developer Laptop     │
│                             │
│  Next.js                    │
│     │                       │
│  n8n                        │
│     │                       │
│  DynamoDB Local             │
│                             │
└─────────────────────────────┘
```

Cloud services will be introduced progressively as the project develops.

---

## 📂 Planned Repository Structure

```text
ai-developer-incident-assistant/
│
├── README.md
│
├── docs/
│   ├── architecture.md
│   ├── requirements.md
│   └── api.md
│
├── src/
│   └── ...
│
├── n8n/
│   └── workflows/
│
├── infrastructure/
│   └── ...
│
├── .env.example
├── .gitignore
├── docker-compose.yml
└── package.json
```

The structure may evolve as the project progresses.

---

## 🎯 Project Goals

This project is primarily intended to gain practical experience with:

- Next.js and TypeScript
- n8n workflow automation
- REST APIs and Webhooks
- Event-driven architecture
- DynamoDB and NoSQL data modeling
- AWS services
- AI/LLM integration
- Docker
- Error handling and reliability
- Cloud-based application architecture

The project is also intended to serve as a portfolio project demonstrating the ability to integrate multiple technologies into a complete application.

---

## 🗺️ Roadmap

### Sprint 0 — Project Setup
- [x] Define project requirements
- [ ] Initialize Next.js application
- [ ] Create application shell

### Sprint 1 — Next.js + DynamoDB
- [ ] DynamoDB data modeling
- [ ] Local DynamoDB
- [ ] Incident APIs
- [ ] Dashboard integration

### Sprint 2 — n8n Fundamentals
- [ ] Local n8n setup
- [ ] n8n workflows
- [ ] HTTP Request integration
- [ ] Webhooks
- [ ] Error handling

### Sprint 3 — GitHub Integration
- [ ] GitHub Webhooks
- [ ] Issue processing
- [ ] Incident creation
- [ ] Idempotency
- [ ] Status synchronization

### Sprint 4 — AI Integration
- [ ] LLM API
- [ ] Incident analysis
- [ ] Structured AI output
- [ ] Persist AI analysis
- [ ] Dashboard integration

### Sprint 5 — AWS
- [ ] AWS DynamoDB
- [ ] Lambda
- [ ] API Gateway
- [ ] S3
- [ ] Secrets Manager

### Sprint 6 — Production Polish
- [ ] Error handling
- [ ] Logging
- [ ] Dashboard improvements
- [ ] Search and filtering
- [ ] Docker setup
- [ ] Security review
- [ ] End-to-end testing

### Sprint 7 — Release
- [ ] Architecture documentation
- [ ] README
- [ ] Screenshots
- [ ] Demo
- [ ] Final testing
- [ ] v1.0 Release

---

## 📅 Project Timeline

**Start Date:** September 27, 2026

**Target Completion:** November 15, 2026

**Daily Commitment:** ~2 hours

**Target:** ~100 hours of focused development and learning.

---

## 🚀 Future Improvements

Potential future enhancements include:

- Slack notifications
- Jira integration
- Automated incident prioritization
- Incident history and analytics
- RAG-based investigation using historical incidents
- Knowledge-base integration
- AI agent with developer tools
- Additional monitoring integrations
- Authentication and role-based access
- Advanced observability

---

## 📄 License

This project is currently intended as a personal learning and portfolio project.
