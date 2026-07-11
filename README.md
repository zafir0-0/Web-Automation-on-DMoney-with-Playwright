

# DMoney Portal Automation Testing with Playwright

## Project Overview

This project contains end-to-end UI automation tests for the **DMoney Portal** using **Playwright** with **TypeScript** following the **Page Object Model (POM)** and **Object-Oriented Programming (OOP)** principles.

The automation covers the complete agent onboarding and transaction workflow.

---
## Video Demonstration
https://github.com/user-attachments/assets/800f81b5-5542-48f4-a9a7-1bb77992db14



## Project Scenario

The automated test performs the following steps:

1. Visit the DMoney Portal.
2. Register a new Agent account.
3. Login as Admin and activate the newly created Agent.
4. Login as System account and deposit **2000 BDT** to the Agent.
5. Login as the Agent and verify the balance is **2000 BDT**.
6. Deposit **500 BDT** to an existing Customer.
7. Verify that the transaction is completed successfully.

---

## Technologies Used

- Playwright
- TypeScript
- Node.js
- Faker.js
- Dotenv
- GitHub Actions (CI/CD)

---

## Design Pattern

- Object-Oriented Programming (OOP)
- Page Object Model (POM)

---

## Project Structure

```
.
├── pages/
│   ├── loginPage.ts
│   ├── signupPage.ts
│   ├── userPage.ts
│   ├── depositPage.ts
│   └── selfStatement.ts
│
├── tests/
│   ├── Agent_Signup.spec.ts
│   ├── Admin_Login.spec.ts
│   ├── Agent_Activation.spec.ts
│   ├── System_Login.spec.ts
│   ├── System_Deposit.spec.ts
│   ├── Agent_Login.spec.ts
│   ├── Agent_Balance_Assertion.spec.ts
│   └── Agent_Deposit.spec.ts
│
├── utils/
│   └── test-data.json
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── auth.json
├── playwright.config.ts
├── package.json
├── package-lock.json
├── tsconfig.json
├── .env
├── .gitignore
└── README.md
```

---

## Installation

Clone the repository

```bash
git clone <repository-url>
```

Go to the project directory

```bash
cd <project-folder>
```

Install dependencies

```bash
npm install
```

Install Playwright browsers

```bash
npx playwright install
```

---



## Run Tests

Run all tests

```bash
npx playwright test
```

Run in headed mode

```bash
npx playwright test --headed
```


https://github.com/user-attachments/assets/800f81b5-5542-48f4-a9a7-1bb77992db14


Run a specific test

```bash
npx playwright test tests/agentSignup.spec.ts
```

Run using Chromium

```bash
npx playwright test --project=chromium
```

---

## Playwright Report

Generate and open the HTML report

```bash
npx playwright show-report
```

---

## CI/CD

GitHub Actions is configured to automatically execute the Playwright test suite on every push and pull request.

Workflow includes:

- Checkout repository
- Setup Node.js
- Install dependencies
- Install Playwright browsers
- Execute Playwright tests
- Upload Playwright HTML Report as an artifact

---

## Screenshots

### GitHub Actions (CI/CD)

> <img width="2541" height="997" alt="image" src="https://github.com/user-attachments/assets/664b988c-c8d4-460c-928a-0a39b04beb4b" />



### Playwright Report Summary

> <img width="999" height="984" alt="image" src="https://github.com/user-attachments/assets/502d0a0d-6e8e-41a8-ab6b-868cd80fb9a8" />





## .gitignore

The following files are excluded from version control:

```text
node_modules/
.env
playwright-report/
test-results/
```

---


