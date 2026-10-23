# Genial Relations — PRD v0.1

Oct 21, 2026 · Owner: @Madhura Redij · Status: draft

## Summary

Genial Relations is a browser-based hypertext mystery set at a family reunion of words. All 25 guests descend from the root \*gene- ("give birth, beget"). Readers visit five tables, follow gossip and family ties from word to word, collect evidence, and deliver a verdict on one question: is King kin? Every joke rests on a sourced etymology.

**Changes from the screen reviews.** One suspect, King, replaces the five, and the reader traces King's line to \*gene- from auto-pinned steps and rumours (spec: Story system). The head-table host Kin is now **Kindred**. Every screen has a 1440px desktop layout as well as the 390px phone layout; whether desktop is in launch scope is still open. Visual system, fonts and marks are in the spec's Visual direction and Typography sections. The CLAUDE.md build brief overrides this PRD where they disagree, including the 4-day build instead of the 3-week plan below.

It's Madhura Redij's first build with Claude Code: a small, public, shareable piece that shows interaction design, writing and craft.

## Problem and opportunity

- **Etymology is fascinating but presented flat.** Most etymology online is a dictionary entry: one word at a time, no story, no reason to click onward. The surprising part, that *king*, *kind*, *genius* and *puny* are relatives, is buried in lists.
- **Word play spreads in group chats.** Surprising word facts are the kind of thing people forward. A piece built to be passed along (an invitation, a trail card) can travel the way the facts already do.
- **A portfolio gap.** Madhura wants portfolio projects she has built in code, not only designed. This one shows interaction and motion craft along with product and content thinking.

## Goals

1. **Ship a finished, public v1** of one family (\*gene-) that a stranger can complete on a phone in one sitting.
2. **Make it worth forwarding:** the invitation and the trail card should be good enough that people send them unprompted.
3. **Show craft:** interaction and motion on the table page, typography driven by data, and a clear gossip-vs-record visual system.
4. **Stay accurate:** every fact on every page traces to a source.
5. **Learn to build:** Madhura understands and can explain the code, not just ship it.

## Non-goals (v1)

- Covering any word a reader types in. v1 is curated, one family only.
- Live AI generation. All copy is written and checked ahead of time.
- Accounts, saved progress across devices, or a shared vote.
- Languages other than English.
- Being a reference dictionary. Pages link out to sources for depth.

## Users

| User | What they want | What they do |
| --- | --- | --- |
| **The curious reader** (primary) | A few minutes of delight; something surprising to tell a friend | Opens an invitation link on a phone, follows gossip, may or may not finish |
| **The word nerd** | Real etymology, done well | Reads the record, follows blood links, checks sources, finishes the mystery |
| **The portfolio reviewer** | Evidence of craft and judgement | Skims on desktop, tries one table, looks at motion and typography, reads the case study |

## User stories

**Arriving**

1. As a reader opening a friend's invitation, I land on the word they named, so I start somewhere personal.
2. As a first-time visitor, I understand within one screen that this is a reunion with a mystery, and how to start.
3. As a reader on the landing page, I can tap any object in the margin, any floater, or any table to go there.

**Exploring**

4. As a reader at a table, I see who's seated there and hear a snippet that points me to one guest.
5. When I come back to a table, the snippet is different, so returning feels worth it.
6. On a word page, I can tell at a glance which parts are fact (the record) and which are story (the gossip).
7. On a word page, I can jump to a relative by blood or by gossip, sometimes at another table.
8. As a word nerd, I can reach the source for every fact.

**Solving**

9. As I open pages, the clues I find pin themselves to the evidence row, and I can see which tables are still open.
10. Once every table is cleared, I'm invited to the head table to give my verdict.
11. After my verdict, I see how my answers compare with the record, without being told I lost.

**Sharing**

12. At the end, I get a trail card showing my route and verdict, ready to post.
13. I can send a friend an invitation that names a guest I think they'll like.

**Throughout**

14. On a phone, every page is readable and every tap target is easy to hit.
15. With reduced motion on, nothing animates that I need to wait for.
16. With a screen reader, I can hear every object's and place card's name.

## Requirements

Priorities are a proposed cut line, pending Madhura's call. **P0** = required to launch v1. **P1** = ships if time allows. **P2** = later.

