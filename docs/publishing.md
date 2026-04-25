# Publishing to npm

> How to make `npx polymath-world` available globally so anyone can run it.

---

## Step 1 — Install Node.js

If you don't have Node.js installed:

1. Go to [nodejs.org](https://nodejs.org/)
2. Download the **LTS** version (recommended)
3. Run the installer — accept all defaults
4. Restart your terminal

Verify the install:
```bash
node --version   # should print v18.x.x or higher
npm --version    # should print 9.x.x or higher
```

---

## Step 2 — Create an npm account

If you don't have one:

1. Go to [npmjs.com](https://www.npmjs.com/)
2. Click **Sign Up**
3. Choose a username (this will appear on the package page)
4. Verify your email

---

## Step 3 — Log in to npm from your terminal

```bash
npm login
```

Enter your username, password, and email when prompted. You'll get a one-time password (OTP) sent to your email — paste it in.

Verify you're logged in:
```bash
npm whoami
# should print your npm username
```

---

## Step 4 — Publish

Navigate to the `polymath-world` project folder:

```bash
cd C:\Users\hitan\polymath-world
npm publish
```

That's it. The package is now live at:
`https://www.npmjs.com/package/polymath-world`

And anyone in the world can run:
```bash
npx polymath-world
```

---

## Updating the package

When you make changes to the repo and want to publish a new version:

1. Update the version in `package.json` (follow [semver](https://semver.org/)):
   - Bug fixes → bump patch: `0.1.0` → `0.1.1`
   - New features → bump minor: `0.1.0` → `0.2.0`
   - Breaking changes → bump major: `0.1.0` → `1.0.0`

2. Commit your changes:
   ```bash
   git add .
   git commit -m "release: v0.2.0 — [what changed]"
   git push
   ```

3. Publish to npm:
   ```bash
   npm publish
   ```

---

## Adding a version tag on GitHub

After each release, tag it on GitHub so the version history is clear:

```bash
git tag v0.1.0
git push origin v0.1.0
```

Then create a GitHub Release at:
`https://github.com/Hi7anshu/polymath-vault/releases/new`

---

## Checklist before first publish

- [ ] Node.js 18+ installed
- [ ] `npm login` completed
- [ ] `package.json` version is `0.1.0`
- [ ] `bin/setup.js` has `#!/usr/bin/env node` at the top
- [ ] `README.md` is polished (this is what people see on npmjs.com)
- [ ] Run `node bin/setup.js` locally to confirm the CLI works
- [ ] `npm publish --dry-run` to preview what gets published without actually publishing

---

## What gets published

Only the files listed in `package.json` under `"files"` are included in the npm package:

```json
"files": [
  "bin/",
  "templates/",
  "skills/",
  "docs/"
]
```

The `.claude/` settings, `.gitignore`, and `README.md` are automatically included by npm regardless.
