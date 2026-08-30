# TriMATHalon

Public-game submission files for the Entrepreneurial Finance assignment.

## AI/build log

- Prompted an AI coding assistant to build a self-contained, single-page HTML/CSS/JavaScript math triathlon game with Canvas graphics and synthesized audio.
- Revised the initial race after testing: replaced instant racer jumps with short smooth speed impulses and rebuilt the race as one scrolling swim, bike, and run course.
- Added a complete results state: ranked finish times, saved personal best, player accuracy, an answer-by-answer review, and a working Continue/restart route to the menu.
- Renamed the roster to You, Bob, Ava, and Gabby.

## Human verification

- Verified the game opens locally from `index.html`, starts a race, accepts clicks and keyboard 1–4, transitions through the three legs, reaches results, and returns to the menu with Continue.
- Ran JavaScript syntax checks and generated-question constraint checks before deployment.

## Unfamiliar-user test note

- Observed friction: the first version used abrupt position jumps after answers and replaced the scene at each leg, making the bike transition feel broken and hard to follow.
- Verified revision: answers now apply a gradual 0.6-second motion effect, and the camera slides continuously across distinct swim, bike, and run arenas with visible boundaries.

## Files

- `index.html`, `style.css`, and `js/` are the complete source files. No external assets or build process are required.
