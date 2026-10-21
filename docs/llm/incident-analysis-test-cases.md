# Incident Analysis — Test Cases

## Purpose

These test cases validate whether the incident analysis prompt produces useful, evidence-based, and structured results.

The model must distinguish observed facts from possible causes, avoid inventing information, and recommend actionable investigation steps.

## Test Case 1: HTTP 500 After Deployment

**Input**

- **Title:** Checkout API returns HTTP 500
- **Description:** Customers receive server errors when applying discount codes. The issue started after today's deployment.
- **Repository:** shop/checkout-api
- **Issue Number:** 101

**Expected Behavior**

- Summarizes the checkout failure and its reported timing.
- Assigns severity based on the available evidence without assuming the incident affects all customers.
- Identifies a deployment regression as a possible cause, not a confirmed root cause.
- Recommends checking application logs, comparing deployments, and reproducing the failure.
- Identifies missing information, such as stack traces and the number of affected users.

## Test Case 2: Insufficient Information

**Input**

- **Title:** Application is slow
- **Description:** The application feels slow sometimes.
- **Repository:** example/application
- **Issue Number:** 102

**Expected Behavior**

- Provides a cautious summary based on the limited description.
- Does not assign CRITICAL severity without evidence of severe impact.
- Does not invent a cause, such as database overload or a memory leak.
- Recommends collecting latency measurements, relevant logs, affected endpoints, and reproduction steps.
- Lists the missing information needed to assess severity and investigate the cause.

## Test Case 3: Potential Customer Data Loss

**Input**

- **Title:** Customer records disappearing
- **Description:** Multiple users report that saved customer records are missing after an update.
- **Repository:** example/customer-service
- **Issue Number:** 103

**Expected Behavior**

- Recognizes the potential seriousness of missing customer records.
- Assesses severity based on the reported impact and acknowledges that the extent of data loss is not yet verified.
- Treats the update as a possible contributing factor, not a confirmed cause.
- Recommends verifying data integrity, investigating application and database logs, and checking backup and recovery options.
- Identifies missing evidence, such as affected record counts, timestamps, and whether the records are deleted or merely not displayed.

## Validation Checklist

For each test case, verify that:

- [ ] The response contains every required JSON field.
- [ ] Severity is one of LOW, MEDIUM, HIGH, or CRITICAL.
- [ ] Observed facts are supported by the input.
- [ ] Possible causes are clearly presented as hypotheses.
- [ ] Recommendations are specific and actionable.
- [ ] Missing information is identified when relevant.
- [ ] The response is valid JSON without Markdown code fences.
- [ ] No unsupported root cause, log entry, metric, or technical detail is invented.

## Test Results

Record actual results after connecting the LLM API.

| Test Case                        | Result  | Notes                   |
| -------------------------------- | ------- | ----------------------- |
| 1 — HTTP 500 after deployment    | Not run | Pending LLM integration |
| 2 — Insufficient information     | Not run | Pending LLM integration |
| 3 — Potential customer data loss | Not run | Pending LLM integration |

## Completion Criteria

All three test cases must be executed against the integrated LLM. Review the output against the expected behavior and validation checklist, document any failures, and revise the prompt if necessary.
