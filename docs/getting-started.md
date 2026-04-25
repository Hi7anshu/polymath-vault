# Getting Started with Polymath World

Complete setup guide — written for people who are new to terminals, npm, and developer tools. If you've never opened a terminal before, start here.

---

## What you'll need

Four things, installed in this order:

| # | Tool | What it is | Cost |
|---|------|-----------|------|
| 1 | [Obsidian](https://obsidian.md/) | Note-taking app — your vault lives here | Free |
| 2 | [Node.js](https://nodejs.org/) | Lets your computer run the `npx polymath-world` command | Free |
| 3 | [Claude Code](https://claude.ai/code) | Anthropic's AI assistant that runs in your terminal | ~$0.01–0.05/day (API usage) |
| 4 | Anthropic API key | Connects Claude Code to Anthropic's servers | Included with Claude Code setup |

> ⚠️ **Claude Code is not the same as Claude.ai.** Claude.ai is the chatbot in your browser. Claude Code is a separate tool that runs in your terminal and can read and write files on your computer — which is what makes the wiki maintenance possible.

---

## Step 1 — Install Obsidian

1. Go to [obsidian.md](https://obsidian.md/)
2. Click **Download** and install it like any other app
3. You don't need to open or configure anything yet — just have it installed

---

## Step 2 — Install Node.js

Node.js is what makes the `npx polymath-world` command work. You don't need to understand it — just install it.

### Windows

1. Go to [nodejs.org](https://nodejs.org/)
2. Click the **LTS** button (labelled "Recommended For Most Users")
3. Run the downloaded `.msi` file — click **Next** through all the defaults
4. Open the **Terminal** app:
   - Press the **Windows key**, type `Terminal`, press **Enter**
   - (If Terminal isn't available, search for **Command Prompt** instead)
5. Type this and press Enter:
   ```
   node --version
   ```
   You should see something like `v20.11.0` — that means it's working ✅

### Mac

1. Go to [nodejs.org](https://nodejs.org/)
2. Click the **LTS** button
3. Run the downloaded `.pkg` file — click through the defaults
4. Open the **Terminal** app:
   - Press **Cmd + Space**, type `Terminal`, press **Enter**
5. Type this and press Enter:
   ```
   node --version
   ```
   You should see something like `v20.11.0` — that means it's working ✅

---

## Step 3 — Install Claude Code

Claude Code is Anthropic's AI assistant that runs in your terminal. It reads and writes files directly on your computer, which is what makes it a vault maintainer rather than just a chatbot.

**Pricing:** Claude Code uses the Anthropic API with usage-based pricing. A typical daily session costs **$0.01–$0.05**. There is no monthly subscription — you only pay for what you use.

### Install steps

1. In your terminal, run:
   ```
   npm install -g @anthropic-ai/claude-code
   ```
2. When it's done, run:
   ```
   claude --version
   ```
   You should see a version number ✅
3. Run `claude` once to connect your Anthropic account — it will open a browser window for authentication

For full Claude Code documentation: [claude.ai/code](https://claude.ai/code)

---

## Step 4 — Open your terminal and navigate to the right place

Your vault is a folder on your computer. The terminal needs to be "inside" the parent folder where you want your vault created.

### Open the terminal

**Windows:** Press the **Windows key**, type `Terminal`, press **Enter**

**Mac:** Press **Cmd + Space**, type `Terminal`, press **Enter**

### Navigate to your chosen location

Type `cd` (change directory) followed by the folder path, then press Enter.

**To put your vault in Documents:**

Windows:
```
cd Documents
```

Mac:
```
cd ~/Documents
```

**To put it in a specific subfolder (e.g. Documents → Projects):**
```
cd Documents/Projects
```

> 💡 **Tip:** You can type `ls` (Mac) or `dir` (Windows) and press Enter to see what's in the current folder — useful to confirm you're in the right place.

---

## Step 5 — Run the installer

In your terminal, type this and press Enter:

```bash
npx polymath-world
```

`npx` downloads and runs the package automatically — you don't need to install anything else first. The first run downloads Polymath World (takes a few seconds), then starts the interactive setup.

---

## Step 6 — Answer the three setup questions

The CLI will ask you three things:

**Question 1: Where should I create your vault?**
Press **Enter** to accept the default (`./my-vault`), or type a custom name like `Second Brain` and press Enter.

**Question 2: What areas do you want to start with?**
Areas are your ongoing responsibilities — Learning, Health, Finance, Work are the defaults. Press **Enter** to accept them, or type your own list separated by commas (e.g. `Design, Research, Language, Health`).

**Question 3: Install caveman for token compression? (y/n)**
Caveman compresses Claude's conversational messages to reduce API costs. It does not affect wiki page quality. Type `y` to install or `n` to skip — you can add it later.

The vault folder is created once you answer all three. You'll see a confirmation message with next steps.

---

## Step 7 — Open the vault in Obsidian

1. Open **Obsidian**
2. Click **Open folder as vault**
3. Navigate to the folder just created (e.g. `Documents/my-vault`)
4. Click **Open**

You'll see the PARA folder structure in the left panel. This is your vault.

---

## Step 8 — Start Claude Code inside your vault

Go back to your terminal. Navigate into the vault folder you just created:

```
cd my-vault
```

(Replace `my-vault` with whatever you named your vault in Step 6.)

Then start Claude Code:

```
claude
```

Claude will read the `CLAUDE.md` file and confirm it's ready. You'll see a message like:

> *"I've read the schema and the last N log entries. Last activity was [date]. What would you like to work on?"*

---

## Step 9 — Your first ingest

You're ready to use the system.

Save an article, PDF, or any document into the `3 - Resources/` folder inside your vault. Then, inside the Claude Code session you opened in Step 8, type:

```
ingest [filename]
```

For example:
```
ingest my-article.md
```

Claude will classify the source, extract key takeaways, write structured wiki pages, update your index, and log the activity — all automatically.

---

## Next steps

- [Ingest Guide](ingest-guide.md) — detailed walkthrough of the full ingest workflow
- [Daily Notes](daily-notes.md) — how daily journaling works differently from regular ingests
- [FAQ](faq.md) — workflow questions, cost, structure, philosophy

---

## Troubleshooting

**"npx: command not found" or "node is not recognized"**
Node.js isn't installed or didn't install correctly. Go back to [Step 2](#step-2--install-nodejs).

**"claude: command not found"**
Claude Code isn't installed. Go back to [Step 3](#step-3--install-claude-code).

**"Permission denied"** *(Mac only)*
Run the command with `sudo`:
```
sudo npx polymath-world
```

**The vault folder was created but seems empty**
Check that you opened the correct folder in Obsidian. The vault root should contain `CLAUDE.md` and the numbered folders (`0 - Wiki`, `1 - Projects`, etc.).

**Something else went wrong**
Open an issue at [github.com/Hi7anshu/polymath-vault/issues](https://github.com/Hi7anshu/polymath-vault/issues) — describe what happened and paste the error message you saw.
