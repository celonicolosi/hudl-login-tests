# Hudl Login Tests

Playwright TypeScript automation framework for validating the Hudl login flow.

## Tech stack

- Playwright Test
- TypeScript
- ESLint
- Prettier
- dotenv

## Setup

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

Create a local `.env` file from the example:

```bash
cp .env.example .env
```

Update `.env` with the Hudl test account credentials:

```env
BASE_URL=https://www.hudl.com
HUDL_EMAIL=your-test-email
HUDL_PASSWORD=your-test-password
```

The `.env` file is ignored by Git and must not be committed.

## Running tests

Run the full test suite:

```bash
npm test
```

Run tests in UI mode:

```bash
npm run test:ui
```

Run tests in headed mode:

```bash
npm run test:headed
```

Run a specific test by title:

```bash
npx playwright test -g "logs in with valid credentials"
```

Run tests in debug mode:

```bash
npx playwright test --debug
```

Show the latest Playwright HTML report:

```bash
npx playwright show-report
```

The npm test scripts are defined in `package.json` and wrap the equivalent Playwright commands.

## Code quality

Run linting:

```bash
npm run lint
```

Check formatting:

```bash
npm run format:check
```

Apply formatting:

```bash
npm run format
```

## Project structure

```text
hudl-login-tests/
├── pages/
│   └── login.page.ts
├── tests/
│   └── login.spec.ts
├── utils/
│   └── env.ts
├── .env.example
├── .gitignore
├── .prettierrc
├── eslint.config.mjs
├── package-lock.json
├── package.json
├── playwright.config.ts
├── README.md
├── TEST_STRATEGY.md
└── tsconfig.json
```

## Notes

This suite uses Playwright's Page Object Model pattern to keep login page selectors and actions in one place.

Credentials are loaded from environment variables via `utils/env.ts`. The real `.env` file is not committed, while `.env.example` documents the required variables.

Playwright is configured to use Hudl's `data-qa-id` attributes via `testIdAttribute`.
