# Launch Copy

Draft copy for announcing `open-legal-kit`.

The tone should stay careful: this is not legal advice, not a compliance
guarantee, and not a replacement for a lawyer. The value is helping indie
builders stop launching with no public legal pages at all.

## One-Line Description

English:

```text
Open-source legal hygiene starter kit for AI-built indie apps.
```

Japanese:

```text
AI個人開発アプリ向けの、オープンソースなリーガル衛生スターターキット。
```

Simplified Chinese:

```text
面向 AI 独立开发应用的开源法律卫生 starter kit。
```

## GitHub Short Description

```text
Generate Privacy Policy, Terms, deletion, payment/refund, and AI disclaimer pages for AI-built indie apps.
```

## X Launch Post

English:

```text
AI coding makes it easier than ever to launch a real app.

But I keep seeing tiny products with no Privacy Policy, no Terms, no deletion page, no AI disclaimer.

So I started open-legal-kit:
an open-source legal hygiene starter kit for AI-built indie apps.

It generates Markdown + HTML drafts for:
- Privacy Policy
- Terms of Service
- Account/Data Deletion
- Payment/Refund Terms
- AI Content Disclaimer
- Launch Checklist

It supports English, Japanese, and Simplified Chinese.

Not legal advice.
Not a compliance guarantee.
Just a better starting point than launching with nothing.
```

Japanese:

```text
AIコーディングで、個人でも本物のアプリを一気に出せるようになった。

一方で、プライバシーポリシーも利用規約も削除ページもAI免責もないまま公開されている小さなサービスをよく見る。

そこで open-legal-kit を作り始めた。
AI個人開発アプリ向けの、オープンソースなリーガル衛生スターターキット。

生成できるもの:
- プライバシーポリシー
- 利用規約
- アカウント/データ削除
- 支払い/返金条件
- AIコンテンツ免責
- ローンチ前チェックリスト

英語、日本語、簡体字中国語に対応。

法務アドバイスではない。
コンプライアンス保証でもない。
でも、何も置かずに公開するよりはずっと良い出発点にしたい。
```

Simplified Chinese:

```text
AI coding 让个人开发者比以往更容易发布一个真正可用的应用。

但我也经常看到一些小产品上线时没有隐私政策、没有服务条款、没有删除页面，也没有 AI 免责声明。

所以我开始做 open-legal-kit：
面向 AI 独立开发应用的开源法律卫生 starter kit。

它可以生成 Markdown + HTML 草稿：
- 隐私政策
- 服务条款
- 账号/数据删除
- 付款与退款条款
- AI 内容免责声明
- 发布前检查清单

支持英文、日文、简体中文。

不是法律建议。
不是合规保证。
只是希望它能成为比“什么都没有就上线”更好的起点。
```

## Shorter X Post

```text
building open-legal-kit:
an open-source legal hygiene starter kit for AI-built indie apps.

config in -> Privacy Policy, Terms, deletion page, payment/refund terms, AI disclaimer, launch checklist out.

npx-friendly, so you can ask your coding agent to run it directly.

Markdown + HTML.
English / Japanese / Simplified Chinese.

not legal advice.
better than launching with nothing.
```

## Web Wizard Post

English:

```text
added a local web wizard to open-legal-kit.

run:
npx open-legal-kit@latest web

pick your app shape in the browser, draft the config + legal pages, then hand the generated agent prompt to Codex/Claude/Cursor so it can inspect the real codebase and fix uncertain facts.

not legal advice.
but much better than shipping with an empty footer.
```

Japanese:

```text
open-legal-kit にローカルWebウィザードを追加した。

実行:
npx open-legal-kit@latest web

ブラウザでアプリの形を選ぶと、設定と法務ページ草案を作れる。
最後に生成されたエージェント向けプロンプトを Codex / Claude / Cursor に渡して、実際のコードベースと照合してもらう。

法務アドバイスではない。
でも、フッターが空のまま公開するよりはかなり良い出発点になるはず。
```

## Follow-Up Post Ideas

```text
the goal is not to replace lawyers.

the goal is to make the first boring-but-important step easier for indie builders:

tell users what you collect, why you collect it, who processes it, how long you keep it, and how deletion works.
```

```text
AI-built apps often have AI-specific legal hygiene issues:

- prompts and outputs
- third-party model providers
- uploaded files
- subscriptions and usage limits
- app store privacy labels
- account deletion

open-legal-kit tries to turn those into config fields and draft pages.
```

```text
the most important line in open-legal-kit:

not legal advice.
not a compliance guarantee.
just a better starting point than launching with nothing.
```

## Reply Copy

When someone says templates are risky:

```text
agreed. that’s why i’m framing it as legal hygiene, not legal coverage.

the kit should make data flows visible and create a better draft, but it should also tell builders when they need real legal review.
```

When someone asks why not use a policy generator:

```text
policy generators are useful.

the niche here is AI-built indie apps: AI providers, prompts/outputs, file uploads, subscriptions, app store privacy, no-account tools, and multilingual drafts in one open config.
```

When someone asks whether it covers their app:

```text
maybe as a starting point, but not as a guarantee.

if your app touches children, health, finance, employment, biometrics, sensitive data, or meaningful EU/California scale, treat it as “needs legal review.”
```
