# Herieth-Lab

Physics and Chemistry for Form One to Form Four: lessons, hands-on practicals and self-marking quizzes,
with student accounts and a dashboard for Herieth.

The logo is `public/img/logo.svg` for light backgrounds and `public/img/logo-light.svg` for dark ones (app icon: `public/img/logo-180.png`).

## What is in this folder
- `public/`: the website itself (pages, styles, lessons, practicals).
- `netlify/functions/api.mjs`: the small server that handles account requests, sign-in, student
  progress and Herieth's dashboard. It stores its data in Netlify Blobs (a store named `herieth-lab`).
- `netlify.toml`, `package.json`: tell Netlify how to deploy it.
- `dev/server.mjs`: a local test server. Not used on Netlify.

## Deploying (drag-and-drop will NOT work any more)
Netlify only runs server functions when a site is deployed from a Git repository or with the Netlify CLI.

**From GitHub (recommended):**
1. Create a new repository on GitHub (for example `herieth-lab`) and push this whole folder to it.
2. In Netlify: **Add new project > Import an existing project > GitHub**, then pick the repository.
3. Leave the build settings as they are; `netlify.toml` already sets them. Press **Deploy**.
4. In Netlify, set the project name to `herieth-lab` so the address is `herieth-lab.netlify.app`.

Every push to GitHub then redeploys automatically. Accounts and progress are kept between deploys.

**Or with the Netlify CLI:** `npm install`, then `npx netlify deploy --prod`.

## Herieth's account
- Email: sciencewithherieth@gmail.com. The starting password is the one she was given before.
- She should change it on her first visit: **Settings > Change your password**.
- Signing in with her email opens the dashboard. **Lessons** opens every course for teaching.

## How student accounts work
1. A student presses **Request an account** on the sign-in page and sends their name, email, school
   and the subjects and forms they want.
2. Herieth sees it under **Requests**, chooses the access and a password, and presses **Create account**.
   The password is shown once so she can copy it and give it to the student (no emails are sent).
3. Under **Students** she can change a student's access, set a new password, view their report or
   delete the account. Under **Reports** she can print or save a PDF, or download a spreadsheet.
4. A student only sees the courses they have access to, and their progress follows them to any device.

## Security notes
- Passwords are stored as salted scrypt hashes on the server, never in the website files.
- After 5 wrong passwords an email address is locked for 10 minutes.
- Sign-in tokens are signed with a secret that is created automatically and kept in the data store.
  To use your own instead, add an environment variable `HERIETH_LAB_SECRET` in Netlify (any long random text).
- The lesson text and practicals are ordinary website files, so someone who knows where to look could
  still read them without an account. The accounts protect student data, the dashboard and reports.

## Testing locally
`node dev/server.mjs`, then open http://localhost:8888. Local data is saved in `dev/data.json`.

## Editing lessons and practicals
- `public/js/data-physics.js`, `data-physics2.js`, `data-chemistry.js`, `data-chemistry2.js`: notes and quizzes.
- `public/js/sims-*.js`: the practicals. `public/js/kit.js`: shared drawing and drag code.
- `public/js/app.js`: pages, sign-in, dashboard. `public/css/style.css`: the look.