| ID | Requirement | Priority | Done when | Stories |
| --- | --- | --- | --- | --- |
| R1 | **Landing page:** invitation, margin of 25 objects, five tables, floater names; everything links | P0 | Every object, table and floater opens the right page | 2, 3 |
| R2 | **Table page:** round table, place cards, red crayon zigzag on read cards, one snippet with a setup line and a pointer | P0 | All 5 tables render on a 360px-wide screen | 4 |
| R3 | **Word pages (×25):** record, gossip, testimony, typed links, sources | P0 | Every page has ≥1 blood link, ≥1 other link, and a source | 6, 7, 8 |
| R4 | **Direct links:** every word and table page has its own URL | P0 | A shared link opens that exact page | 1 |
| R5 | **Evidence:** opening a page that holds a step or rumour pins it automatically; rumours flip when a record settles them | P0 | Margin and table states update immediately and survive a reload | 9 |
| R6 | **Verdict and endings:** head table opens the verdict card after all five are cleared; one question (is King kin?) read against the case file of pinned clues; ending 1 then 6 | P0 | Verdict compares with the record; no fail state | 10, 11 |
| R7 | **Data files:** all content in JSON following the schema in the spec | P0 | No content hard-coded in page code | — |
| R8 | **Phone, accessibility, motion basics:** readable at 360px, labels on all objects and cards, reduced-motion respected | P0 | Passes a manual check on one phone and with a screen reader | 14–16 |
| R9 | **Snippet rotation:** bank, assembly rules, prefers unvisited guests | P1 | 5 visits to one table never repeat a pointer line twice in a row | 5 |
| R10 | **Floater cameos** in snippets, about one in three | P1 | Cameos appear at their listed tables only | 5 |
| R11 | **Trail card:** image of margin, route, verdict; plus link previews | P1 | Pasting a link in a chat app shows the card | 12 |
| R12 | **Invitation:** compose a message naming a guest, linking to that guest's page | P1 | Message opens the named page | 13 |
| R13 | **Typography layers 1–2:** era picks the family, meaning tags set size and case | P1 | Driven by data fields, not set by hand per page | — |
| R14 | **Motion moments:** cards settle, snippet appears, evidence flies to the margin | P1 | Each under \~600ms and skipped with reduced motion | — |
| R15 | **Typography layer 3:** variable-font axes from the record | P2 | — | — |
| R16 | **Swapped place cards** at the academics' table | P2 | — | — |
| R17 | **Case-study page** for the portfolio | P2 | — | — |

**Quality checks before launch (P0)**

- Every fact on every page re-checked against its source, in our own words.
- The link map checked as a graph: no orphan pages, no page reachable only by a required order.
- Copy read against the tone guide.

## Success metrics

There's no analytics in v1 yet; that's an open question. Targets are left blank on purpose, to be set once there's a baseline from testing.

| Goal | Signal | How it's measured | Target |
| --- | --- | --- | --- |
| Finished and public | v1 live at a public URL, all P0 requirements met | Launch checklist | Yes/no |
| Completable | Testers reach the verdict unaided on a phone | 5 moderated test sessions | TBD after testing |
| Fun and clear | Testers can explain the mystery and the gossip-vs-record split after one table | Same sessions, post-test questions | TBD |
| Forwardable | Invitations sent and trail cards shared | Analytics events, if added | TBD |
| Accurate | Fact errors found after launch | Reader reports, own re-checks | Zero known errors left unfixed |
| Learning | Madhura can explain each part of the code and change it herself | Self-review at each milestone | Yes/no |

**Test sessions:** five people, mixed between word nerds and casual readers, on their own phones. Watch for where they get stuck, which table they start at, whether they notice the pointers, and whether they'd send the invitation.

## Constraints

- **Time:** about 2–3 weeks, per the original brief. Hours per week not yet set.
- **Builder:** first Claude Code project; Claude writes the code and explains it, Madhura reviews and learns.
- **Fonts:** openly licensed only (Google Fonts, OFL). Pixel Surplus freebies likely need a paid licence to embed on a website.
- **Content:** Etymonline is the source of record; text is written in our own words with links, never copied.
- **No backend** in v1: static pages plus browser storage.

## Dependencies

- Final content from the content doc, edited and approved.
- Tech and hosting choice.
- Marginalia objects (25) drawn in one style.
- Font licences confirmed for the era fonts.

## Risks

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Scope outgrows 2–3 weeks | High | High | Hold the P0 line; P1 only after P0 ships |
| Jokes land flat or offend | Medium | High | Tone guide; voice pass; test sessions |
| A fact is wrong | Medium | High | Re-check every record line before launch; sources on every page |
| Readers don't notice the pointers and stall | Medium | Medium | Pencil mark on the pointed-to card; test and adjust |
| Round table and margin don't fit phones | Medium | Medium | Prototype one table page first, on a phone |
| Drawing 25 objects takes longer than expected | Medium | Low | Start with simple marks; refine later |
| First-time builder gets stuck in tooling | Medium | Medium | Simplest stack; build one page end to end first |

## Milestones

This assumes the 3-week window; dates are set once hours per week are known.

1. **Week 1: one table, end to end.** Stack chosen. Head table data in JSON. Head table page and its three word pages working on a phone, with auto-pinned clues. This is the riskiest slice, so it goes first.
2. **Week 2: the whole reunion.** All five tables and 25 word pages. Landing page with the margin of objects and the reunion hall.
3. **Week 3: solve and ship.** Verdict card, endings 1 → 6, quality checks (facts, link map, accessibility), five test sessions, launch. P1 items only after launch.

## Open questions

- [ ] Hours per week and a deadline.
- [ ] Approve the P0 / P1 / P2 cut line.
- [ ] Tech and hosting.
- [ ] Analytics: none, or a privacy-friendly count of invitations and finishes?
- [ ] Portfolio goal: what this project should prove to a reviewer.
- [x] Final title: Genial Relations (decided 2026-10-23).
- [ ] Ingenious: keep with the academics, or move to Old money.
- [ ] Typography Layer 3 approach.

## Related docs

- [Genial Relations — Product Spec](https://claude.ai/artifact/KiGdka7mkZQg9eAUnAbbK4): concept, data model, UX, visual and type systems
- [Genial Relations — Content v0.1](https://claude.ai/artifact/A6mZEBktKM5aegJhJcn1v8): every guest, table, snippet line and ending, with sources
