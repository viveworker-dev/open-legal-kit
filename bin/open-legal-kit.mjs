#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const templateDir = path.join(rootDir, "templates");
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

function usage() {
  console.log(`open-legal-kit

Usage:
  open-legal-kit generate --config ./config.json --out ./dist
  open-legal-kit check --config ./config.json

Options:
  --config <path>   JSON config file
  --out <path>      Output directory for generated pages
`);
}

function parseArgs(argv) {
  const [command, ...rest] = argv;
  const options = { command };

  if (command === "--help" || command === "-h") {
    options.help = true;
    return options;
  }

  for (let i = 0; i < rest.length; i += 1) {
    const arg = rest[i];
    if (arg === "--config") {
      options.config = rest[i + 1];
      i += 1;
    } else if (arg === "--out") {
      options.out = rest[i + 1];
      i += 1;
    } else if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return options;
}

async function readConfig(configPath) {
  if (!configPath) {
    throw new Error("Missing --config <path>");
  }

  const absolutePath = path.resolve(process.cwd(), configPath);
  const raw = await fs.readFile(absolutePath, "utf8");
  return JSON.parse(raw);
}

function normalizeConfig(input) {
  const today = new Date().toISOString().slice(0, 10);
  const config = {
    app_name: "",
    app_url: "",
    operator_name: "",
    operator_type: "",
    contact_email: "",
    effective_date: today,
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

  config.locales = asArray(config.locales).length ? asArray(config.locales) : ["en"];
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

function validateConfig(config) {
  const errors = [];
  const warnings = [];

  for (const key of ["app_name", "app_url", "operator_name", "contact_email"]) {
    if (!String(config[key] || "").trim()) {
      errors.push(`Missing required field: ${key}`);
    }
  }

  if (config.has_payments && !config.payment_provider) {
    warnings.push("has_payments is true but payment_provider is empty.");
  }

  if (config.uses_analytics && config.analytics_tools.length === 0) {
    warnings.push("uses_analytics is true but analytics_tools is empty.");
  }

  if (config.uses_ai_api && config.ai_providers.length === 0) {
    warnings.push("uses_ai_api is true but ai_providers is empty.");
  }

  if (config.is_ai_wrapper && !config.uses_ai_api) {
    warnings.push("is_ai_wrapper is true but uses_ai_api is false.");
  }

  if (config.stores_user_files && config.allows_sensitive_uploads) {
    warnings.push("allows_sensitive_uploads is true. Review sensitive data handling, retention, and security before launch.");
  }

  if (config.is_mobile_app && config.mobile_platforms.length === 0) {
    warnings.push("is_mobile_app is true but mobile_platforms is empty.");
  }

  if (config.uses_crash_reporting && config.crash_reporting_tools.length === 0) {
    warnings.push("uses_crash_reporting is true but crash_reporting_tools is empty.");
  }

  if (config.has_subscriptions && !config.cancellation_url) {
    warnings.push("has_subscriptions is true but cancellation_url is empty.");
  }

  if (config.targets_children) {
    warnings.push("targets_children is true. This starter kit is not enough without legal review.");
  }

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

function regionIncludes(regions, aliases) {
  const lowered = regions.map((region) => String(region).toLowerCase());
  return aliases.some((alias) => lowered.includes(alias));
}

async function generate(config, outDir) {
  const absoluteOut = path.resolve(process.cwd(), outDir || "dist");
  await fs.mkdir(absoluteOut, { recursive: true });
  const multiLocale = config.locales.length > 1;

  for (const locale of config.locales) {
    const localeOut = multiLocale ? path.join(absoluteOut, locale) : absoluteOut;
    await fs.mkdir(localeOut, { recursive: true });
    const localizedConfig = {
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

    for (const name of documents) {
      const template = await readTemplate(locale, name);
      const markdown = tidyMarkdown(renderTemplate(template, localizedConfig));
      const html = renderHtml(markdown, localizedConfig, titleFromName(name, locale), locale);

      await fs.writeFile(path.join(localeOut, `${name}.md`), markdown, "utf8");
      await fs.writeFile(path.join(localeOut, `${name}.html`), html, "utf8");
    }

    const flags = renderReviewFlags(localizedConfig, locale);
    await fs.writeFile(path.join(localeOut, "review-flags.md"), flags, "utf8");
    await fs.writeFile(
      path.join(localeOut, "review-flags.html"),
      renderHtml(flags, localizedConfig, titleForLocale("Review Flags", locale), locale),
      "utf8"
    );
  }

  return absoluteOut;
}

async function readTemplate(locale, name) {
  const localizedPath = path.join(templateDir, locale, `${name}.md`);
  try {
    return await fs.readFile(localizedPath, "utf8");
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }

  return fs.readFile(path.join(templateDir, `${name}.md`), "utf8");
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

function tidyMarkdown(markdown) {
  const lines = markdown.replace(/\n{3,}/g, "\n\n").split("\n");
  const compacted = [];

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const previous = compacted.at(-1) || "";
    const next = lines[i + 1] || "";

    if (line.trim() === "" && previous.startsWith("- ") && next.startsWith("- ")) {
      continue;
    }

    compacted.push(line);
  }

  return compacted.join("\n").trimEnd() + "\n";
}

function renderReviewFlags(config, locale = "en") {
  const { errors, warnings } = validateConfig(config);
  const notes = [];

  if (!config.privacy_url) notes.push("Add a public Privacy Policy URL.");
  if (!config.terms_url) notes.push("Add a public Terms of Service URL.");
  if (!config.account_deletion_url && config.has_accounts) {
    notes.push("Add an account deletion URL for users with accounts.");
  }
  if (!config.third_parties.length) {
    notes.push("List the third-party services that receive or process user data.");
  }
  if (!config.custom_notes.length) {
    notes.push("Add product-specific notes for anything the templates do not cover.");
  }

  const lines = [
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
  ];

  return lines.join("\n");
}

function checkboxLines(items, emptyText) {
  if (!items.length) return [`- ${emptyText}`];
  return items.map((item) => `- [ ] ${item}`);
}

function renderHtml(markdown, config, title, locale = "en") {
  const body = markdownToHtml(markdown);
  const pageTitle = `${title} - ${config.app_name || "Legal Pages"}`;

  return `<!doctype html>
<html lang="${htmlLang(locale)}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(pageTitle)}</title>
  <style>
    :root { color-scheme: light dark; }
    body {
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      line-height: 1.6;
      margin: 0;
      color: #172026;
      background: #f7f5ef;
    }
    main {
      max-width: 820px;
      margin: 0 auto;
      padding: 48px 20px 80px;
      background: #fffdf8;
      min-height: 100vh;
    }
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
${body}
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

function inlineMarkdown(text) {
  const escaped = escapeHtml(text);
  return escaped.replace(/`([^`]+)`/g, "<code>$1</code>");
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

  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
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
    "Add product-specific notes for anything the templates do not cover.": "テンプレートでカバーできない製品固有の注意点を追加してください。",
    "has_payments is true but payment_provider is empty.": "has_payments が true ですが payment_provider が空です。",
    "uses_analytics is true but analytics_tools is empty.": "uses_analytics が true ですが analytics_tools が空です。",
    "uses_ai_api is true but ai_providers is empty.": "uses_ai_api が true ですが ai_providers が空です。",
    "is_ai_wrapper is true but uses_ai_api is false.": "is_ai_wrapper が true ですが uses_ai_api が false です。",
    "allows_sensitive_uploads is true. Review sensitive data handling, retention, and security before launch.": "allows_sensitive_uploads が true です。公開前にセンシティブデータの取り扱い、保存期間、セキュリティを確認してください。",
    "is_mobile_app is true but mobile_platforms is empty.": "is_mobile_app が true ですが mobile_platforms が空です。",
    "uses_crash_reporting is true but crash_reporting_tools is empty.": "uses_crash_reporting が true ですが crash_reporting_tools が空です。",
    "has_subscriptions is true but cancellation_url is empty.": "has_subscriptions が true ですが cancellation_url が空です。",
    "targets_children is true. This starter kit is not enough without legal review.": "targets_children が true です。法務レビューなしではこのスターターキットだけでは不十分です。",
    "allows_user_generated_content is true. Add moderation, reporting, IP, and takedown terms.": "allows_user_generated_content が true です。モデレーション、通報、知的財産、削除対応の条件を追加してください。",
    "EU/UK availability detected. Review GDPR/UK GDPR disclosures and legal bases.": "EU/UK向け提供が検出されました。GDPR/UK GDPRの開示事項と法的根拠を確認してください。",
    "California availability detected. Review CCPA/CPRA applicability and notices.": "カリフォルニア向け提供が検出されました。CCPA/CPRAの適用可能性と通知を確認してください。"
  },
  "zh-Hans": {
    "Add a public Privacy Policy URL.": "请添加公开的隐私政策 URL。",
    "Add a public Terms of Service URL.": "请添加公开的服务条款 URL。",
    "Add an account deletion URL for users with accounts.": "请为有账号的用户添加账号删除 URL。",
    "List the third-party services that receive or process user data.": "请列出接收或处理用户数据的第三方服务。",
    "Add product-specific notes for anything the templates do not cover.": "请为模板未覆盖的产品特定事项添加说明。",
    "has_payments is true but payment_provider is empty.": "has_payments 为 true，但 payment_provider 为空。",
    "uses_analytics is true but analytics_tools is empty.": "uses_analytics 为 true，但 analytics_tools 为空。",
    "uses_ai_api is true but ai_providers is empty.": "uses_ai_api 为 true，但 ai_providers 为空。",
    "is_ai_wrapper is true but uses_ai_api is false.": "is_ai_wrapper 为 true，但 uses_ai_api 为 false。",
    "allows_sensitive_uploads is true. Review sensitive data handling, retention, and security before launch.": "allows_sensitive_uploads 为 true。发布前请审核敏感数据处理、保留期限和安全措施。",
    "is_mobile_app is true but mobile_platforms is empty.": "is_mobile_app 为 true，但 mobile_platforms 为空。",
    "uses_crash_reporting is true but crash_reporting_tools is empty.": "uses_crash_reporting 为 true，但 crash_reporting_tools 为空。",
    "has_subscriptions is true but cancellation_url is empty.": "has_subscriptions 为 true，但 cancellation_url 为空。",
    "targets_children is true. This starter kit is not enough without legal review.": "targets_children 为 true。没有法律审核时，此 starter kit 不足以覆盖该场景。",
    "allows_user_generated_content is true. Add moderation, reporting, IP, and takedown terms.": "allows_user_generated_content 为 true。请补充审核、举报、知识产权和下架相关条款。",
    "EU/UK availability detected. Review GDPR/UK GDPR disclosures and legal bases.": "检测到面向 EU/UK 提供服务。请审核 GDPR/UK GDPR 披露事项和法律依据。",
    "California availability detected. Review CCPA/CPRA applicability and notices.": "检测到面向加州提供服务。请审核 CCPA/CPRA 适用性和通知要求。"
  }
};

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

async function main() {
  const options = parseArgs(process.argv.slice(2));

  if (!options.command || options.help) {
    usage();
    return;
  }

  const config = normalizeConfig(await readConfig(options.config));
  const unsupportedLocales = config.locales.filter((locale) => !supportedLocales.has(locale));
  if (unsupportedLocales.length) {
    throw new Error(`Unsupported locale(s): ${unsupportedLocales.join(", ")}`);
  }
  const result = validateConfig(config);

  if (options.command === "check") {
    printCheck(result);
    if (result.errors.length) process.exitCode = 1;
    return;
  }

  if (options.command === "generate") {
    printCheck(result);
    if (result.errors.length) {
      process.exitCode = 1;
      return;
    }
    const outDir = await generate(config, options.out);
    console.log(`\nGenerated legal starter pages in ${outDir}`);
    return;
  }

  throw new Error(`Unknown command: ${options.command}`);
}

function printCheck({ errors, warnings }) {
  if (errors.length) {
    console.error("Errors:");
    for (const error of errors) console.error(`- ${error}`);
  } else {
    console.log("No blocking config errors detected.");
  }

  if (warnings.length) {
    console.warn("\nWarnings:");
    for (const warning of warnings) console.warn(`- ${warning}`);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
