import { TEMPLATES } from "./templates.js";

const supportedLocales = new Set(["en", "ja", "zh-Hans"]);
const localeLabels = {
  en: "English",
  ja: "Japanese",
  "zh-Hans": "Simplified Chinese"
};

const documents = [
  "privacy-policy",
  "terms-of-service",
  "account-data-deletion",
  "payment-refund-terms",
  "ai-content-disclaimer",
  "launch-checklist"
];

const form = document.querySelector("#wizard");
const fileSelect = document.querySelector("#fileSelect");
const previewOutput = document.querySelector("#previewOutput");
const configOutput = document.querySelector("#configOutput");
const agentOutput = document.querySelector("#agentOutput");
const statusLine = document.querySelector("#statusLine");
const warningsBox = document.querySelector("#warnings");

let generatedFiles = new Map();
let currentConfig = null;

const exampleConfig = {
  app_name: "PocketCoach AI",
  app_url: "https://pocketcoach.example",
  operator_name: "PocketCoach Studio",
  contact_email: "privacy@pocketcoach.example",
  governing_law: "Japan",
  available_regions: ["jp", "us"],
  privacy_url: "https://pocketcoach.example/privacy",
  terms_url: "https://pocketcoach.example/terms",
  account_deletion_url: "https://pocketcoach.example/delete-account",
  collects_email: true,
  has_accounts: true,
  uses_cookies: true,
  uses_analytics: true,
  analytics_tools: ["Firebase Analytics"],
  is_ai_wrapper: true,
  uses_ai_api: true,
  ai_providers: ["OpenAI", "Anthropic"],
  stores_user_content: true,
  stores_user_files: false,
  upload_retention_days: 30,
  has_payments: true,
  payment_provider: "Apple App Store / Google Play",
  has_subscriptions: true,
  has_free_trial: true,
  cancellation_url: "https://pocketcoach.example/billing",
  has_usage_limits: true,
  is_mobile_app: true,
  mobile_platforms: ["iOS", "Android"],
  uses_push_notifications: true,
  uses_crash_reporting: true,
  crash_reporting_tools: ["Firebase Crashlytics"],
  refund_window_days: 14,
  data_retention_days: 365,
  targets_children: false,
  allows_user_generated_content: false,
  allows_sensitive_uploads: false,
  third_parties: [
    "App store provider",
    "Hosting provider",
    "Payment processor",
    "Analytics provider",
    "Crash reporting provider",
    "AI model provider"
  ],
  custom_notes: [
    "Confirm App Store privacy labels match this policy.",
    "Ask your coding agent to verify analytics, AI providers, payments, storage, and deletion flows against the codebase."
  ],
  locales: ["en", "ja", "zh-Hans"]
};

const fieldNames = [
  "app_name",
  "app_url",
  "operator_name",
  "contact_email",
  "governing_law",
  "data_retention_days",
  "ai_providers",
  "analytics_tools",
  "payment_provider",
  "cancellation_url",
  "mobile_platforms",
  "crash_reporting_tools",
  "available_regions",
  "upload_retention_days",
  "custom_notes"
];

const booleanNames = [
  "has_accounts",
  "collects_email",
  "uses_cookies",
  "uses_analytics",
  "is_ai_wrapper",
  "uses_ai_api",
  "stores_user_content",
  "stores_user_files",
  "has_payments",
  "has_subscriptions",
  "has_free_trial",
  "has_usage_limits",
  "is_mobile_app",
  "uses_push_notifications",
  "uses_crash_reporting",
  "targets_children",
  "allows_user_generated_content",
  "allows_sensitive_uploads"
];

form.addEventListener("input", generate);
fileSelect.addEventListener("change", syncPreview);

document.querySelector("#loadExample").addEventListener("click", () => {
  fillForm(exampleConfig);
  generate();
});

document.querySelector("#resetForm").addEventListener("click", () => {
  form.reset();
  generate();
});

document.querySelector("#copyConfig").addEventListener("click", () => copyText(configOutput.value));
document.querySelector("#copyAgent").addEventListener("click", () => copyText(agentOutput.value));
document.querySelector("#downloadCurrent").addEventListener("click", downloadCurrent);

