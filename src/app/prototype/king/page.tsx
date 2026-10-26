import { notFound } from "next/navigation";
import Link from "next/link";
import { getGuest, getTable } from "@/lib/data";
import { eraFontClassName } from "@/lib/fonts";
import { withItalics, splitSentences } from "@/lib/text";
import {
  placeRelative,
  placeCallout,
  calloutBorderRadius,
  connectorPath,
  CALLOUT_STEM_PATHS,
} from "@/lib/placement";
import type { Link as GuestLink } from "@/lib/schemas/shared";
import type { Guest } from "@/lib/schemas/guest";
import { SvgFilterDefs, CrumpleOverlay } from "@/components/SvgFilterDefs";
import styles from "./page.module.css";

// Prototype for Madhura's review: the full mockup visual system (SVG
// filters, numbered record-fact callouts, paper testimony card, place-card
// relatives) applied to one guest before rolling out to all 25 word pages.
// Not linked from any other page. See CHANGELOG.md.
export default function KingPrototypePage() {
  const guest = getGuest("king");
  if (!guest) notFound();
  const table = guest.role === "floater" ? undefined : getTable(guest.table);

  const facts = guest.recordFacts ?? [];
  const sentences = splitSentences(guest.recordText);

  // across-the-room links by target slug, so a place card can pull in its
  // matching pointer text and render it as part of the same stacked group —
  // structurally tied together, not two separately-positioned elements that
  // have to be kept in sync by hand.
  const acrossTheRoomByTarget = new Map(
    guest.links
      .filter(
        (l): l is GuestLink & { slug: string } => l.type === "across-the-room" && !!l.slug
      )
      .map((l) => [l.slug, l])
  );

  // Place cards (blood/gossip links) get a position + a connector line back
  // to the current-page tag. A card whose target also has an across-the-room
  // link (see acrossTheRoomByTarget) carries that pointer text as part of
  // its own group, stacked directly under the caption.
  const relativeCards = guest.links
    .map((link, i) => ({ link, i, target: link.slug ? getGuest(link.slug) : undefined }))
    .filter(
      (entry): entry is { link: GuestLink; i: number; target: Guest } =>
        entry.link.type !== "across-the-room" && !!entry.target
    )
    .map((entry) => ({
      ...entry,
      pos: placeRelative(guest.slug, entry.i),
      pointer: acrossTheRoomByTarget.get(entry.target.slug),
    }));

  // across-the-room links whose target has no place card of its own (none
  // exist in today's data, but a future guest could have one) fall back to a
  // standalone spot instead of being silently dropped.
  const relativeCardTargetSlugs = new Set(relativeCards.map((card) => card.target.slug));
  const orphanPointerLinks = guest.links
    .map((link, i) => ({ link, i, target: link.slug ? getGuest(link.slug) : undefined }))
    .filter(
      (entry): entry is { link: GuestLink; i: number; target: Guest } =>
        entry.link.type === "across-the-room" &&
        !!entry.target &&
        !relativeCardTargetSlugs.has(entry.target.slug)
    );

  return (
    <main className={styles.page}>
      <SvgFilterDefs />
      <CrumpleOverlay opacity={0.28} />

      <nav className={styles.topNav}>
        {table && <Link href={`/table/${table.slug}`}>&larr; {table.name}</Link>}
      </nav>

      <div className={styles.columns}>
        <div className={styles.recordColumn}>
          <div className={styles.nameZoneScale}>
            <div className={styles.nameZone}>
              <svg
                aria-hidden="true"
                viewBox="0 0 390 300"
                className={styles.nameGuides}
                fill="none"
                strokeLinecap="round"
              >
                <path d="M0 118H390" stroke="#2E8B3E" strokeWidth={1} strokeDasharray="2 4" />
                <path d="M0 142H390" stroke="#2E8B3E" strokeWidth={1} strokeDasharray="2 4" />
                <path d="M0 162H390" stroke="#2E8B3E" strokeWidth={1} strokeDasharray="2 4" />
                <g style={{ filter: "url(#crayon)" }} stroke="#2E8B3E" strokeWidth={2}>
                  <path d="M120 112v56M114 112h12M114 168h12" />
                  {CALLOUT_STEM_PATHS.slice(0, facts.length).map((d, i) => (
                    <path key={i} d={d} />
                  ))}
                </g>
              </svg>

              <h1 className={`${styles.name} ${eraFontClassName[guest.eraBand]}`}>
                {guest.word}
              </h1>

              <div className={styles.objectPlaceholder}>
                [object &middot; {guest.word}]
              </div>

              {facts.map((fact, i) => {
                const pos = placeCallout(i);
                return (
                  <div
                    key={i}
                    className={styles.callout}
                    style={{ left: pos.left, top: pos.top }}
                  >
                    <span
                      className={styles.calloutNumber}
                      style={{ borderRadius: calloutBorderRadius(guest.slug, i) }}
                    >
                      {i + 1}
                    </span>
                    {fact}
                  </div>
                );
              })}
            </div>
          </div>

          <ol className={styles.recordList}>
            {sentences.map((sentence, i) => (
              <li key={i} className={styles.recordItem}>
                <span
                  className={styles.calloutNumber}
                  style={{ borderRadius: calloutBorderRadius(guest.slug, i) }}
                >
                  {i + 1}
                </span>
                <span>{withItalics(sentence)}</span>
              </li>
            ))}
          </ol>

          <ul className={styles.sources}>
            {guest.sources.map((source) => (
              <li key={source.url}>
                <a href={source.url} target="_blank" rel="noopener noreferrer">
                  Source: {source.label} &#8599;
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.voiceColumn}>
          <div className={styles.gossipWrap}>
            <p className={`${styles.gossip} ${styles.pencil}`}>{guest.gossipText}</p>
            <svg
              aria-hidden="true"
              viewBox="0 0 150 44"
              className={styles.gossipSquiggle}
              fill="none"
              stroke="#D23A2A"
              strokeWidth={2.4}
              strokeLinecap="round"
              style={{ filter: "url(#crayon)" }}
            >
              <path d="M14 24 C10 6 90 2 130 10 C152 16 140 42 76 41 C30 40 6 32 16 16" />
            </svg>
          </div>

          <div className={styles.testimonyWrap}>
            <div className={styles.testimonyCard}>
              <p className={`${styles.testimonyText} ${styles.pencil}`}>
                {withItalics(guest.testimony)}
              </p>
            </div>
            <svg
              aria-hidden="true"
              viewBox="0 0 12 34"
              className={styles.pushpin}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <g stroke="#23306E" strokeWidth={1.3} style={{ filter: "url(#wobble)" }}>
                <path d="M1 3.4 C1.2 2 11 2 11.2 3.2 C11.4 5 1 5.4 1 3.4" />
                <path d="M1.2 4 L1.4 5.6 C3 7 9 7 10.8 5.6 L11 4" />
                <path d="M4.8 6.8 L5.6 30.4 L6.2 33 L6.8 30.4 L7.4 6.8" />
                <path d="M5.2 12 l2 -1 M5.3 17 l2 -1 M5.4 22 l2 -1" />
              </g>
            </svg>
            <svg
              aria-hidden="true"
              viewBox="0 0 18 28"
              className={styles.paperclip}
              fill="none"
              stroke="#E8792B"
              strokeWidth={2.6}
              strokeLinecap="round"
              style={{ filter: "url(#crayon)" }}
            >
              <path d="M3 9 C3 2 15 1 15 8 C15 13 9 13 9 19 M9 25 v0.5" />
            </svg>
          </div>

          <div className={styles.relativesScale}>
            <div className={styles.relativesZone}>
              <svg
                aria-hidden="true"
                viewBox="0 0 342 330"
                className={styles.relativesGuides}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <g stroke="#23306E" strokeWidth={1.4} style={{ filter: "url(#wobble)" }}>
                  {relativeCards.map(({ i, pos }) => (
                    <path key={i} d={connectorPath(pos.left, pos.top)} />
                  ))}
                </g>
              </svg>

              <span
                aria-current="page"
                className={`${styles.placeCard} ${styles.currentTag} ${eraFontClassName[guest.eraBand]}`}
              >
                {guest.word}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 56 10"
                  className={styles.currentTagZigzag}
                  fill="none"
                  stroke="#D23A2A"
                  strokeWidth={2.4}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  style={{ filter: "url(#crayon)" }}
                >
                  <path d="M1 7l5-5 5 5 5-5 5 5 5-5 5 5 5-5 5 5 5-5 5 5" />
                </svg>
              </span>

              {relativeCards.map(({ link, i, target, pos, pointer }) => (
                <div
                  key={i}
                  className={styles.relativeGroup}
                  style={{ left: pos.left, top: pos.top, maxWidth: pos.maxWidth }}
                >
                  <Link
                    href={`/word/${target.slug}`}
                    className={`${styles.placeCard} ${eraFontClassName[target.eraBand]}`}
                    style={{ transform: `rotate(${pos.rotate}deg)` }}
                  >
                    {target.word}
                  </Link>
                  <p className={`${styles.relativeCaption} ${styles.pencil}`}>
                    {link.label}
                  </p>
                  {pointer && (
                    <Link href={`/word/${target.slug}`} className={styles.pointerLink}>
                      {pointer.label} &rarr;
                    </Link>
                  )}
                </div>
              ))}

              {orphanPointerLinks.map(({ link, i, target }, idx) => (
                <Link
                  key={i}
                  href={`/word/${target.slug}`}
                  className={styles.pointerLink}
                  style={{ position: "absolute", left: 50, top: 286 + idx * 40 }}
                >
                  {link.label} &rarr;
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <nav className={styles.pillNav}>
        {table && (
          <Link href={`/table/${table.slug}`} className={styles.pillSolid}>
            Back to the table
          </Link>
        )}
        <Link href="/" className={styles.pillOutline}>
          Reunion hall
        </Link>
      </nav>
    </main>
  );
}
