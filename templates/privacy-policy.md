# Privacy Policy

Last updated: {{effective_date}}

{{operator_name}} ("we", "us", or "our") operates {{app_name}} at {{app_url}}.
This Privacy Policy explains how we collect, use, share, and retain information
when you use {{app_name}}.

## Contact

Operator: {{operator_name}}

Contact: {{contact_email}}

## Information We Collect

We may collect the following information depending on how you use the service:

- Basic technical information, such as IP address, request metadata, browser or
  device information, server logs, and security events.
{{#if collects_email}}
- Contact information, such as your email address.
{{/if}}
{{#if has_accounts}}
- Account information, such as login identifiers, profile settings, and account status.
{{/if}}
{{#if stores_user_content}}
- User content that you submit to the service, such as prompts, notes, messages, or project data.
{{/if}}
{{#if stores_user_files}}
- Files that you upload or ask the service to process.
{{/if}}
{{#if uses_analytics}}
- Usage and analytics data, such as pages viewed, feature usage, device information, approximate location, referrers, and error logs.
{{/if}}
{{#if uses_cookies}}
- Cookies or similar local storage used for authentication, preferences, analytics, or security.
{{/if}}
{{#if has_payments}}
- Payment and billing information processed by {{payment_provider}}. We do not intentionally store full card numbers on our own servers.
{{/if}}
{{#if uses_ai_api}}
- AI processing inputs and outputs, which may include prompts, generated responses, and related context.
{{/if}}

{{#unless has_accounts}}
Because {{app_name}} does not require accounts for its core use, we may not be
able to identify every record associated with a particular user unless you give
us enough information in a request.
{{/unless}}

## How We Use Information

We use information to:

- provide, maintain, and improve {{app_name}}
{{#if has_accounts}}
- create and manage accounts
{{/if}}
- respond to support and privacy requests
- monitor reliability, security, abuse, and fraud
{{#if uses_analytics}}
- understand usage patterns and improve product quality
{{/if}}
{{#if uses_ai_api}}
- process AI-powered requests and return generated outputs
{{/if}}
{{#if has_payments}}
- process payments, subscriptions, refunds, invoices, and taxes
{{/if}}
{{#if has_newsletter}}
- send product updates or marketing messages when permitted
{{/if}}

## AI Providers

{{#if uses_ai_api}}
{{app_name}} uses AI model providers, including {{ai_providers_text}}, to process
AI-powered requests. Inputs sent to those providers may include prompts, content,
files, metadata, or other context needed to complete the request.
{{/if}}
{{#unless uses_ai_api}}
{{app_name}} does not currently use third-party AI model providers to process
user-submitted content.
{{/unless}}

{{#if is_ai_wrapper}}
{{app_name}} acts as an interface around third-party AI systems. This means some
inputs, outputs, and related context may be sent to AI providers selected by the
service. Do not submit confidential, regulated, or highly sensitive information
unless the service is specifically designed and configured for that use.
{{/if}}

## Uploaded Files

{{#if stores_user_files}}
If you upload files, we may store and process those files to provide the service,
generate outputs, troubleshoot issues, prevent abuse, and support deletion
requests. Uploaded file retention target: {{upload_retention_days}} days.
{{/if}}
{{#unless stores_user_files}}
{{app_name}} is not designed to store user-uploaded files as a core feature.
{{/unless}}

{{#if allows_sensitive_uploads}}
This config indicates that sensitive uploads may be allowed. This is a high-risk
case. Review security, access controls, retention, and legal obligations before
publishing this draft.
{{/if}}

{{#if is_mobile_app}}
## Mobile App Data

If you use {{app_name}} as a mobile app on {{mobile_platforms_text}}, we may
process app version, device type, operating system, device settings, permission
status, and app interaction data needed to operate and improve the app.
{{/if}}
{{#if uses_push_notifications}}
## Push Notifications

If you enable push notifications, we may process notification tokens and delivery
metadata to send alerts, reminders, security messages, or product updates.
{{/if}}
{{#if uses_crash_reporting}}
## Crash Reporting

We may use crash reporting tools, including {{crash_reporting_tools_text}}, to
collect diagnostics such as app version, device information, error traces, and
crash logs.
{{/if}}

## Analytics And Cookies

{{#if uses_analytics}}
We use analytics tools, including {{analytics_tools_text}}, to understand how the
service is used and to improve reliability and product quality.
{{/if}}
{{#unless uses_analytics}}
We do not currently use third-party analytics tools.
{{/unless}}

{{#if uses_cookies}}
We may use cookies or similar technologies for login sessions, preferences,
security, and analytics. You can control cookies through your browser settings,
but some features may stop working if required cookies are disabled.
{{/if}}

## Sharing

We may share information with service providers that help us operate the service,
including:

{{#each third_parties}}
- {{this}}
{{/each}}

We may also disclose information if required by law, to protect rights and
safety, to investigate abuse, or as part of a merger, acquisition, or similar
business transaction.

## Retention

We keep information only as long as reasonably needed for the purposes described
in this policy, unless a longer retention period is required by law, security,
backup, accounting, dispute resolution, or legitimate business needs.

Current default retention target: {{data_retention_days}} days.

{{#if stores_user_files}}
Uploaded file retention target: {{upload_retention_days}} days.
{{/if}}

## Deletion And Access Requests

You may request account or data deletion at {{account_deletion_url}} or by
emailing {{contact_email}}. We may need to keep limited records where required
for security, fraud prevention, legal compliance, billing, or dispute handling.

## Children

{{#if targets_children}}
{{app_name}} is configured as targeting children or teens. This is a high-risk
case. Do not publish this draft without legal review.
{{/if}}
{{#unless targets_children}}
{{app_name}} is not directed to children under 13, and we do not knowingly collect
personal information from children under 13. If you believe a child provided
personal information, contact us at {{contact_email}}.
{{/unless}}

## International Use

{{app_name}} may be operated from or use service providers in countries different
from where you live. Where required, we rely on appropriate safeguards or
permitted transfer mechanisms.

## Changes

We may update this Privacy Policy from time to time. If changes are material, we
will take reasonable steps to notify users, such as updating the date above,
posting a notice, or sending an email where appropriate.