for (const tab of document.querySelectorAll(".tab")) {
  tab.addEventListener("click", () => setTab(tab.dataset.tab));
}

generate();

function buildConfig() {
  const data = new FormData(form);
  const appName = stringValue(data, "app_name");
  const appUrl = stringValue(data, "app_url");
  const cancellationUrl = stringValue(data, "cancellation_url");

  const config = {
    app_name: appName,
    app_url: appUrl,
    operator_name: stringValue(data, "operator_name"),
    operator_type: "individual or small company",
    contact_email: stringValue(data, "contact_email"),
    effective_date: new Date().toISOString().slice(0, 10),
    locales: localeValues(data),
    governing_law: stringValue(data, "governing_law"),
    available_regions: splitList(stringValue(data, "available_regions")),
    audience: "individual users and small teams",
    privacy_url: appUrl ? `${trimSlash(appUrl)}/privacy` : "",
    terms_url: appUrl ? `${trimSlash(appUrl)}/terms` : "",
    account_deletion_url: appUrl ? `${trimSlash(appUrl)}/delete-account` : "",
    collects_email: boolValue(data, "collects_email"),
    has_accounts: boolValue(data, "has_accounts"),
    uses_cookies: boolValue(data, "uses_cookies"),
    uses_analytics: boolValue(data, "uses_analytics"),
    analytics_tools: splitList(stringValue(data, "analytics_tools")),
    is_ai_wrapper: boolValue(data, "is_ai_wrapper"),
    uses_ai_api: boolValue(data, "uses_ai_api"),
    ai_providers: splitList(stringValue(data, "ai_providers")),
    stores_user_content: boolValue(data, "stores_user_content"),
    stores_user_files: boolValue(data, "stores_user_files"),
    upload_retention_days: numberValue(data, "upload_retention_days", 30),
    allows_sensitive_uploads: boolValue(data, "allows_sensitive_uploads"),
    has_newsletter: false,
    has_payments: boolValue(data, "has_payments"),
    payment_provider: stringValue(data, "payment_provider"),
    has_subscriptions: boolValue(data, "has_subscriptions"),
    has_free_trial: boolValue(data, "has_free_trial"),
    cancellation_url: cancellationUrl,
    has_usage_limits: boolValue(data, "has_usage_limits"),
    is_mobile_app: boolValue(data, "is_mobile_app"),
    mobile_platforms: splitList(stringValue(data, "mobile_platforms")),
    uses_push_notifications: boolValue(data, "uses_push_notifications"),
    uses_crash_reporting: boolValue(data, "uses_crash_reporting"),
    crash_reporting_tools: splitList(stringValue(data, "crash_reporting_tools")),
    refund_window_days: 14,
    data_retention_days: numberValue(data, "data_retention_days", 365),
    targets_children: boolValue(data, "targets_children"),
    allows_user_generated_content: boolValue(data, "allows_user_generated_content"),
    third_parties: inferThirdParties(data),
    custom_notes: splitNotes(stringValue(data, "custom_notes"))
  };

  if (!config.has_subscriptions) config.cancellation_url = "";
  if (!config.uses_ai_api) config.ai_providers = [];
  if (!config.uses_analytics) config.analytics_tools = [];
  if (!config.uses_crash_reporting) config.crash_reporting_tools = [];
  if (!config.is_mobile_app) config.mobile_platforms = [];

  return normalizeConfig(config);
}

function generate() {
  currentConfig = buildConfig();
  const validation = validateConfig(currentConfig);
  generatedFiles = generateFiles(currentConfig);

  configOutput.value = JSON.stringify(currentConfig, null, 2);
  agentOutput.value = agentPrompt(currentConfig);
  renderWarnings(validation);
  renderFileSelect();
  syncPreview();

  statusLine.textContent = `${generatedFiles.size} files ready. Not legal advice. Review before publishing.`;
}

