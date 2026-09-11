# Danco Workforce Assessment — v33 implementation brief

## Release intent
v29 restores and strengthens the Danco+ screening demonstration while preserving every Standard assessment/application capability developed through v28.1.

## Background screening
The administrator report again exposes **Request background check** in Danco+.

The prototype request dialog now demonstrates:
1. candidate / identity readiness,
2. provider reference,
3. package selection,
4. published package cost,
5. administrator cost approval,
6. a prototype-only result selector.

Public package references at this build date:
- Basic — $29.99
- Essential — $59.99
- Complete — $94.99

The selected demo result is not a real background-check finding. It exists only so a presenter can demonstrate both branches:
- **Meets Danco criteria** → record automatically files to Background checked — Eligible.
- **Does not meet Danco criteria** → report receives a prominent failure/error state, contract generation is blocked and record automatically files to Background checked — Not eligible.

Category-level screening results continue to state **Results will be displayed when live**.

A production integration must remove the demo-result selector. Vendor/provider results and Danco's authorized human review determine production workflow.

## Employment agreement
A Danco+ contract can be generated when:
- a Danco+ screening is satisfactory, or
- no Danco+ screening exists but an administrator confirms a satisfactory check was provided through another approved source.

An attached Danco+ screening marked **not eligible** blocks contract creation.

The prototype agreement is intentionally exportable even when offer-specific fields remain incomplete. The visual demonstration therefore does not require compensation, start date or administrator fields to be completed.

Expanded optional content:
- offer date / expiration,
- employment type and FLSA classification,
- start date, compensation and pay frequency,
- sales commission / incentive-plan reference,
- location, supervisor and schedule,
- introductory period,
- benefits and PTO,
- overtime,
- travel / vehicle,
- expense reimbursement,
- company property / PPE,
- confidentiality / proprietary-information obligations,
- employee handbook / policy acknowledgments,
- payroll / direct-deposit onboarding status,
- additional offer terms,
- signatures.

Bank account and routing-number fields are intentionally not included. Those details should be collected through Danco's approved secure payroll onboarding route rather than duplicated inside the employment agreement.

## Voice and accessibility
Applicant narration remains bilingual. Existing recorded narration is preserved. Revised/dynamic text falls back to one continuous device reader voice rather than mixing voices mid-prompt. Danco+ administrator dialogs use the selected reader when audio is enabled.

## Security boundary
- Full SSNs remain excluded from the normal applicant record.
- CRA/vendor secrets remain server-side.
- The demo pass/fail control is prototype-only and cannot represent a real vendor result.
- Signed contracts remain private and use time-limited signed links.


## v30 presentation layer
A short buyer-facing **Why Danco+?** presentation is built into the prototype. It uses Dan and Brenda as alternating presenters, keeps captions visible, uses available `en-US` system voices for an American-English presentation, and remains replayable without affecting the applicant assessment logic.

## v30 corrected screening workflow
The Danco+ screening demonstration continues to use the existing `danco-service-v5` endpoint. A database compatibility migration now permits the v30 demonstration status values used by that service. A protected database trigger creates a prototype full-report artifact reference whenever a demonstration screening record is inserted. The applicant report displays only status-level screening categories; the Administrator **Background Check Reports** folder opens the fuller prototype report using the stored screening record. Real provider data must replace all synthetic outcome generation in production.


## v33 presentation integrity layer
The Danco+ pitch maintains a strict one-to-one scene/audio map. A missing or failed premium clip falls back to speech synthesis for the same on-screen line rather than advancing silently. The next premium scene is preloaded to reduce transition gaps. The Danco+ mode control now uses dedicated gold Danco and Danco+ brand assets; the plus state is a custom hand-drawn digital mark rather than plain text.
