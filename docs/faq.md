# FAQ

Frequently asked questions about Polymath World.

---

## Setup

**Do I need Obsidian?**
Technically no — the vault is plain markdown files and works in any editor. But Obsidian is strongly recommended because the graph view makes the cross-referencing visible, the backlinks panel shows connections, and the `[[wikilink]]` syntax is native to it. Everything is more useful with Obsidian.

**Which Obsidian plugins do I need?**
None are required. The system works with vanilla Obsidian. If you want extras: *Dataview* for querying your index, and *Graph Analysis* for visualising connections. Both are optional.

**Do I need a paid Claude plan?**
You need Claude Code with an Anthropic API key. The API has usage-based pricing. With caveman installed, a typical ingest session uses ~1,000–1,500 tokens (conversational) + ~2,000–4,000 tokens (writing the pages). At current Claude pricing, a daily ingest session costs roughly $0.01–0.05. It compounds cheaply.

**Can I use this with a different LLM?**
The `CLAUDE.md` schema is designed for Claude Code specifically. The skill file, session startup behaviour, and caveman integration are Claude-native. You could adapt it for other tools, but out of the box: Claude only.

---

## Workflow

**How often should I ingest?**
When you have something worth ingesting. There's no rule. Some people batch once a week; others ingest the same day they save something. The system doesn't degrade if you miss days.

**What if I have hundreds of saved articles I've never processed?**
Start from today, not the backlog. Pick your 5–10 most important saved sources and ingest those first. The system is most valuable going forward — don't let backlog anxiety stop you from starting.

**Can I ingest things that aren't text?**
Claude can read PDFs and some image formats. For audio (podcasts, lectures), write a rough summary or use a transcription tool first, then ingest the transcript.

**What if Claude creates a page I don't want?**
Delete it and note that in the log. Over time, Claude learns from the pattern of what you keep and what you delete — especially if you give brief feedback ("this is too granular" or "this person doesn't warrant their own page").

**Can I edit the wiki pages myself?**
Yes. The wiki is plain markdown — edit anything. If you revise a page, update the `updated:` date in the frontmatter. Claude will incorporate your edits into future synthesis updates.

---

## The lint workflow {#lint}

**What is linting?**
Linting is a periodic health check on your wiki. Run it every few weeks, or when the vault feels messy.

Say:
```
lint the wiki
```

Claude checks for:
- **Orphaned pages** — pages with no inbound links (nothing points to them)
- **Dangling links** — `[[wikilinks]]` that point to files that don't exist
- **Missing person pages** — people mentioned in multiple pages who lack their own page in `2 - Areas/People/`
- **Stale synthesis pages** — synthesis pages whose change log hasn't been updated in >30 days
- **Answerable open questions** — open questions in synthesis pages that could be answered by existing pages in the vault
- **Missing cross-references** — two clearly related pages that don't link to each other

Claude outputs a lint report. You can choose to file it as `0 - Wiki/lint-[date].md` for the record.

**How often should I lint?**
Monthly is a good default. After a heavy ingest period (10+ sources in a short time), lint sooner.

---

## Token efficiency

**What does caveman actually do?**
Caveman compresses Claude's *conversational* output — the messages it sends to you during a session. It uses terse, minimal language (think: "ingested. 3 pages updated. synthesis revised. log appended.") instead of full sentences.

It does **not** affect wiki page content. Pages are always written in full, readable prose.

**How much does it actually save?**
Typically 65–75% on conversational tokens. For a full ingest session, the compression saves the equivalent of several thousand tokens — meaningful at scale, especially if you ingest frequently.

**Do I need caveman? Can I skip it?**
It's optional. If you run `npx polymath-world` and opt out, caveman isn't installed. The workflow functions identically — it just uses more tokens per session.

---

## Structure

**Why PARA and not [other system]?**
PARA is the most durable, least opinionated structure that handles both active work and long-term reference. It's been stress-tested by thousands of knowledge workers since Tiago Forte published it. The four-folder structure maps cleanly to how Claude decides where to file things.

**Can I rename the folders?**
Yes, but update `CLAUDE.md` to reflect your naming. The schema is what Claude reads — the folder names in the schema must match your actual folder names.

**What's the difference between Projects and Areas?**
A **Project** has a finish line. "Write my dissertation" is a project. "Keep learning Spanish" is an area. When a project ends, it moves to `4 - Archives/`. Areas are permanent — they grow indefinitely.

**How big can the vault get?**
The system scales well. The index file (`0 - Wiki/index.md`) becomes the performance bottleneck at very large scale (500+ pages), but that's a solvable problem. For most users, the vault grows for years before this is relevant.

---

## Credits and philosophy

**Where did the LLM Wiki idea come from?**
Andrej Karpathy proposed using an LLM as a persistent wiki maintainer — something that reads and writes structured knowledge rather than just answering questions and forgetting. The `CLAUDE.md` schema is this idea, made concrete and operational.

**Why is this a package rather than just a blog post?**
Because instructions alone don't create systems. A blog post tells you what to do. `npx polymath-world` does it. The goal is zero friction between "I want this system" and "I'm using this system."

**Is this a PARA vault, a Zettelkasten, a second brain?**
Closest to a second brain in the Tiago Forte sense, using PARA as structure. It's not a Zettelkasten — there are no permanent notes (Zettels) or explicit atomic note principles. The synthesis-and-cross-reference approach borrows from Zettelkasten thinking but is designed around how LLMs work, not how index cards work.

---

## Contributing

Found a bug? Have a workflow improvement? Open an issue or PR at [github.com/Hi7anshu/polymath-vault](https://github.com/Hi7anshu/polymath-vault).