function generateFiles(config) {
  const files = new Map();
  const multiLocale = config.locales.length > 1;

  for (const locale of config.locales) {
    const localizedConfig = localizeConfig(config, locale);
    const prefix = multiLocale ? `${locale}/` : "";

    for (const document of documents) {
      const template = TEMPLATES[locale]?.[document] || TEMPLATES.en[document];
      const markdown = tidyMarkdown(renderTemplate(template, localizedConfig));
      const html = renderHtml(markdown, localizedConfig, titleFromName(document, locale), locale);
      files.set(`${prefix}${document}.md`, markdown);
      files.set(`${prefix}${document}.html`, html);
    }

    const flags = renderReviewFlags(localizedConfig, locale);
    files.set(`${prefix}review-flags.md`, flags);
    files.set(`${prefix}review-flags.html`, renderHtml(flags, localizedConfig, titleForLocale("Review Flags", locale), locale));
  }

  files.set("legal.config.json", JSON.stringify(config, null, 2));
  files.set("agent-prompt.txt", agentPrompt(config));

  return files;
}

function normalizeConfig(input) {
  const config = {
    app_name: "",
    app_url: "",
    operator_name: "",
    operator_type: "",
    contact_email: "",
    effective_date: new Date().toISOString().slice(0, 10),
    governing_law: "",
    available_regions: [],
    audience: "users",
    privacy_url: "",
    terms_url: "",
    account_deletion_url: "",
    collects_email: false,
    has_accounts: false,
    uses_cookies: false,
    uses_analytics: false,
    analytics_tools: [],
    is_ai_wrapper: false,
    uses_ai_api: false,
    ai_providers: [],
    stores_user_content: false,
    stores_user_files: false,
    upload_retention_days: 30,
    allows_sensitive_uploads: false,
    has_newsletter: false,
    has_payments: false,
    payment_provider: "",
    has_subscriptions: false,
    has_free_trial: false,
    cancellation_url: "",
    has_usage_limits: false,
    is_mobile_app: false,
    mobile_platforms: [],
    uses_push_notifications: false,
    uses_crash_reporting: false,
    crash_reporting_tools: [],
    refund_window_days: 14,
    data_retention_days: 365,
    targets_children: false,
    allows_user_generated_content: false,
    third_parties: [],
    custom_notes: [],
    locales: ["en"],
    ...input
  };

  config.locales = asArray(config.locales).filter((locale) => supportedLocales.has(locale));
  if (!config.locales.length) config.locales = ["en"];
  config.available_regions = asArray(config.available_regions);
  config.analytics_tools = asArray(config.analytics_tools);
  config.ai_providers = asArray(config.ai_providers);
  config.mobile_platforms = asArray(config.mobile_platforms);
  config.crash_reporting_tools = asArray(config.crash_reporting_tools);
  config.third_parties = asArray(config.third_parties);
  config.custom_notes = asArray(config.custom_notes);

  config.available_regions_text = listText(config.available_regions);
  config.analytics_tools_text = listText(config.analytics_tools, "your analytics provider");
  config.ai_providers_text = listText(config.ai_providers, "your AI provider");
  config.mobile_platforms_text = listText(config.mobile_platforms, "your mobile platforms");
  config.crash_reporting_tools_text = listText(config.crash_reporting_tools, "your crash reporting provider");
  config.third_parties_text = listText(config.third_parties, "service providers");

  return config;
}

