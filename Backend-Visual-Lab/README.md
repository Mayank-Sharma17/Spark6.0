# Backend Visual Lab

Six offline interactive lessons for teaching and recording backend concepts with a consistent Student API example. Built with plain HTML, CSS, and JavaScript. No installation or backend server is needed.

## Open

Open `index.html` directly in a modern browser, then select a lesson. Each lesson also has its own `index.html` inside its topic subfolder. All assets and navigation work with local files.

## Record a lesson

1. Pick a scenario in **Change the scenario**, then click **Run scenario** (or **Validate request**).
2. Click **Present**, or press **P**, to hide navigation and experiment controls.
3. Use **Next** and **Back** to explain at your pace, or **Play** for timed progression. The default gives each step 2.5 seconds; the pace menu also offers a slower 5 seconds and a quicker 1.2 seconds.
4. Press **P** or **Escape** to exit presentation mode. Browser fullscreen (usually F11) is separate from presentation mode.

Keyboard shortcuts when focus is outside a form, button, or link:

- Space: play or pause
- Right / Left arrows: next or previous step
- R: reset the current walkthrough
- P: toggle presentation mode
- Escape: leave presentation mode

Animations stop advancing when the tab is hidden. Reduced-motion preferences disable the decorative motion; the diagrams and step controls remain usable.

## Suggested teaching sequence

| Folder | Demo | Useful contrast to explain |
| --- | --- | --- |
| `01-http-rest` | GET, POST, PUT, DELETE | Delete the student, GET a 404, POST a new one, then PUT a replacement |
| `02-architecture` | Controller → Service → Repository → Database | Each layer's responsibility and the return path |
| `03-databases-sql` | WHERE, JOIN, indexed lookup | Side-by-side scan vs index for the same name lookup, plus matching course foreign keys |
| `04-authentication` | Role and credential controls | Student + DELETE = 403; Admin + DELETE = allowed; no token = 401 |
| `05-validation-errors` | Editable name, email, age | Invalid request = 400; valid request = 201 |
| `06-transactions-concurrency` | Unsafe, locking, rollback | Two bookings despite a zero seat count; lock/recheck; rollback and retry |

## Simulation boundaries

These pages simulate backend behavior in the browser. They do not call or modify your Spring Boot application. HTTP student state lasts until refresh; the other demos derive their state from the selected scenario and current step. Replaying a mutating HTTP operation issues a fresh simulated request, so a second DELETE can return 404. Stepping backward revisits the same walkthrough and does not undo an already applied HTTP operation. Use **Restore sample student** to start again with Asha.

The POST demo deliberately targets a fixed ID to keep the example small, returning 409 when it exists. Production APIs commonly generate IDs instead. The architecture code is illustrative, not a complete compilable Java implementation. The authorization token is a display label, not a JWT. Email validation checks a basic syntax only. SQL execution and transaction locking are conceptual diagrams, not database benchmarks or guarantees for every isolation level.

## Edit

- `assets/styles.css`: shared theme, layout, responsiveness, animations.
- `assets/app.js`: lesson text, diagrams, scenarios, controls.
- `assets/sql-demo.js`: side-by-side table scan and index tree visualization.
- Each topic's `index.html`: standalone entry point.
- `create-pages.cjs`: optional generator for the seven HTML entry points; run `node create-pages.cjs` after changing its metadata. It is not required to view the lessons.

There are no CDNs, downloaded fonts, analytics, or external runtime dependencies.

## Optional browser verification

On Windows with Google Chrome installed in its standard Program Files location, run `node verify.cjs`. This checks all pages, main scenario outcomes, playback, presentation mode, navigation, and horizontal overflow at desktop and mobile widths. It creates an ignored `.qa-browser` profile and `.qa-preview.png` screenshot. Chrome runs headlessly and the script closes it afterward.
