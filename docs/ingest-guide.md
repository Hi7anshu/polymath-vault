# Ingest Guide

> How to turn any source — article, PDF, web clip, note — into structured wiki knowledge.

---

## What "ingest" means

Ingesting is the core action of Polymath World. You give Claude a raw source. Claude reads it, extracts what matters, writes structured wiki pages, cross-references existing knowledge, and logs everything. You don't touch the output unless you want to.

One command:

```
ingest [filename or describe what you want to ingest]
```

---

## Step-by-step: what happens

### Step 1 — Classification
Claude asks one question:

> "Is this for a specific project, or does it belong to an ongoing area?"

Answer honestly. A **project** has a deadline and a defined outcome (e.g. a thesis, a product launch, a course you're taking). An **area** is ongoing (e.g. Health, Finance, Learning, a skill you're building).

If it's general reference with no clear owner, it goes to `0 - Wiki/`.

### Step 2 — Read and discuss
Claude reads the source and surfaces 3–5 key takeaways. This is your moment to redirect:

- "Focus more on the methodology, less on the history"
- "De-emphasise the author's personal opinions"
- "This is specifically relevant to my [project]"

Claude adjusts before writing.

### Step 3 — Source summary page
A `Summary - [Title].md` is created in the appropriate folder. This is the receipt — it records what was ingested, what the key takeaways were, and which wiki pages were updated.

### Step 4 — Wiki pages
Claude identifies which entity, concept, or topic pages need to be created or updated. A good source might touch 3–6 pages. Each page:

- Gets the source added to its `sources:` frontmatter
- Gets its `updated:` date revised
- Gets new facts, definitions, or connections added under the right heading

### Step 5 — Person pages
Any significant person mentioned in the source (author, researcher, historical figure, practitioner) gets checked against `2 - Areas/People/`. If no page exists, one is created. If one exists, the new source is appended to "Appears In."

Don't create person pages for passing mentions — only for people who are primary voices or key actors.

### Step 6 — Wikilink resolution
Every `[[wikilink]]` written across all new and updated pages must resolve to an existing file. If a linked concept has no page yet, Claude creates a minimal stub. No dangling links — ever.

### Step 7 — Synthesis update
The `_synthesis.md` for the relevant project or area is updated. Current understanding is revised, new open questions are flagged, any contradictions are noted.

### Step 8 — Index + log
`0 - Wiki/index.md` is updated with any new pages. `0 - Wiki/log.md` gets a new entry recording what was ingested, which pages were touched, and anything notable.

---

## Source types

| Source | How to ingest |
|--------|--------------|
| Saved article (`.md` web clip) | Drop into `3 - Resources/`, then: `ingest [filename]` |
| PDF | Drop into `5 - Attachments/`, then: `ingest [filename]` |
| URL you want to read | Paste the URL: `ingest this article: [url]` |
| Your own notes | Drop into `3 - Resources/`, ingest normally |
| Podcast summary | Write a rough transcript or notes, drop into `3 - Resources/`, ingest |
| Book chapter | Same as PDF — drop into `5 - Attachments/` |

---

## Token efficiency during ingest

Before a long ingest session, Claude switches to caveman compression for all conversational output — status updates, questions, confirmations. This cuts token usage by ~65–75%.

Wiki pages are always written in normal prose. Compression never appears in vault files.

---

## What good ingest output looks like

After ingesting a single well-written article, you might see:

- 1 source summary page created
- 2–4 wiki pages created or updated
- 1–2 person pages created or updated
- 1 synthesis page updated
- `index.md` updated (new entries)
- `log.md` updated (new entry)

That's 6–9 file operations from one source. Manually, that would take 20–30 minutes. With Polymath World: one command.

---

## Tips

**Don't batch sources.** Ingest one at a time. The classification question and the discussion step are where the system learns what matters to you — skipping them produces generic output.

**Use the discussion step.** Step 2 is where you shape the output. It takes 30 seconds and makes a significant difference to output quality.

**Let contradictions surface.** If a new source disagrees with something in your existing wiki, Claude flags it. Don't resolve it immediately — let it sit in "Notes & Contradictions" until you have enough information to make a call.

**Ingest your own thinking.** Your rough notes, half-formed ideas, and daily notes are valid sources. The system is designed to ingest your thinking, not just external content.

---

## Related

- [Daily Notes](daily-notes.md) — how daily notes are handled differently
- [Lint Workflow](faq.md#lint) — keeping the wiki healthy over time
