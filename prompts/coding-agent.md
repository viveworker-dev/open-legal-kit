# Coding Agent Prompt

Use this prompt with Codex, Claude, Cursor, Devin, or another AI coding agent.

```text
Use open-legal-kit to generate legal hygiene pages for this app.

Your task:
1. Inspect this codebase.
2. Create `legal.config.json` for open-legal-kit.
3. Run the config check.
4. Generate Markdown and HTML pages into `docs/legal`.
5. Summarize what you inferred and what still needs human review.

Infer, as accurately as possible:
- app name and public URL
- operator/contact placeholders
- available regions, if obvious
- whether the app has accounts
- what user data is collected
- whether analytics/cookies/local storage are used
- whether AI APIs are used, and which providers
- whether prompts, outputs, files, messages, or user content are stored
- whether file uploads exist
- whether payments, subscriptions, free trials, refunds, usage limits, or quotas exist
- whether this is a mobile app
- whether push notifications, device permissions, or crash reporting are used
- whether the app appears to target children
- whether the app touches sensitive domains such as health, finance, employment, biometrics, precise location, or regulated data

Use these commands:

npx open-legal-kit@latest check --config ./legal.config.json
npx open-legal-kit@latest generate --config ./legal.config.json --out ./docs/legal

If this repository already contains a local checkout of open-legal-kit, you may
use the local CLI instead:

node ./bin/open-legal-kit.mjs check --config ./legal.config.json
node ./bin/open-legal-kit.mjs generate --config ./legal.config.json --out ./docs/legal

Rules:
- Do not invent facts.
- Use clear placeholders for operator/contact details if they are not in the repo.
- If something is uncertain, add it to `custom_notes` in the config.
- If you see a high-risk area, keep it visible in your final summary.
- Do not remove existing legal pages unless asked.
- The generated documents are drafts, not legal advice or a compliance guarantee.

After generating, tell me:
- which files were created
- which data flows you inferred
- which fields are placeholders
- what I must review before publishing
```
