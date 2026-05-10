# Account And Data Deletion

Last updated: {{effective_date}}

This page explains how users of {{app_name}} can request deletion of their
account or personal data.

## How To Request Deletion

You can request deletion by:

- visiting {{account_deletion_url}}
- emailing {{contact_email}}

Please include the email address or account identifier associated with your
{{app_name}} account so we can locate the relevant records.

## What We Delete

{{#if has_accounts}}
When we process an account deletion request, we aim to delete or de-identify
account profile data, login identifiers, user settings, and user content linked
to the account.
{{/if}}
{{#unless has_accounts}}
If you do not have an account, we will try to locate records based on the
information you provide in your request.
{{/unless}}

{{#if stores_user_files}}
Uploaded files associated with your account will be deleted or de-identified
unless retention is required for legal, security, backup, or dispute reasons.
{{/if}}

## What We May Keep

We may retain limited information where needed for:

- security, fraud prevention, or abuse investigations
- payment, tax, accounting, or chargeback records
- legal compliance or dispute resolution
- backup systems for a limited period
- records that have already been de-identified or aggregated

## Timing

We aim to respond to deletion requests within a reasonable period. Some records
may remain in backups or logs until they expire through normal retention cycles.

Default retention target: {{data_retention_days}} days.

## Contact

Questions can be sent to {{contact_email}}.
