# open-legal-kit

Legal hygiene starter kit for AI-built indie apps.

AI coding makes it much easier to launch a real product before the boring public
pages are ready. `open-legal-kit` helps small builders generate a first draft of
those pages from a config file: Privacy Policy, Terms of Service, account/data
deletion, payment/refund terms, AI disclaimer, and launch review flags.

It is built for simple web apps, SaaS tools, mobile apps, AI wrappers, file
upload products, and no-account utilities created by solo developers or tiny
teams.

It is not legal advice. It is not a compliance guarantee. It is a better
starting point than an empty footer.

## Core Idea

Most tiny apps do not need a complex legal platform on day one. They do need to
tell users the basics:

- who operates the app
- what data is collected
- why it is used
- which third parties process it
- how long it is kept
- how deletion requests work
- what AI, payment, mobile, or file-upload risks exist

This kit turns that hygiene checklist into Markdown and standalone HTML drafts.

## What It Generates

- Privacy Policy
- Terms of Service
- Account and Data Deletion
- Payment and Refund Terms
- AI Content Disclaimer
- Launch Checklist
- Review Flags

Outputs are generated as both Markdown and simple standalone HTML.

Use-case clauses are included when the config enables them:

- AI wrappers and AI API products
- file upload apps
- paid SaaS and subscriptions
- mobile apps with push notifications or crash reporting
- no-account tools

Supported output languages:

- English (`en`)
- Japanese (`ja`)
- Simplified Chinese (`zh-Hans`)

## Quick Start

### Web Wizard

If you want to start without writing JSON by hand, run the local wizard:

```bash
npx open-legal-kit@latest web
```

It serves a browser UI on `127.0.0.1`, drafts the config and legal pages, and
includes an Agent Prompt tab. The intended workflow is:

- choose the app shape in the wizard
- copy the generated agent prompt into Codex, Claude, Cursor, or another coding
  agent
- have the agent inspect the actual codebase, fix uncertain config facts, and
  run the CLI generator

When working from this repository:

```bash
npm run web:templates
npm run web:serve
```

### Ask Your Coding Agent

Most users of this kit are probably building with Codex, Claude, Cursor, or
another AI coding agent. The easiest path is to ask the agent to inspect your
app and draft the config.

Copy this into your coding agent:

```text
Use open-legal-kit to generate legal hygiene pages for this app.

Please inspect the codebase and create `legal.config.json`.

Infer, as accurately as possible:
- app name and public URL
- operator/contact placeholders
- whether the app has accounts
- what user data is collected
- whether analytics/cookies are used
- whether AI APIs are used, and which providers
- whether prompts, outputs, files, or user content are stored
- whether payments/subscriptions exist
- whether the app is mobile
- whether push notifications or crash reporting are used
- whether the app appears to target children or sensitive domains

Then run:
npx open-legal-kit@latest check --config ./legal.config.json
npx open-legal-kit@latest generate --config ./legal.config.json --out ./docs/legal

Do not invent uncertain facts.
If something is unclear, add it to `custom_notes` in the config and make sure it
appears in `review-flags.md`.

The output is not legal advice. I will review it before publishing.
```

More reusable prompt templates are in [prompts](./prompts/):

- [prompts/coding-agent.md](./prompts/coding-agent.md)
- [prompts/coding-agent.ja.md](./prompts/coding-agent.ja.md)
- [prompts/coding-agent.zh-Hans.md](./prompts/coding-agent.zh-Hans.md)

### Manual Config

Once the package is published, you can run it without installing anything:

```bash
cp config.example.json my-app.config.json
$EDITOR my-app.config.json
npx open-legal-kit@latest check --config ./my-app.config.json
npx open-legal-kit@latest generate --config ./my-app.config.json --out ./dist
```

If you are working from this repository:

```bash
cp config.example.json my-app.config.json
$EDITOR my-app.config.json
npm run generate -- --config ./my-app.config.json --out ./dist
```

Or run the CLI directly:

```bash
node ./bin/open-legal-kit.mjs generate --config ./config.example.json --out ./dist
node ./bin/open-legal-kit.mjs check --config ./config.example.json
```

When multiple locales are configured, output is written into locale folders:

```text
dist/
  en/
    privacy-policy.md
    privacy-policy.html
  ja/
    privacy-policy.md
    privacy-policy.html
  zh-Hans/
    privacy-policy.md
    privacy-policy.html
```

## Intended Scope

Good fit:

- AI wrapper apps
- small productivity tools
- waitlists and landing pages
- small SaaS apps
- mobile apps with simple accounts and analytics
- products that collect ordinary contact/account/payment data

Needs legal review before use:

- children or teen-directed apps
- health, finance, insurance, employment, housing, education, or biometric data
- public user-generated content at meaningful scale
- marketplaces or regulated payments
- crypto/asset custody or investment claims
- sensitive personal data
- enterprise contracts, DPAs, BAAs, or procurement requirements
- meaningful EU/California scale

## Why This Exists

AI coding makes it much easier for first-time builders to launch real services.
Many of those services collect emails, account data, analytics identifiers, AI
prompts, uploaded files, payments, or support messages.

The hygiene problem is simple: users should be told what is collected, why it is
used, how long it is kept, who it is shared with, and how to contact the
operator.

This kit turns that into a config checklist and draft pages.

## Config Shape

The generator starts from a JSON config:

```json
{
  "app_name": "Example AI Notes",
  "app_url": "https://example.com",
  "operator_name": "Example Labs",
  "contact_email": "privacy@example.com",
  "locales": ["en", "ja", "zh-Hans"],
  "is_ai_wrapper": true,
  "collects_email": true,
  "has_accounts": true,
  "uses_analytics": true,
  "uses_ai_api": true,
  "stores_user_content": true,
  "stores_user_files": false,
  "has_payments": true,
  "has_subscriptions": true,
  "cancellation_url": "https://example.com/billing",
  "is_mobile_app": false,
  "targets_children": false,
  "available_regions": ["jp", "us"]
}
```

See [config.example.json](./config.example.json) for the full starter shape.

## Example Configs

- [examples/simple-ai-saas.config.json](./examples/simple-ai-saas.config.json)
- [examples/file-upload-paid-saas.config.json](./examples/file-upload-paid-saas.config.json)
- [examples/mobile-ai-wrapper.config.json](./examples/mobile-ai-wrapper.config.json)
- [examples/no-account-tool.config.json](./examples/no-account-tool.config.json)

## Source Notes

This project is designed around public legal and platform guidance, including:

- Japan PPC guidance that personal information use purposes should be specified
  and notified or publicly announced:
  https://www.ppc.go.jp/personalinfo/legal/guidelines_tsusoku/
- European Commission GDPR guidance on what information must be provided when
  collecting personal data:
  https://commission.europa.eu/law/law-topic/data-protection/rules-business-and-organisations/principles-gdpr/what-information-must-be-given-individuals-whose-data-collected_en
- Apple App Store Connect requirement for a Privacy Policy URL:
  https://developer.apple.com/help/app-store-connect/reference/app-information/app-privacy/
- Google Play User Data policy requiring privacy policy disclosure:
  https://support.google.com/googleplay/android-developer/answer/10144311
- FTC mobile app guidance on truth-in-advertising and privacy by design:
  https://www.ftc.gov/node/46383

See [docs/source-notes.md](./docs/source-notes.md).

## License

Code is MIT licensed.

Templates, sample configs, and generated example text are CC0 where possible.
See [TEMPLATE-LICENSE.md](./TEMPLATE-LICENSE.md).
