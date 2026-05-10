# Publishing Notes

`open-legal-kit` is designed to be used through `npx` after it is published to
npm.

## Intended User Flow

Users should not need a global install:

```bash
npx open-legal-kit@latest check --config ./legal.config.json
npx open-legal-kit@latest generate --config ./legal.config.json --out ./docs/legal
```

The recommended path is agent-first:

1. The user asks Codex, Claude, Cursor, or another coding agent to inspect the app.
2. The agent creates `legal.config.json`.
3. The agent runs the `npx` commands.
4. The user reviews the generated pages and `review-flags.md`.
5. The user publishes the reviewed Markdown or HTML pages.

## Before npm Publish

Run:

```bash
npm run check
npm run generate
npm pack --dry-run
```

Verify that the package includes:

- `bin/open-legal-kit.mjs`
- `templates/`
- `examples/`
- `prompts/`
- `docs/`
- `config.example.json`
- `README.md`
- `LICENSE`
- `TEMPLATE-LICENSE.md`

Generated `dist*` folders should not be published.