function validateConfig(config) {
  const errors = [];
  const warnings = [];

  for (const key of ["app_name", "app_url", "operator_name", "contact_email"]) {
    if (!String(config[key] || "").trim()) errors.push(`Missing required field: ${key}`);
  }

  if (config.has_payments && !config.payment_provider) warnings.push("has_payments is true but payment_provider is empty.");
  if (config.uses_analytics && config.analytics_tools.length === 0) warnings.push("uses_analytics is true but analytics_tools is empty.");
  if (config.uses_ai_api && config.ai_providers.length === 0) warnings.push("uses_ai_api is true but ai_providers is empty.");
  if (config.is_ai_wrapper && !config.uses_ai_api) warnings.push("is_ai_wrapper is true but uses_ai_api is false.");
  if (config.stores_user_files && config.allows_sensitive_uploads) {
    warnings.push("allows_sensitive_uploads is true. Review sensitive data handling, retention, and security before launch.");
  }
  if (config.is_mobile_app && config.mobile_platforms.length === 0) warnings.push("is_mobile_app is true but mobile_platforms is empty.");
  if (config.uses_crash_reporting && config.crash_reporting_tools.length === 0) {
    warnings.push("uses_crash_reporting is true but crash_reporting_tools is empty.");
  }
  if (config.has_subscriptions && !config.cancellation_url) warnings.push("has_subscriptions is true but cancellation_url is empty.");
  if (config.targets_children) warnings.push("targets_children is true. This starter kit is not enough without legal review.");
  if (config.allows_user_generated_content) {
    warnings.push("allows_user_generated_content is true. Add moderation, reporting, IP, and takedown terms.");
  }
  if (regionIncludes(config.available_regions, ["eu", "eea", "uk", "gb"])) {
    warnings.push("EU/UK availability detected. Review GDPR/UK GDPR disclosures and legal bases.");
  }
  if (regionIncludes(config.available_regions, ["ca", "california"])) {
    warnings.push("California availability detected. Review CCPA/CPRA applicability and notices.");
  }

  return { errors, warnings };
}

function localizeConfig(config, locale) {
  return {
    ...config,
    locale,
    locale_label: localeLabels[locale] || locale,
    available_regions_text: listText(config.available_regions, "none listed", locale),
    analytics_tools_text: listText(config.analytics_tools, "your analytics provider", locale),
    ai_providers_text: listText(config.ai_providers, "your AI provider", locale),
    mobile_platforms_text: listText(config.mobile_platforms, "your mobile platforms", locale),
    crash_reporting_tools_text: listText(config.crash_reporting_tools, "your crash reporting provider", locale),
    third_parties_text: listText(config.third_parties, "service providers", locale)
  };
}

