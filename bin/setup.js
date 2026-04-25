#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise(resolve => rl.question(q, resolve));

const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';
const CYAN = '\x1b[36m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const DIM = '\x1b[2m';

function print(msg) { process.stdout.write(msg + '\n'); }
function hr() { print(DIM + '─'.repeat(50) + RESET); }

// ─── TEMPLATES ────────────────────────────────────────────────────────────────

function claudeMd(areas) {
  const areaList = areas.map(a => `│   └── ${a}/`).join('\n');
  return `# CLAUDE.md — LLM Wiki Schema

> This file is the operating manual for Claude Code in this Obsidian vault.
> Read this file at the start of every session before taking any action.

---

## 1. Who you are in this vault

You are the wiki maintainer. Your job is to read raw sources, generate structured
wiki pages, maintain cross-references, and keep the knowledge base healthy.

You never write the wiki in a way that requires the human to edit it.
You never modify raw source files (3 - Resources, 4 - Archives, 5 - Attachments).

The human's job: curate sources, answer classification questions, direct analysis.
Your job: everything else — summarising, cross-referencing, filing, indexing, logging.

---

## 2. Vault structure

\`\`\`
Vault/
├── CLAUDE.md                       ← this file (read-only for you)
│
├── 0 - Wiki/
│   ├── index.md                    ← master catalog of all wiki pages
│   └── log.md                      ← append-only activity log
│
├── 1 - Projects/                   ← active work with a defined outcome + deadline
│   └── [Project Name]/
│       ├── _synthesis.md           ← LLM-maintained evolving synthesis
│       └── [wiki pages]
│
├── 2 - Areas/                      ← ongoing responsibilities, no end date
${areaList}
│       ├── _synthesis.md
│       └── [wiki pages]
│
├── 3 - Resources/                  ← raw sources: web clips, PDFs, notes (DO NOT MODIFY)
│
├── 4 - Archives/                   ← completed projects, inactive areas (DO NOT MODIFY)
│
└── 5 - Attachments/                ← binary files: PDFs, images (DO NOT MODIFY)
\`\`\`

**Hard rules:**
- \`3 - Resources/\`, \`4 - Archives/\`, and \`5 - Attachments/\` are immutable. Read, never write.
- Wiki pages go in \`1 - Projects/\`, \`2 - Areas/\`, or \`0 - Wiki/\` only.
- \`0 - Wiki/index.md\` and \`0 - Wiki/log.md\` are updated on every ingest and lint pass.

---

## 3. Page formats

### 3a. Wiki page (entity, concept, topic)

\`\`\`markdown
---
type: [entity | concept | topic | synthesis | summary | analysis]
created: YYYY-MM-DD
updated: YYYY-MM-DD
sources: [filename1.md, filename2.pdf]
tags: [tag1, tag2]
---

# Page Title

## Overview
2–4 sentence summary.

## Key Details
Structured facts, definitions, or properties.

## Connections
- Related to [[Other Page]] because...

## Notes & Contradictions
Flag anything uncertain, contested, or superseded.

## Sources
- [[raw source filename]] — one-line note on what this source contributed
\`\`\`

### 3b. Synthesis page (\`_synthesis.md\`)

\`\`\`markdown
---
type: synthesis
updated: YYYY-MM-DD
source_count: N
---

# [Project / Area] — Synthesis

## Current Understanding
Best current picture based on all ingested sources.

## Open Questions
Things we still don't know. Gaps needing more sources.

## Key Decisions / Positions
Decisions made, conclusions reached.

## Contradictions on Record
Where sources disagree and the current best read.

## Change Log
- YYYY-MM-DD: [what changed and why]
\`\`\`

### 3c. Person page

Lives in \`2 - Areas/People/\` (create if it doesn't exist).

\`\`\`markdown
---
type: person
created: YYYY-MM-DD
updated: YYYY-MM-DD
tags: [person]
---

# [Full Name]

One sentence: who they are and why they matter in this vault's context.

## Appears In
- [[Summary - Source Title]] — role in this source

## Connections
- [[Related concept or area]] — brief reason

**Part of:** [[2 - Areas/People]]
\`\`\`

### 3d. Source summary page

\`\`\`markdown
---
type: summary
source_file: [original filename]
source_type: [web-clip | pdf | note | transcript]
ingested: YYYY-MM-DD
---

# Summary: [Source Title]

## Key Takeaways
- Bullet points of the most important information

## Relevant To
- [[Page 1]], [[Page 2]] — which wiki pages were updated

## Raw Source
[[link to original file in 3 - Resources/ or 5 - Attachments/]]
\`\`\`

---

## 4. Ingest workflow

**Output compression:** invoke \`/caveman ultra\` at the start of any ingest session.
Use caveman ultra for all conversational responses. **Exception: wiki page content,
frontmatter, and log entries are written normally — caveman style must never appear
in vault files.**

When the human says "ingest [filename]":

**Step 1 — Classify** Ask: "Is this for a specific project, or an ongoing area?"
Wait for answer before proceeding.

**Step 2 — Read & discuss** Present 3–5 key takeaways. Ask if anything should be
emphasised before writing.

**Step 3 — Write source summary page** in the appropriate folder.

**Step 4 — Update or create wiki pages** for each entity, concept, or topic.

**Step 4b — Person pages** For every significant person, check \`2 - Areas/People/\`.
Create if doesn't exist. Append new source to "Appears In" if it does.

**Step 4c — Resolve all wikilinks** Every \`[[wikilink]]\` must resolve to an existing
file. Create stubs for anything meaningfully linked and likely to recur.

**Step 5 — Update \`_synthesis.md\`** for the relevant Project or Area.

**Step 6 — Update \`0 - Wiki/index.md\`** Add new pages to the catalog.

**Step 7 — Append to \`0 - Wiki/log.md\`**

---

## 5. Query workflow

**Output compression:** invoke \`/caveman full\` for query responses.

1. Read \`0 - Wiki/index.md\` to identify relevant pages
2. Read those pages
3. Synthesise answer with \`[[wiki page]]\` citations
4. If substantial, ask: "Should I file this as a new page?"

---

## 6. Lint workflow

**Output compression:** invoke \`/caveman ultra\` for status messages.

Check for: orphaned pages, dangling wikilinks, people needing person pages,
contradictions, stale synthesis pages, missing cross-references, answerable
open questions.

---

## 7. Cross-referencing

- Synthesis pages are hubs — they list and link all child pages
- Every child page ends with: \`**Part of:** [[Parent _synthesis]]\`
- Always use \`[[Page Name]]\` Obsidian wiki-link syntax
- Every \`[[wikilink]]\` must resolve — create stubs if necessary
- Significant people get a page in \`2 - Areas/People/\`

---

## 8. index.md format

\`\`\`markdown
# Wiki Index
_Last updated: YYYY-MM-DD | Total pages: N_

## Projects
| Page | Type | Summary | Updated |

## Areas
| Page | Type | Summary | Updated |

## Concepts & Entities
| Page | Type | Summary | Updated |

## Source Summaries
| Page | Type | Summary | Updated |
\`\`\`

---

## 9. log.md format

Append-only. Never edit previous entries.

\`\`\`markdown
# Wiki Log

## [YYYY-MM-DD] ingest | Source Title
- Ingested: [file path]
- Pages created: [[A]], [[B]]
- Pages updated: [[C]]
- Notes: observation

## [YYYY-MM-DD] query | Query summary
- Question: what the human asked
- Answer filed as: [[New Page]] or "not filed"

## [YYYY-MM-DD] lint | Lint pass
- Issues found: N
- Actions taken: brief summary
\`\`\`

---

## 10. Session startup

At the start of every session:
1. Read this file (CLAUDE.md)
2. Read \`0 - Wiki/log.md\` — last 5 entries
3. Confirm ready: "I've read the schema and the last [N] log entries. Last activity
   was [date] — [brief summary]. What would you like to work on?"

Do not take any action before completing startup.

---

_Schema version: 1.0 | Generated by polymath-world_
`;
}

function indexMd(today) {
  return `# Wiki Index
_Last updated: ${today} | Total pages: 0_

## Projects
| Page | Type | Summary | Updated |
|------|------|---------|---------|
| _(no pages yet)_ | — | — | — |

## Areas
| Page | Type | Summary | Updated |
|------|------|---------|---------|
| _(no pages yet)_ | — | — | — |

## Concepts & Entities (cross-project)
| Page | Type | Summary | Updated |
|------|------|---------|---------|
| _(no pages yet)_ | — | — | — |

## Source Summaries
| Page | Type | Summary | Updated |
|------|------|---------|---------|
| _(no pages yet)_ | — | — | — |
`;
}

function logMd(today) {
  return `# Wiki Log

## [${today}] init | Vault created
- Generated by: npx polymath-world
- Notes: Vault initialised. Ready for first ingest.
`;
}

function synthesisMd(areaName, today) {
  return `---
type: synthesis
updated: ${today}
source_count: 0
---

# ${areaName} — Synthesis

## Current Understanding
_(No sources ingested yet. Begin by dropping a file and saying "ingest [filename]".)_

## Open Questions
- What are the most important things to understand about ${areaName}?

## Key Decisions / Positions
_(None yet.)_

## Contradictions on Record
_(None yet.)_

## Pages in this Area
_(None yet — will populate as sources are ingested.)_

## Change Log
- ${today}: Area created.
`;
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function today() {
  return new Date().toISOString().split('T')[0];
}

function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const item of fs.readdirSync(src)) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    if (fs.statSync(srcPath).isDirectory()) copyDir(srcPath, destPath);
    else fs.copyFileSync(srcPath, destPath);
  }
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

