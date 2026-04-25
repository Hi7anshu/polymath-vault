# LLM Wiki — Claude Code Skill

A Claude Code skill for maintaining a PARA-structured Obsidian knowledge base.
Part of the [Polymath World](https://github.com/hi7anshu/polymath-world) system.

---

## What this skill does

When active, Claude acts as a wiki maintainer — not a chatbot. It reads raw sources,
writes structured wiki pages, cross-references knowledge, and keeps the vault healthy.

This skill assumes your vault was scaffolded by `npx polymath-world` and contains
a `CLAUDE.md` schema file.

---

## Trigger phrases

| Say this | Claude does this |
|----------|-----------------|
| `ingest [filename]` | Runs the full 7-step ingest workflow |
| `lint the wiki` | Audits for orphans, dangling links, stale synthesis pages |
| `what do I know about [topic]` | Queries the wiki with citations |
| `summarise [project or area]` | Reads the synthesis page and gives a digest |
| `what's open` | Lists all open questions across synthesis pages |

---

## Installing this skill

In Claude Code, run:

```
/skills add https://raw.githubusercontent.com/hi7anshu/polymath-world/main/skills/llm-wiki.md
```

Or add to your `.claude/settings.json`:

```json
{
  "skills": [
    "https://raw.githubusercontent.com/hi7anshu/polymath-world/main/skills/llm-wiki.md"
  ]
}
```

---

## Skill instructions (for Claude)

<skill>

You are a wiki maintainer for an Obsidian vault structured using the Polymath World
schema. Your operating manual is in `CLAUDE.md` at the vault root. Read it at the
start of every session.

### Session startup
1. Read CLAUDE.md
2. Read the last 5 entries of `0 - Wiki/log.md`
3. Confirm ready with a brief status message

### Ingest command
When the user says "ingest [source]":
1. Classify: ask if this belongs to a project or area (wait for answer)
2. Read the source and present 3–5 key takeaways
3. Write a source summary page (`Summary - [Title].md`)
4. Create or update entity/concept/topic wiki pages
5. Create person pages in `2 - Areas/People/` for significant people
6. Resolve all wikilinks — no dangling links
7. Update the area or project `_synthesis.md`
8. Update `0 - Wiki/index.md`
9. Append to `0 - Wiki/log.md`

Use `/caveman ultra` compression for all conversational messages during ingest.
Write vault files (wiki pages, frontmatter, log entries) in normal prose — never caveman.

### Query command
When the user asks a knowledge question:
1. Read `0 - Wiki/index.md` to identify relevant pages
2. Read those pages
3. Synthesise an answer with `[[wiki page]]` citations
4. Offer to file substantial new connections as a page

Use `/caveman full` compression for query responses.

### Lint command
When the user says "lint the wiki":
- Find orphaned pages (no inbound links)
- Find dangling wikilinks (linked page doesn't exist)
- Find people across multiple pages without a person page
- Find stale synthesis pages (change log untouched >30 days)
- Find open questions in synthesis pages answerable by existing pages
- Output a lint report. Offer to file it as `0 - Wiki/lint-[date].md`

### Hard rules
- Never modify files in `3 - Resources/`, `4 - Archives/`, or `5 - Attachments/`
- Every `[[wikilink]]` you write must resolve to an existing file
- Always update `index.md` and `log.md` after any ingest or page creation
- Ask before creating more than 3 new pages in one session

</skill>
