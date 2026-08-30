# TriMATHalon

Public-game submission files for the Entrepreneurial Finance assignment.

**Play:** https://willrees100.github.io/trimathalon/
**Source:** https://github.com/willrees100/trimathalon

## AI/build log

- Prompted an AI coding assistant to build a self-contained, single-page HTML/CSS/JavaScript math triathlon game with Canvas graphics and synthesized audio.
- Revised the initial race after testing: replaced instant racer jumps with short smooth speed impulses and rebuilt the race as one scrolling swim, bike, and run course.
- Added a complete results state: ranked finish times, saved personal best, player accuracy, an answer-by-answer review, and a working Continue/restart route to the menu.
- Renamed the roster to You, Bob, Ava, and Gabby.
- Rebuilt the finish screen: a 4-place podium (every racer, medal-colored block per place, smiling faces), all finish times, a correct/incorrect/accuracy/average-time-per-question stat grid, and the full list of missed questions with the player's answer vs. the correct one.
- Fixed a real bug found through testing, not just reading the code: `Race.tick()` computed frame time without clamping it to be non-negative. A one-off negative value on the first animation frame (a real browser timing quirk, not a test artifact) corrupted the speed-boost math into `NaN`, which meant the player's race progress could get stuck forever and the results screen would never appear. Fixed by clamping frame time to `>= 0` and defensively initializing the boost fields.
- Made the finish transition immediate (results screen appears the instant the player crosses the line, no artificial delay).
- Added cache-busting version query strings (`?v=N`) to every script/stylesheet reference so a GitHub Pages/browser cache can't silently serve a stale build after a deploy.
- Animated the bike leg: legs now pedal in a circular motion around the bottom bracket (offset half a cycle, like real cranks) instead of hanging static in front of the bike.
- Extended the track past the finish line into a "finish zone" with a checkered carpet and rows of cheering crowd figures, and raised the camera's pan limit so it keeps tracking the player through that zone instead of stopping early.
- Hardened the whole race loop against unhandled errors, after the finish screen still failed for a tester on the deployed build with none of the previously-suspected causes (caching, the earlier `NaN` bug) present. Root cause: the loop had no error handling anywhere, so a single failure in *any* browser API (Web Audio being the likeliest real-world culprit — hardware/autoplay quirks vary a lot across devices) could silently kill the animation loop forever with no console output a typical player would ever see. Fixed by: making the audio module fault-tolerant and latching off after one failure instead of retrying (and paying the cost) on every note; wrapping the main loop so a bad frame can't kill it and moving the finish check earlier so it fires even if the decorative drawing that follows would have failed; isolating the podium canvas drawing from the core results data; and guarding against a rapid double-click on Start Race leaving two race loops running at once (`raceId` tags every scheduled frame with the race that queued it).

## Human verification

- Verified locally and on the live deployed URL, in a fresh/signed-out browser context: race starts, accepts clicks and keyboard 1–4, transitions through all three legs, reaches results, and returns to the menu with Continue.
- Verified the **restart loop specifically**: played a full race, returned to the menu via Continue, and started and completed a second race — confirmed state (history, timer, camera, personal best) resets and updates correctly each time, with zero browser console errors across both races.
- Ran JavaScript syntax checks (`node --check`) on every file and generated-question constraint checks before each deployment.
- Drove the game end-to-end in a headless browser (automated clicking/keyboard input) to reach the finish line and inspect the results screen programmatically, rather than relying on code review alone — this is how the frame-time bug above was actually caught.
- Confirmed the repository is public and the deployed URL returns 200 with no authentication, for a signed-out visitor.
- Fault-injection tested the hardened loop directly: separately forced the Web Audio API, the main draw call, the podium's person-drawing call, and the leg-detection call to throw on every invocation, and confirmed the results screen still appears correctly with real data in all four cases (plus a rapid double-click on Start Race, and a full race afterward to confirm no leftover corruption) — not just that the game works when nothing goes wrong.

## Unfamiliar-user test note

- **Observed friction (round 1):** the first version used abrupt position jumps after answers and replaced the scene at each leg, making the bike transition feel broken and hard to follow.
  **Verified revision:** answers now apply a gradual 0.6-second motion effect, and the camera slides continuously across distinct swim, bike, and run arenas with visible boundaries.
- **Observed friction (round 2):** a real tester reported the finish screen "still didn't work" and that the screen would appear to freeze. Investigation traced two separate causes: (1) the frame-time/`NaN` bug above, which could prevent the race from ever finishing, and (2) GitHub Pages' 10-minute CDN/browser cache serving a stale, still-broken build immediately after a deploy.
  **Verified revision:** fixed the underlying bug, added cache-busting asset URLs so a fresh deploy can't be masked by a stale cache, and re-verified the fix on the live URL in a fresh browser context.
- **Observed friction (round 3):** the same tester noted the bike-leg character's legs looked static (not pedaling) and that the camera stopped panning once the finish line first came into view, leaving nothing to see beyond it.
  **Verified revision:** added circular pedaling leg animation for the bike leg, and extended the track past the finish line into a cheering-crowd "finish zone" with the camera's pan limit raised so it keeps following the player through it.
- **Observed friction (round 4):** the tester confirmed the animation updates from round 3 were visible (so the build itself was current, not a caching issue this time) but the finish screen *still* didn't appear for them, describing it as a "code error." This was not reproducible on the assistant's own machine across many automated race runs, which pointed at a real device/browser-specific condition rather than a deterministic bug.
  **Verified revision:** rather than continue guessing at the exact trigger, hardened the loop to survive any single failure regardless of cause (see build log above), and proved the fix with fault injection rather than hoping the original condition wouldn't recur.

## Files

- `index.html`, `style.css`, and `js/` are the complete source files. No external assets or build process are required.
