# Daily Notes

> Daily notes are not ingested as summary pages. They are read, mined, and dissolved into the wiki.

---

## The distinction

Most sources in your vault get a `Summary - [Title].md` page — a permanent record of what was ingested and what it contributed. Daily notes are different.

A daily note is a raw stream: tasks, thoughts, links, observations, fragments. It's not a source — it's a signal. The goal isn't to archive it. The goal is to extract what's useful and route it to where it belongs.

**Daily notes produce no summary page.** Instead:
- Insights are routed directly to the relevant synthesis pages
- Recurring themes surface open questions in area syntheses
- Links and references get queued for future ingest
- Tasks and to-dos are not ingested at all

---

## How to process a daily note

Say:

```
process my daily note: [filename or date]
```

Claude will:
1. Read the note in full
2. Identify cross-area insights (things relevant to Learning, Health, Finance, etc.)
3. Route each insight to the appropriate `_synthesis.md` — adding to Current Understanding or Open Questions
4. Flag any sources (articles, PDFs, URLs) mentioned — ask if you want to ingest them now
5. Log the processing in `0 - Wiki/log.md` under the date, without creating a summary page

---

## What gets routed vs. ignored

| Content type | What Claude does |
|-------------|-----------------|
| Insight about a topic you're studying | → Routes to area synthesis (Learning, etc.) |
| Observation about your health/habits | → Routes to Health synthesis |
| Idea for a project | → Routes to project synthesis as an open question |
| Link to an article you saved | → Flags for future ingest |
| Task or to-do item | → Ignored (not wiki material) |
| Random half-thought | → Held in Current Understanding if it forms a pattern; otherwise ignored |
| Quote from something you read | → Queued as a source to ingest |

---

## Work daily notes (task-management notes)

If you use a separate task-management file (e.g. a work to-do list, sprint notes, meeting notes), treat it the same way — read and extract, don't ingest as a document.

Meeting notes that contain decisions or insights are worth routing. Pure task lists are not.

---

## Why not just ingest daily notes normally?

Two reasons:

**1. Volume.** If you write daily, you'd create 365 summary pages per year. The index becomes noise. The signal-to-noise ratio collapses.

**2. Format.** Daily notes are raw and unstructured by nature. Forcing them through a structured summary page produces low-quality output. Routing insights directly to syntheses keeps quality high.

The information in your daily notes doesn't disappear — it's absorbed into the living synthesis pages where it compounds with everything else you know.

---

## Setting up your daily notes folder

When Polymath World scaffolds your vault, it creates the PARA structure. Your daily notes can live anywhere — a common setup:

```
2 - Areas/
└── Life/
    └── Daily Notes/
        ├── 2026-04-25.md
        ├── 2026-04-24.md
        └── ...
```

Or you can keep them in a separate Obsidian daily notes plugin folder and just reference the path when asking Claude to process them.

---

## Related

- [Ingest Guide](ingest-guide.md) — how full source ingestion works
- [FAQ](faq.md) — common questions about the workflow
