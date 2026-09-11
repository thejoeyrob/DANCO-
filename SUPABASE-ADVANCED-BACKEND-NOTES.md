# Supabase advanced backend notes — v29

## Active services
- `danco-service` — established Standard applicant/admin service.
- `danco-service-v5` — v29 compatibility layer. Background-screening and employment-contract routes execute v29 behavior; unchanged Standard routes proxy to the established service.
- `danco-plus-access` — Danco+ device request / owner approval service.

## Background-screening prototype
`danco-service-v5` validates the administrator PIN and SSN readiness, returns current public package-price references, accepts cost approval and stores a prototype-only user-selected demonstration outcome.

The demonstration outcome automatically selects only the prototype workflow queue. This must not be used as a production employment decision mechanism. When a CRA is connected, the demo selector is removed and authorized Danco review controls the employment decision.

## Employment agreements
Contract creation no longer requires a Danco background-screening row. It still requires administrator confirmation that background criteria are satisfied. If a latest Danco screening exists with `decision = not_eligible`, server-side contract creation is blocked.

Expanded agreement data remains in the JSONB `contract_data` payload; no schema migration was required.

## Sensitive data
Do not place CRA secret keys, full SSNs, bank account numbers or routing numbers in GitHub/client code. Banking information belongs in a separate approved payroll system. The signed-contract bucket remains private.

## v30 background-screening correction
- `danco_background_screenings.screening_status` now accepts the v30 prototype status values `completed_clear` and `completed_issue` used by `danco-service-v5`, in addition to the established live workflow states.
- A database trigger assigns a prototype screening reference and stores a self-contained demonstration full-report artifact in `provider_report_url` for new `prototype_demo` screening rows. This keeps the detailed prototype report separate from the ordinary applicant summary while remaining tied to the stored screening record and application reference.
- The trigger is `SECURITY INVOKER` and direct execution is revoked from public/anon/authenticated roles.
