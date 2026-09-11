# Danco Workforce Assessment — Standard + Danco+ Prototype v33

Flat GitHub Pages PWA containing the current Standard Danco Workforce Assessment and the owner-approved Danco+ demonstration layer.

## Standard
- English / Spanish assessment and application journeys.
- DISC/work-style primer for all roles.
- Roofing progression assessment for Service Helper, Roofer and Foreman.
- Commercial Account Manager sales-suitability assessment with balanced answer wording.
- Candidate-specific suitability brief and four interview-direction prompts.
- Recorded Danco narration with device-reader fallback / selectable device voice.
- Live shared submissions and protected administrator review.

## Danco+
- Owner-approved device trial access with Standard / Danco+ presentation toggle.
- Restored background-screening approval window.
- Checkr and GoodHire public package-price references for prototype demonstration:
  - Basic — $29.99
  - Essential — $59.99
  - Complete — $94.99
  - court/database pass-through fees may apply in real vendor use.
- Prototype-only selectable successful / unsuccessful screening outcome so both workflow branches can be demonstrated.
- Successful demo screenings file automatically to Background checked — Eligible.
- Unsuccessful demo screenings flag an error, block contract creation and file automatically to Background checked — Not eligible.
- In a live release the app must not manufacture a result: provider data is returned through the approved integration and Danco completes the required human review.
- Employment agreement creation is permitted without a Danco+ screening record if the administrator confirms a satisfactory background check was received through another approved source.
- Expanded Danco employment-agreement / offer-terms prototype with optional fields and PDF printing.
- Bank account and routing details are deliberately excluded from the agreement; payroll/direct-deposit information belongs in a separate secure payroll onboarding process.
- Employment contracts and upload-only Signed employment contracts filing remain in the private Danco workflow.

## Deployment
Upload all files in the full package to the repository root, or use the update-only ZIP to replace changed files in an existing v28.1 deployment.

The PWA uses:
- `danco-service-v5` for the restored background/contract behavior while proxying unchanged Standard endpoints to the established service.
- `danco-plus-access` for owner-approved Danco+ trial requests.

## Prototype privacy
Do not enter a real Social Security number in a public demonstration. Use `PROTOTYPE`.

The ordinary applicant record excludes the full raw SSN. Signed employment files remain in private Supabase Storage and are opened through time-limited signed links.


## v30 — Why Danco+ business pitch
- Optional in-app Dan & Brenda presentation offered once after language selection to activated prototype reviewers.
- Replayable from **Why Danco+?** controls.
- Alternating U.S.-English device voices, captions, progress, pause/skip and manual scene navigation.
- Sales narrative focuses on end-to-end hiring, sales-role suitability, interview direction, screening, Danco agreement generation, secure file progression and payroll handoff.
- No unsupported claim that Danco+ is the only hiring platform of its kind; the pitch emphasizes the Danco-specific connected workflow.

## v30 corrected — background-screening filing repair
- Fixed the post-approval server error caused by a screening-status schema mismatch.
- Restored the demonstration screening workflow after administrator cost approval.
- Applicant reports show concise category status only; detailed demonstration content is separated from the ordinary applicant report.
- Added **Background Check Reports** as a Danco+ file-store view in Administrator.
- Each completed demo screening is filed against its application reference and can be opened as a fuller demonstration report.
- Production/live screening remains provider-led; the prototype does not claim that its synthetic report is a real consumer report.

## v31 premium voice + engagement update

- Danco+ pitch now uses the generated Dan and Brenda premium American-English voice samples rather than the browser's default reader.
- English assessment delivery alternates Dan and Brenda; Spanish uses Brenda. The existing bundled narration remains a local fallback, and the device reader remains an optional user-selected Help setting.
- Long desktop/tablet forms keep the character stage visible while content scrolls.
- STANDARD / DANCO+ in the header is now an in-place mode control. If Danco+ is not approved, tapping it opens the advanced-trial request; approved/owner presentation devices can switch modes without losing current progress.
- Danco+ receives additional restrained metallic-gold detailing while retaining the Danco navy/blue identity.
- v30 background-screening, report-store and employment-agreement functionality is preserved.


## v33 — presentation audio integrity + Danco+ gold mode identity
- All ten Danco+ business-pitch scenes now have dedicated full narration clips matched one-to-one with the displayed script.
- Scene 06, “Danco paperwork, without re-keying the candidate”, has been restored with complete spoken narration.
- The next scene is preloaded and any hosted-audio failure falls back to an appropriate US-English device voice without silently skipping the content.
- The header mode switch now uses the official Danco roof/wordmark in metallic gold. Danco+ adds a digitally hand-drawn glowing plus and a roof alignment adjusted for the wider mark.
- Tablet/desktop pitch geometry was tightened so Dan and Brenda remain clearly visible beside the message card.
- Deploy the full flat package to the repository root; the v33 service-worker cache key clears stale v31 files.

## v36 — live sales leaderboard, candidate invitation links & accessibility timing

- The Commercial Account Manager league table now loads complete historical and future sales assessments from the shared database, excluding only Archived and Background checked — Not eligible records.
- Administrators can remove a report from the league table without changing its filing queue and restore it later either from the removed list or from the report itself.
- Owner-only one-use candidate links are backed by server-side invitation state. They preselect the role, remove prototype presentation, require a privacy acknowledgement, lock when timed assessment begins, restore the result after completion, and allow one final submission.
- Standard timed questions use a single 45-second question-and-answer window with answers selectable immediately. Reading/sight support keeps the question untimed until answers are revealed, then provides 60 seconds and an accessible spoken final-answer confirmation.
- The background-screening demonstration report now opens inside the app in the same report visual system, with Close and Print / Save PDF controls.
- Admin report and table surfaces are now opaque/high-contrast for tablet readability.
- Deploy the complete flat v36 package. The v36 service-worker cache key replaces earlier cached interface files.