function renderTemplate(template, config) {
  let output = template;

  output = output.replace(/\{\{#each ([a-zA-Z0-9_]+)\}\}([\s\S]*?)\{\{\/each\}\}/g, (_match, key, block) => {
    const values = asArray(config[key]);
    return values.map((value) => block.replace(/\{\{this\}\}/g, escapeMarkdown(String(value)))).join("");
  });

  output = output.replace(/\{\{#if ([a-zA-Z0-9_]+)\}\}([\s\S]*?)\{\{\/if\}\}/g, (_match, key, block) => {
    return config[key] ? block : "";
  });

  output = output.replace(/\{\{#unless ([a-zA-Z0-9_]+)\}\}([\s\S]*?)\{\{\/unless\}\}/g, (_match, key, block) => {
    return config[key] ? "" : block;
  });

  output = output.replace(/\{\{([a-zA-Z0-9_]+)\}\}/g, (_match, key) => {
    const value = config[key];
    if (Array.isArray(value)) return escapeMarkdown(listText(value));
    if (value === undefined || value === null) return "";
    return escapeMarkdown(String(value));
  });

  return output.trimEnd() + "\n";
}

function renderReviewFlags(config, locale = "en") {
  const { errors, warnings } = validateConfig(config);
  const notes = [];

  if (!config.privacy_url) notes.push("Add a public Privacy Policy URL.");
  if (!config.terms_url) notes.push("Add a public Terms of Service URL.");
  if (!config.account_deletion_url && config.has_accounts) notes.push("Add an account deletion URL for users with accounts.");
  if (!config.third_parties.length) notes.push("List the third-party services that receive or process user data.");
  if (!config.custom_notes.length) notes.push("Add product-specific notes for anything the templates do not cover.");

  return [
    `# ${titleForLocale("Review Flags", locale)}`,
    "",
    `${labelForLocale("Generated for", locale)}: ${config.app_name}`,
    "",
    sentenceForLocale("builderOnly", locale),
    "",
    `## ${titleForLocale("Errors", locale)}`,
    "",
    ...checkboxLines(localizeDiagnostics(errors, locale), sentenceForLocale("noErrors", locale)),
    "",
    `## ${titleForLocale("Warnings", locale)}`,
    "",
    ...checkboxLines(localizeDiagnostics(warnings, locale), sentenceForLocale("noWarnings", locale)),
    "",
    `## ${titleForLocale("Follow-Up Notes", locale)}`,
    "",
    ...checkboxLines(localizeDiagnostics(notes, locale), sentenceForLocale("noNotes", locale)),
    ""
  ].join("\n");
}

function renderHtml(markdown, config, title, locale = "en") {
  return `<!doctype html>
<html lang="${htmlLang(locale)}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(`${title} - ${config.app_name || "Legal Pages"}`)}</title>
  <style>
    :root { color-scheme: light dark; }
    body { font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; line-height: 1.6; margin: 0; color: #172026; background: #f7f5ef; }
    main { max-width: 820px; margin: 0 auto; padding: 48px 20px 80px; background: #fffdf8; min-height: 100vh; }
    h1, h2 { line-height: 1.2; color: #101820; }
    h1 { font-size: 2.2rem; margin: 0 0 24px; }
    h2 { font-size: 1.35rem; margin-top: 34px; }
    a { color: #0f6b63; }
    code { background: #efede6; padding: 0.12rem 0.28rem; border-radius: 4px; }
    li { margin: 0.35rem 0; }
    @media (prefers-color-scheme: dark) {
      body { color: #edf2ee; background: #121614; }
      main { background: #171d1a; }
      h1, h2 { color: #f5f7f2; }
      a { color: #8dd8cc; }
      code { background: #26302c; }
    }
  </style>
</head>
<body>
  <main>
${markdownToHtml(markdown)}
  </main>
</body>
</html>
`;
}

function markdownToHtml(markdown) {
  const lines = markdown.split(/\r?\n/);
  const out = [];
  let inList = false;

  for (const line of lines) {
    if (line.startsWith("# ")) {
      if (inList) {
        out.push("</ul>");
        inList = false;
      }
      out.push(`<h1>${inlineMarkdown(line.slice(2))}</h1>`);
    } else if (line.startsWith("## ")) {
      if (inList) {
        out.push("</ul>");
        inList = false;
      }
      out.push(`<h2>${inlineMarkdown(line.slice(3))}</h2>`);
    } else if (line.startsWith("- ")) {
      if (!inList) {
        out.push("<ul>");
        inList = true;
      }
      out.push(`  <li>${inlineMarkdown(line.slice(2))}</li>`);
    } else if (line.trim() === "") {
      if (inList) {
        out.push("</ul>");
        inList = false;
      }
    } else {
      if (inList) {
        out.push("</ul>");
        inList = false;
      }
      out.push(`<p>${inlineMarkdown(line)}</p>`);
    }
  }

  if (inList) out.push("</ul>");
  return out.map((line) => `    ${line}`).join("\n");
}

function renderFileSelect() {
  const previous = fileSelect.value;
  fileSelect.replaceChildren();

  for (const name of generatedFiles.keys()) {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    fileSelect.append(option);
  }

  fileSelect.value = generatedFiles.has(previous) ? previous : "en/privacy-policy.md";
  if (!fileSelect.value) fileSelect.selectedIndex = 0;
}

function syncPreview() {
  previewOutput.value = generatedFiles.get(fileSelect.value) || "";
}

function renderWarnings({ errors, warnings }) {
  const items = [...errors, ...warnings];
  warningsBox.hidden = items.length === 0;
  if (!items.length) {
    warningsBox.innerHTML = "";
    return;
  }

  warningsBox.innerHTML = `<strong>Review flags</strong><ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function setTab(name) {
  for (const tab of document.querySelectorAll(".tab")) {
    tab.classList.toggle("active", tab.dataset.tab === name);
  }

  document.querySelector("#previewTab").hidden = name !== "preview";
  document.querySelector("#configTab").hidden = name !== "config";
  document.querySelector("#agentTab").hidden = name !== "agent";
}

function downloadCurrent() {
  const name = fileSelect.value || "open-legal-kit-draft.md";
  const content = generatedFiles.get(name) || "";
  const blob = new Blob([content], { type: name.endsWith(".html") ? "text/html" : "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = name.split("/").join("-");
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

async function copyText(value) {
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    const helper = document.createElement("textarea");
    helper.value = value;
    document.body.append(helper);
    helper.select();
    document.execCommand("copy");
    helper.remove();
  }
  statusLine.textContent = "Copied. Ask your coding agent to verify uncertain facts before publishing.";
}

function fillForm(config) {
  for (const name of fieldNames) {
    const field = form.elements[name];
    if (!field) continue;
    const value = config[name];
    if (Array.isArray(value)) {
      field.value = name === "custom_notes" ? value.join("\n") : value.join(", ");
    } else {
      field.value = value ?? "";
    }
  }

  for (const name of booleanNames) {
    const field = form.elements[name];
    if (field) field.checked = Boolean(config[name]);
  }

  form.elements.locale_en.checked = config.locales.includes("en");
  form.elements.locale_ja.checked = config.locales.includes("ja");
  form.elements.locale_zh.checked = config.locales.includes("zh-Hans");
}

function agentPrompt(config) {
  return `Use open-legal-kit to generate legal hygiene pages for this app.

Create or update ./legal.config.json with the draft config below, then inspect this app and verify it.

Do not invent uncertain facts. If the config misses analytics, AI providers, payments, file uploads, storage, deletion flows, mobile permissions, push notifications, crash reporting, or usage limits, update it.

If something is unclear, add it to custom_notes and keep it visible in review-flags.md.

Then run:

npx open-legal-kit@latest check --config ./legal.config.json
npx open-legal-kit@latest generate --config ./legal.config.json --out ./docs/legal

Current draft config:

${JSON.stringify(config, null, 2)}
`;
}

function inferThirdParties(data) {
  const parties = ["Hosting provider"];
  if (boolValue(data, "has_payments")) parties.push("Payment processor");
  if (boolValue(data, "uses_analytics")) parties.push("Analytics provider");
  if (boolValue(data, "uses_ai_api")) parties.push("AI model provider");
  if (boolValue(data, "stores_user_files")) parties.push("File storage provider");
  if (boolValue(data, "is_mobile_app")) parties.push("App store provider");
  if (boolValue(data, "uses_crash_reporting")) parties.push("Crash reporting provider");
  return [...new Set(parties)];
}

function stringValue(data, name) {
  return String(data.get(name) || "").trim();
}

function boolValue(data, name) {
  return data.get(name) === "on";
}

function numberValue(data, name, fallback) {
  const parsed = Number(data.get(name));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function localeValues(data) {
  const locales = [];
  if (data.get("locale_en")) locales.push("en");
  if (data.get("locale_ja")) locales.push("ja");
  if (data.get("locale_zh")) locales.push("zh-Hans");
  return locales.length ? locales : ["en"];
}

function splitList(value) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function splitNotes(value) {
  return value
    .split(/\r?\n/u)
    .map((item) => item.trim())
    .filter(Boolean);
}

function trimSlash(value) {
  return String(value).replace(/\/+$/u, "");
}

function tidyMarkdown(markdown) {
  const lines = markdown.replace(/\n{3,}/g, "\n\n").split("\n");
  const compacted = [];

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const previous = compacted.at(-1) || "";
    const next = lines[i + 1] || "";
    if (line.trim() === "" && previous.startsWith("- ") && next.startsWith("- ")) continue;
    compacted.push(line);
  }

  return compacted.join("\n").trimEnd() + "\n";
}

function asArray(value) {
  if (Array.isArray(value)) return value;
  if (value === undefined || value === null || value === "") return [];
  return [value];
}

function listText(values, fallback = "none listed", locale = "en") {
  const clean = values.map((value) => String(value).trim()).filter(Boolean);
  if (clean.length === 0) return fallback;
  if (clean.length === 1) return clean[0];
  if (locale === "ja") return clean.join("、");
  if (locale === "zh-Hans") return clean.join("、");
  if (clean.length === 2) return `${clean[0]} and ${clean[1]}`;
  return `${clean.slice(0, -1).join(", ")}, and ${clean.at(-1)}`;
}

function checkboxLines(items, emptyText) {
  if (!items.length) return [`- ${emptyText}`];
  return items.map((item) => `- [ ] ${item}`);
}

function regionIncludes(regions, aliases) {
  const lowered = regions.map((region) => String(region).toLowerCase());
  return aliases.some((alias) => lowered.includes(alias));
}

function titleFromName(name, locale = "en") {
  const localized = {
    ja: {
      "privacy-policy": "プライバシーポリシー",
      "terms-of-service": "利用規約",
      "account-data-deletion": "アカウントおよびデータ削除",
      "payment-refund-terms": "支払いおよび返金条件",
      "ai-content-disclaimer": "AIコンテンツに関する免責事項",
      "launch-checklist": "ローンチ前チェックリスト"
    },
    "zh-Hans": {
      "privacy-policy": "隐私政策",
      "terms-of-service": "服务条款",
      "account-data-deletion": "账号和数据删除",
      "payment-refund-terms": "付款与退款条款",
      "ai-content-disclaimer": "AI 内容免责声明",
      "launch-checklist": "发布前检查清单"
    }
  };

  if (localized[locale]?.[name]) return localized[locale][name];
  return name.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}

function htmlLang(locale) {
  if (locale === "zh-Hans") return "zh-Hans";
  if (locale === "ja") return "ja";
  return "en";
}

function titleForLocale(title, locale) {
  const titles = {
    ja: {
      "Review Flags": "レビュー項目",
      Errors: "エラー",
      Warnings: "警告",
      "Follow-Up Notes": "追加確認"
    },
    "zh-Hans": {
      "Review Flags": "审核提示",
      Errors: "错误",
      Warnings: "警告",
      "Follow-Up Notes": "后续检查"
    }
  };

  return titles[locale]?.[title] || title;
}

function labelForLocale(label, locale) {
  const labels = {
    ja: { "Generated for": "生成対象" },
    "zh-Hans": { "Generated for": "生成对象" }
  };

  return labels[locale]?.[label] || label;
}

function sentenceForLocale(key, locale) {
  const sentences = {
    en: {
      builderOnly: "This file is for the builder, not for publication.",
      noErrors: "No blocking config errors detected.",
      noWarnings: "No high-risk warnings detected from this config.",
      noNotes: "No follow-up notes detected."
    },
    ja: {
      builderOnly: "このファイルは開発者向けです。公開ページとして使うものではありません。",
      noErrors: "ブロック対象の設定エラーは見つかりませんでした。",
      noWarnings: "この設定からは高リスクの警告は見つかりませんでした。",
      noNotes: "追加確認項目は見つかりませんでした。"
    },
    "zh-Hans": {
      builderOnly: "此文件供开发者内部审核使用，不应作为公开页面发布。",
      noErrors: "未发现阻塞性的配置错误。",
      noWarnings: "未从此配置中发现高风险警告。",
      noNotes: "未发现后续检查项。"
    }
  };

  return sentences[locale]?.[key] || sentences.en[key];
}

function localizeDiagnostics(items, locale) {
  if (locale === "en") return items;
  return items.map((item) => diagnosticTranslations[locale]?.[item] || item);
}

const diagnosticTranslations = {
  ja: {
    "Add a public Privacy Policy URL.": "公開用のプライバシーポリシーURLを追加してください。",
    "Add a public Terms of Service URL.": "公開用の利用規約URLを追加してください。",
    "Add an account deletion URL for users with accounts.": "アカウント利用者向けのアカウント削除URLを追加してください。",
    "List the third-party services that receive or process user data.": "ユーザーデータを受領または処理する第三者サービスを列挙してください。",
    "Add product-specific notes for anything the templates do not cover.": "テンプレートでカバーできない製品固有の注意点を追加してください。"
  },
  "zh-Hans": {
    "Add a public Privacy Policy URL.": "请添加公开的隐私政策 URL。",
    "Add a public Terms of Service URL.": "请添加公开的服务条款 URL。",
    "Add an account deletion URL for users with accounts.": "请为有账号的用户添加账号删除 URL。",
    "List the third-party services that receive or process user data.": "请列出接收或处理用户数据的第三方服务。",
    "Add product-specific notes for anything the templates do not cover.": "请为模板未覆盖的产品特定事项添加说明。"
  }
};

function inlineMarkdown(text) {
  return escapeHtml(text).replace(/`([^`]+)`/g, "<code>$1</code>");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeMarkdown(value) {
  return value.replace(/\r?\n/g, " ");
}
