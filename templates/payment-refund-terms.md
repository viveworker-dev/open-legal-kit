# Payment And Refund Terms

Last updated: {{effective_date}}

These Payment and Refund Terms apply to paid features of {{app_name}}.

{{#if has_payments}}
Payments are processed by {{payment_provider}} or another payment processor.
Payment processors may collect billing details, payment method information, tax
information, fraud signals, and related transaction data under their own terms
and privacy policies.
{{/if}}
{{#unless has_payments}}
{{app_name}} does not currently charge users. Keep this page unpublished until
paid features are enabled.
{{/unless}}

## Prices

Prices are shown at checkout or on the pricing page. Prices may change over
time, but changes will not affect charges already completed.

## Subscriptions

{{#if has_free_trial}}
If a free trial is offered, it may convert to a paid subscription unless
cancelled before the trial ends. Trial details are shown at signup or checkout.
{{/if}}

{{#if has_subscriptions}}
Subscriptions renew automatically unless cancelled before the renewal date. You
can cancel through {{cancellation_url}} or by contacting {{contact_email}}.
{{/if}}
{{#unless has_subscriptions}}
{{app_name}} does not currently offer automatically renewing subscriptions.
{{/unless}}

{{#if has_usage_limits}}
Paid plans may include usage limits, quotas, fair-use controls, or rate limits.
Usage limits may reset on the schedule shown in the product or checkout flow.
{{/if}}

## Refunds

Refund requests should be sent to {{contact_email}} within
{{refund_window_days}} days of purchase. We may deny refund requests for abuse,
excessive usage, completed custom work, or other cases where a refund would be
unfair or impractical.

## Failed Payments

If payment fails, access to paid features may be suspended or downgraded until
payment is completed.

## Taxes

You are responsible for any taxes, duties, or charges that apply to your use of
paid features unless collected by the payment processor at checkout.

## Contact

Billing questions can be sent to {{contact_email}}.
