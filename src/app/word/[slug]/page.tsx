import { notFound } from "next/navigation";
import Link from "next/link";
import { getGuest, getAllGuestSlugs, getTable } from "@/lib/data";
import { eraFontClassName } from "@/lib/fonts";
import { withItalics, splitSentences } from "@/lib/text";
import {
  placeRelative,
  placeCallout,
  calloutBorderRadius,
  connectorPath,
  CALLOUT_STEM_PATHS,
  NAME_BRACKET_PATH,
  GOSSIP_SQUIGGLE_PATH,
  PUSHPIN_PATHS,
  PAPERCLIP_PATH,
  CURRENT_TAG_ZIGZAG_PATH,
  RELATIVE_SLOT_COUNT,
  relativeFallbackTop,
  relativesZoneHeight,
} from "@/lib/placement";
import type { Link as GuestLink } from "@/lib/schemas/shared";
import type { Guest } from "@/lib/schemas/guest";
import { SvgFilterDefs, CrumpleOverlay } from "@/components/SvgFilterDefs";
import styles from "./page.module.css";

export function generateStaticParams() {
  return getAllGuestSlugs().map((slug) => ({ slug }));
}

export default async function WordPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guest = getGuest(slug);
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
  // its own group, stacked directly under the caption. Only the first
  // RELATIVE_SLOT_COUNT get a card at all — placeRelative only has that many
  // well-spaced slots (see placement.ts), so a guest with more relative
  // links than that (kriss-kringle: 4) would otherwise collide. The rest
  // fall back to a plain pointer-style link below, same treatment as
  // orphanPointerLinks.
  const relativeLinkEntries = guest.links
    .map((link, i) => ({ link, i, target: link.slug ? getGuest(link.slug) : undefined }))
    .filter(
      (entry): entry is { link: GuestLink; i: number; target: Guest } =>
        entry.link.type !== "across-the-room" && !!entry.target
    );

  const relativeCards = relativeLinkEntries.slice(0, RELATIVE_SLOT_COUNT).map((entry, slot) => ({
    ...entry,
    pos: placeRelative(guest.slug, slot),
    pointer: acrossTheRoomByTarget.get(entry.target.slug),
  }));

  const overflowRelativeLinks = relativeLinkEntries.slice(RELATIVE_SLOT_COUNT);

  // across-the-room links whose target has no place card of its own (either
  // none exists in the data, or it was bumped to overflow above) fall back to
  // a standalone spot instead of being silently dropped.
  const relativeCardTargetSlugs = new Set(relativeCards.map((card) => card.target.slug));
  const orphanPointerLinks = guest.links
    .map((link, i) => ({ link, i, target: link.slug ? getGuest(link.slug) : undefined }))
    .filter(
      (entry): entry is { link: GuestLink; i: number; target: Guest } =>
        entry.link.type === "across-the-room" &&
        !!entry.target &&
        !relativeCardTargetSlugs.has(entry.target.slug)
    );

  // Combined fallback list: both kinds render as the same plain pointer
  // link, just stacked below the relatives zone's main content.
  const fallbackLinks = [...overflowRelativeLinks, ...orphanPointerLinks];
  const fallbackTop = relativeFallbackTop(relativeCards.length);
  const zoneHeight = relativesZoneHeight(relativeCards.length, fallbackLinks.length);

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
                  <path d={NAME_BRACKET_PATH} />
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
                    style={{ left: pos.left, top: pos.top, maxWidth: pos.maxWidth }}
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
              <path d={GOSSIP_SQUIGGLE_PATH} />
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
                {PUSHPIN_PATHS.map((d, i) => (
                  <path key={i} d={d} />
                ))}
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
              <path d={PAPERCLIP_PATH} />
            </svg>
          </div>

          <div
            className={styles.relativesScale}
            style={{ "--zone-height": `${zoneHeight}px` } as React.CSSProperties}
          >
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
                  <path d={CURRENT_TAG_ZIGZAG_PATH} />
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

              {fallbackLinks.map(({ link, i, target }, idx) => (
                <Link
                  key={i}
                  href={`/word/${target.slug}`}
                  className={styles.pointerLink}
                  style={{ position: "absolute", left: 50, top: fallbackTop + idx * 40 }}
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
