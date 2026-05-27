# Changelog

## Unreleased

## v0.1.37 - 2026-05-27

### Search and traces

- Improved session and trace search relevance sorting, tie-breaking, and saved-search/API sort options (refs: #3301, aac69e1).
- Added literal, token, reasoning, tool-response, and semantic-region highlighting in trace conversations, including first-match scrolling and large-message QA coverage (refs: #3282, #3292).
- Added live taxonomy-backed search recommendations and the underlying behavior taxonomy pipeline, workers, repositories, migrations, tuning scripts, and documentation (refs: #3280, #3287).

### Product experience

- Added an in-app “What’s new” popover backed by Framer CMS changelog entries (ref: #3300).
- Added a flagger onboarding step so new projects can choose enabled automatic flaggers before telemetry setup (ref: #3297).
- Improved chat conversation rendering for media loading/error states, file cards, and design-system coverage (ref: #3303).

### Flagger and notifications

- Bound classifier feedback to saved flagger annotations and added AI review gating so annotations stay coherent with match decisions (ref: #3302).
- Replaced the incident email annotation-card monogram with the Latitude icon (ref: #3290).

### Wrapped reports and analytics

- Added Claude Code Wrapped V2 with token totals, week-over-week comparisons, leaderboard position, V2 email/OG rendering, seeded V2 reports, and redesigned backoffice analytics (ref: #3299).

### Infrastructure and reliability

- Fixed SqlClient transaction isolation so concurrent Effect fibers use separate Postgres transactions while nested calls reuse the current transaction (ref: #3294).
- Added Framer secrets to infrastructure and web runtime configuration (ref: 6782d44).
- Updated bundled models.dev data and removed MCP plugin docs for now (refs: #3293, #3298).

