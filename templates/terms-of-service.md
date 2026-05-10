# Terms of Service

Last updated: {{effective_date}}

These Terms of Service ("Terms") govern your use of {{app_name}}, operated by
{{operator_name}}. By accessing or using {{app_name}}, you agree to these Terms.

## Contact

Operator: {{operator_name}}

Contact: {{contact_email}}

## Eligibility

You may use {{app_name}} only if you can form a binding agreement and are not
barred from using the service under applicable law.

{{#unless targets_children}}
{{app_name}} is not intended for children under 13.
{{/unless}}

## Accounts

{{#if has_accounts}}
You are responsible for maintaining the security of your account and for activity
that occurs under your account. Notify us if you believe your account has been
compromised.
{{/if}}
{{#unless has_accounts}}
{{app_name}} does not currently require user accounts for its core use.
Because there may be no account identifier, some requests may require enough
information for us to locate the relevant records.
{{/unless}}

## Acceptable Use

You agree not to:

- break the law or violate the rights of others
- interfere with or disrupt the service
- attempt to access systems or data without permission
- upload malicious code or harmful content
- abuse rate limits, automation, or security controls
- use the service to create or distribute illegal, deceptive, or harmful material

## User Content

{{#if stores_user_content}}
You retain rights to content you submit. You grant us the limited rights needed
to host, process, transmit, display, and operate the service for you.
{{/if}}
{{#unless stores_user_content}}
{{app_name}} is not designed to store user-submitted content beyond what is
necessary to operate the service.
{{/unless}}

{{#if allows_user_generated_content}}
If you publish or share user-generated content through {{app_name}}, you are
responsible for that content and for ensuring you have the rights to use it.
{{/if}}

## File Uploads

{{#if stores_user_files}}
If you upload files, you are responsible for ensuring that you have the rights
and permissions needed to upload and process them. Do not upload malware,
unlawful material, infringing content, or sensitive information unless the
service is explicitly designed for that use. We may remove files that violate
these Terms or create risk for the service or other users.
{{/if}}
{{#unless stores_user_files}}
{{app_name}} is not intended to be a general file storage or backup service.
{{/unless}}

## AI Features

{{#if uses_ai_api}}
{{app_name}} may use AI systems to process inputs and generate outputs. AI output
may be inaccurate, incomplete, unsafe, or unsuitable for your use case. You are
responsible for reviewing output before relying on it or sharing it.
{{/if}}
{{#unless uses_ai_api}}
{{app_name}} does not currently provide AI-generated outputs as a core feature.
{{/unless}}

{{#if is_ai_wrapper}}
{{app_name}} may route inputs and context to third-party AI providers. You are
responsible for ensuring that you are allowed to submit the information you
provide and that your use of AI output complies with applicable laws, third-party
rights, and any provider policies that apply.
{{/if}}

## Payments

{{#if has_payments}}
Paid features are processed through {{payment_provider}} or another payment
processor. Prices, taxes, renewals, cancellations, and refund terms are described
on the checkout page or in the Payment and Refund Terms.
{{/if}}
{{#unless has_payments}}
{{app_name}} does not currently charge users for access.
{{/unless}}

{{#if has_subscriptions}}
Subscriptions may renew automatically unless cancelled before the renewal date.
You can cancel through {{cancellation_url}} or by contacting {{contact_email}}.
Access may change if a plan is cancelled, downgraded, unpaid, or subject to
usage limits.
{{/if}}

{{#if has_usage_limits}}
Some plans or features may include usage limits, quotas, fair-use controls, or
rate limits. We may enforce those limits to protect service reliability and cost.
{{/if}}

{{#if is_mobile_app}}
## Mobile App Terms

If {{app_name}} is distributed through app stores or mobile platforms, your use
may also be subject to the rules, payment terms, subscription controls, and
privacy disclosures of those platforms. App permissions may be required for
specific features and can usually be controlled through device settings.
{{/if}}

## Disclaimers

{{app_name}} is provided "as is" and "as available." We do not guarantee that the
service will be uninterrupted, error-free, secure, or suitable for your specific
needs.

To the maximum extent permitted by law, we disclaim implied warranties of
merchantability, fitness for a particular purpose, and non-infringement.

## Limitation Of Liability

To the maximum extent permitted by law, {{operator_name}} will not be liable for
indirect, incidental, special, consequential, exemplary, or punitive damages, or
for lost profits, lost data, lost goodwill, or business interruption.

## Termination

We may suspend or terminate access if you violate these Terms, create risk for
the service or other users, or if we discontinue the service.

## Governing Law

These Terms are governed by the laws of {{governing_law}}, unless local law
requires otherwise.

## Changes

We may update these Terms from time to time. If changes are material, we will
take reasonable steps to notify users.
