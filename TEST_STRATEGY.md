# Test Strategy

## Scope

This suite validates the Hudl login flow at:

```text
https://www.hudl.com/login
```

The suite focuses on the core user journey and key validation behaviours around authentication.

## Covered scenarios

The current suite covers:

- Empty email validation
- Invalid email format validation
- Empty password validation
- Invalid password error
- Reset password entry point from the password step
- Successful login with valid credentials

## Approach

The tests are written with Playwright Test and TypeScript.

The suite uses a small Page Object Model structure. The `LoginPage` object owns the login page locators and common login actions, while assertions remain mostly in the spec file so the test intent is easy to read.

This keeps the tests maintainable without hiding the behaviour being verified.

## Selector strategy

The suite uses a mix of:

- `getByRole` for accessible buttons, headings and form controls
- `getByText` for clear user-facing text
- `getByTestId` for Hudl's stable `data-qa-id` attributes

Playwright is configured to use Hudl's `data-qa-id` attributes through `testIdAttribute`.

Dynamic React-generated IDs are intentionally avoided because they are more likely to change.

## Credential handling

Credentials are loaded from environment variables using `dotenv`.

The required variables are:

```env
BASE_URL=https://www.hudl.com
HUDL_EMAIL=your-test-email
HUDL_PASSWORD=your-test-password
```

The real `.env` file is ignored by Git and must not be committed. The committed `.env.example` file documents the required variables without exposing secrets.

## Successful login assertion

The successful login test asserts:

- the user is redirected to `/home`
- a stable authenticated navigation element is visible

The test intentionally avoids asserting account-specific content such as team names, profile names or recommendations, because those may vary depending on the provided test account.

## Reset password scope

The reset password flow is covered at entry-point level from the login journey.

The test verifies that the user can open the reset password flow from the password step and that the expected reset password page elements are visible.

Deeper reset password scenarios, such as reset email validation and reset confirmation, are treated as future coverage because they belong to the wider account recovery flow rather than the core login flow.

## Browser coverage

The Playwright configuration currently includes Chromium, Firefox and WebKit projects.

This gives broad browser coverage for the login flow. If the suite became larger or slower, a practical next step would be to run Chromium as the default pull request smoke check and run all browsers on a scheduled or pre-release basis.

## Future improvements

Potential future improvements include:

- Adding accessibility checks for the login form
- Adding a dedicated reset password suite if account recovery becomes part of the requested scope
- Adding tags or projects to separate smoke tests from broader regression coverage
- Expanding coverage for additional authentication methods if required, such as social login or organisation-specific login flows