async function main() {
  print('');
  print(BOLD + CYAN + '  🧠 Polymath World' + RESET);
  print(DIM + '  Second brain for polymaths — PARA + LLM Wiki + Caveman' + RESET);
  print('');
  hr();

  // 1. Vault location
  const defaultPath = path.join(process.cwd(), 'my-vault');
  const vaultInput = await ask(
    `\n${BOLD}Where should your vault be created?${RESET}\n` +
    DIM + `  Press Enter for: ${defaultPath}\n` + RESET +
    '  > '
  );
  const vaultPath = vaultInput.trim() || defaultPath;

  if (fs.existsSync(vaultPath) && fs.readdirSync(vaultPath).length > 0) {
    const overwrite = await ask(`\n${YELLOW}  ⚠  That folder exists and is not empty. Continue? (y/N): ${RESET}`);
    if (overwrite.trim().toLowerCase() !== 'y') {
      print('\n  Aborted.\n');
      rl.close();
      return;
    }
  }

  // 2. Areas
  print(`\n${BOLD}What ongoing areas do you want to start with?${RESET}`);
  print(DIM + '  Examples: Learning, Health, Finance, Work, Creative, Fitness' + RESET);
  print(DIM + '  Press Enter to use defaults: Learning, Health, Finance, Work' + RESET);
  const areasInput = await ask('  > ');
  const areas = areasInput.trim()
    ? areasInput.split(',').map(a => a.trim()).filter(Boolean)
    : ['Learning', 'Health', 'Finance', 'Work'];

  // 3. Caveman
  const caveman = await ask(`\n${BOLD}Install caveman for token compression? (Y/n): ${RESET}`);
  const installCaveman = caveman.trim().toLowerCase() !== 'n';

  print('\n');
  hr();
  print(BOLD + '  Building your vault...' + RESET + '\n');

  const d = today();

  // Core structure
  const dirs = [
    '0 - Wiki',
    '1 - Projects',
    '3 - Resources',
    '4 - Archives',
    '5 - Attachments',
  ];
  for (const dir of dirs) {
    fs.mkdirSync(path.join(vaultPath, dir), { recursive: true });
    print(`  ${GREEN}✓${RESET} Created ${dir}/`);
  }

  // Areas + synthesis pages
  fs.mkdirSync(path.join(vaultPath, '2 - Areas', 'People'), { recursive: true });
  print(`  ${GREEN}✓${RESET} Created 2 - Areas/People/`);
  for (const area of areas) {
    const areaPath = path.join(vaultPath, '2 - Areas', area);
    fs.mkdirSync(areaPath, { recursive: true });
    writeFile(path.join(areaPath, '_synthesis.md'), synthesisMd(area, d));
    print(`  ${GREEN}✓${RESET} Created 2 - Areas/${area}/ with _synthesis.md`);
  }

  // Wiki index + log
  writeFile(path.join(vaultPath, '0 - Wiki', 'index.md'), indexMd(d));
  writeFile(path.join(vaultPath, '0 - Wiki', 'log.md'), logMd(d));
  print(`  ${GREEN}✓${RESET} Created 0 - Wiki/index.md and log.md`);

  // CLAUDE.md
  writeFile(path.join(vaultPath, 'CLAUDE.md'), claudeMd(areas));
  print(`  ${GREEN}✓${RESET} Created CLAUDE.md (wiki schema)`);

  // .claude/settings.json
  const settings = {
    model: 'claude-sonnet-4-5',
    skills: installCaveman
      ? ['https://raw.githubusercontent.com/juliuslipp/claude-caveman/main/skill.md']
      : []
  };
  writeFile(
    path.join(vaultPath, '.claude', 'settings.json'),
    JSON.stringify(settings, null, 2)
  );
  print(`  ${GREEN}✓${RESET} Created .claude/settings.json`);

  // .gitignore
  writeFile(
    path.join(vaultPath, '.gitignore'),
    '5 - Attachments/\n.obsidian/\n*.DS_Store\n'
  );
  print(`  ${GREEN}✓${RESET} Created .gitignore`);

  print('');
  hr();
  print('');
  print(BOLD + GREEN + '  ✅ Your vault is ready.' + RESET);
  print('');
  print(`  ${BOLD}Location:${RESET} ${vaultPath}`);
  print('');
  print(`  ${BOLD}Next steps:${RESET}`);
  print(`  1. Open ${CYAN}${vaultPath}${RESET} as a vault in Obsidian`);
  print(`  2. Open Claude Code in that folder`);
  print(`  3. Say: ${CYAN}"ingest [filename]"${RESET} to add your first source`);
  print('');
  if (installCaveman) {
    print(DIM + '  Caveman skill will be loaded when you start a Claude Code session.' + RESET);
    print('');
  }
  print(DIM + '  ★ Star the repo: https://github.com/hi7anshu/polymath-vault' + RESET);
  print('');

  rl.close();
}

main().catch(err => {
  print('\n  Error: ' + err.message);
  process.exit(1);
});
