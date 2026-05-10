# 隐私政策

最后更新日期：{{effective_date}}

{{operator_name}}（以下简称“我们”）在 {{app_url}} 运营 {{app_name}}。
本隐私政策说明你在使用 {{app_name}} 时，我们如何收集、使用、共享和保留信息。

## 联系方式

运营者：{{operator_name}}

联系邮箱：{{contact_email}}

## 我们收集的信息

根据你使用服务的方式，我们可能会收集以下信息：

- 基本技术信息，例如 IP 地址、请求元数据、浏览器或设备信息、服务器日志和安全事件。
{{#if collects_email}}
- 联系信息，例如你的电子邮件地址。
{{/if}}
{{#if has_accounts}}
- 账号信息，例如登录标识、个人资料设置和账号状态。
{{/if}}
{{#if stores_user_content}}
- 你提交到服务中的用户内容，例如提示词、笔记、消息或项目数据。
{{/if}}
{{#if stores_user_files}}
- 你上传或要求服务处理的文件。
{{/if}}
{{#if uses_analytics}}
- 使用和分析数据，例如访问页面、功能使用情况、设备信息、大致位置、来源和错误日志。
{{/if}}
{{#if uses_cookies}}
- 用于身份验证、偏好设置、分析或安全目的的 Cookie 或类似本地存储。
{{/if}}
{{#if has_payments}}
- 由 {{payment_provider}} 处理的付款和账单信息。我们不会有意在自己的服务器上保存完整的银行卡号。
{{/if}}
{{#if uses_ai_api}}
- AI 处理的输入和输出，可能包括提示词、生成结果和相关上下文。
{{/if}}

{{#unless has_accounts}}
由于 {{app_name}} 的核心使用不需要账号，如果你没有在请求中提供足够信息，我们可能无法识别与特定用户相关的所有记录。
{{/unless}}

## 我们如何使用信息

我们使用信息来：

- 提供、维护和改进 {{app_name}}
{{#if has_accounts}}
- 创建和管理账号
{{/if}}
- 回复支持请求和隐私相关请求
- 监控可靠性、安全性、滥用和欺诈风险
{{#if uses_analytics}}
- 了解使用模式并改进产品质量
{{/if}}
{{#if uses_ai_api}}
- 处理 AI 功能请求并返回生成结果
{{/if}}
{{#if has_payments}}
- 处理付款、订阅、退款、发票和税务事项
{{/if}}
{{#if has_newsletter}}
- 在被允许的情况下发送产品更新或营销信息
{{/if}}

## AI 服务提供商

{{#if uses_ai_api}}
{{app_name}} 使用包括 {{ai_providers_text}} 在内的 AI 模型提供商来处理 AI 功能请求。
发送给这些提供商的输入可能包括完成请求所需的提示词、内容、文件、元数据或其他上下文。
{{/if}}
{{#unless uses_ai_api}}
{{app_name}} 目前不会使用第三方 AI 模型提供商处理用户提交的内容。
{{/unless}}

{{#if is_ai_wrapper}}
{{app_name}} 作为第三方 AI 系统的界面运行。
这意味着部分输入、输出和相关上下文可能会发送给服务所选择的 AI 提供商。
除非服务明确为该用途设计和配置，请不要提交机密、受监管或高度敏感的信息。
{{/if}}

## 上传文件

{{#if stores_user_files}}
如果你上传文件，我们可能会为了提供服务、生成输出、排查问题、防止滥用和支持删除请求而存储和处理这些文件。
上传文件保留目标：{{upload_retention_days}} 天。
{{/if}}
{{#unless stores_user_files}}
{{app_name}} 的设计目的并不是将用户上传的文件作为核心功能进行保存。
{{/unless}}

{{#if allows_sensitive_uploads}}
此配置表示可能允许敏感上传。这是高风险场景。
发布此草案前，请审核安全性、访问控制、保留期限和法律义务。
{{/if}}

{{#if is_mobile_app}}
## 移动应用数据

如果你在 {{mobile_platforms_text}} 上将 {{app_name}} 作为移动应用使用，我们可能会处理应用版本、设备类型、操作系统、设备设置、权限状态和应用交互数据，以运行和改进应用。
{{/if}}
{{#if uses_push_notifications}}
## 推送通知

如果你启用推送通知，我们可能会处理通知 token 和投递元数据，以发送提醒、安全消息或产品更新。
{{/if}}
{{#if uses_crash_reporting}}
## 崩溃报告

我们可能会使用包括 {{crash_reporting_tools_text}} 在内的崩溃报告工具，收集应用版本、设备信息、错误轨迹和崩溃日志等诊断信息。
{{/if}}

## 分析和 Cookie

{{#if uses_analytics}}
我们使用包括 {{analytics_tools_text}} 在内的分析工具来了解服务使用情况，并改进可靠性和产品质量。
{{/if}}
{{#unless uses_analytics}}
我们目前不使用第三方分析工具。
{{/unless}}

{{#if uses_cookies}}
我们可能会将 Cookie 或类似技术用于登录会话、偏好设置、安全和分析。
你可以通过浏览器设置控制 Cookie，但如果禁用必要的 Cookie，部分功能可能无法正常工作。
{{/if}}

## 共享

我们可能会与帮助我们运营服务的服务提供商共享信息，包括：

{{#each third_parties}}
- {{this}}
{{/each}}

在法律要求、保护权利和安全、调查滥用行为，或涉及合并、收购等类似商业交易时，我们也可能披露信息。

## 保留

除非法律、安全、备份、会计、争议解决或正当业务需要要求更长的保留期限，我们只会在实现本政策所述目的的合理必要期间内保留信息。

当前默认保留目标：{{data_retention_days}} 天。

{{#if stores_user_files}}
上传文件保留目标：{{upload_retention_days}} 天。
{{/if}}

## 删除和访问请求

你可以通过 {{account_deletion_url}} 或发送邮件至 {{contact_email}} 请求删除账号或数据。
在安全、反欺诈、法律合规、账单或争议处理需要的情况下，我们可能需要保留有限记录。

## 儿童

{{#if targets_children}}
{{app_name}} 被配置为面向儿童或青少年。这是高风险场景。请勿在没有法律审核的情况下发布此草案。
{{/if}}
{{#unless targets_children}}
{{app_name}} 不面向 13 岁以下儿童，我们也不会有意收集 13 岁以下儿童的个人信息。
如果你认为儿童向我们提供了个人信息，请通过 {{contact_email}} 联系我们。
{{/unless}}

## 跨境使用

{{app_name}} 可能在与你所在地不同的国家运营，或使用位于其他国家的服务提供商。
在需要时，我们会依赖适当的保护措施或允许的数据转移机制。

## 变更

我们可能会不时更新本隐私政策。
如果变更较为重要，我们会采取合理措施通知用户，例如更新上述日期、发布通知或在适当情况下发送邮件。
