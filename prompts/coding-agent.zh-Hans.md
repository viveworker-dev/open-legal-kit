# AI 编程代理提示词

可用于 Codex、Claude、Cursor、Devin 或其他 AI 编程代理。

```text
请使用 open-legal-kit 为这个应用生成法律卫生页面。

任务:
1. 检查这个代码库。
2. 为 open-legal-kit 创建 `legal.config.json`。
3. 运行 config check。
4. 将 Markdown 和 HTML 页面生成到 `docs/legal`。
5. 总结你推断出的内容，以及仍需人工审核的事项。

请尽可能准确地推断:
- 应用名称和公开 URL
- 运营者/联系信息占位符
- 如果明显的话，提供服务的地区
- 是否有账号系统
- 收集了哪些用户数据
- 是否使用 analytics / cookies / local storage
- 是否使用 AI API，以及使用哪些提供商
- 是否存储 prompts、outputs、files、messages 或 user content
- 是否有文件上传功能
- 是否有付款、订阅、免费试用、退款、使用限制或配额
- 是否是移动应用
- 是否使用推送通知、设备权限或崩溃报告
- 是否看起来面向儿童
- 是否涉及健康、金融、就业、生物识别、精确位置或其他受监管/敏感数据

请运行:

npx open-legal-kit@latest check --config ./legal.config.json
npx open-legal-kit@latest generate --config ./legal.config.json --out ./docs/legal

如果当前仓库已经包含 open-legal-kit 的本地 checkout，也可以使用本地 CLI：

node ./bin/open-legal-kit.mjs check --config ./legal.config.json
node ./bin/open-legal-kit.mjs generate --config ./legal.config.json --out ./docs/legal

规则:
- 不要编造不确定的事实。
- 如果仓库中没有运营者或联系信息，请使用清晰的占位符。
- 如果有不确定事项，请加入 config 的 `custom_notes`。
- 如果发现高风险领域，请在最终总结中明显标出。
- 除非明确要求，不要删除已有的法律页面。
- 生成的文档只是草稿，不是法律建议，也不是合规保证。

生成后请告诉我:
- 创建了哪些文件
- 你推断出的数据流
- 哪些字段仍是占位符
- 发布前需要人工审核什么
```
