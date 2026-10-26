import { notFound } from "next/navigation";
import Link from "next/link";
import { getTable, getAllTableSlugs, getGuest, getFloatersAt } from "@/lib/data";
import { eraFontClassName } from "@/lib/fonts";
import {
  TABLE_OUTLINE_PATH,
  TABLE_NEAR_EDGE_PATH,
  TABLE_HIGHLIGHT_PATH,
  TABLE_VIEWBOX,
  tableTilt,
  placeAroundTable,
} from "@/lib/tablePlacement";
import { SvgFilterDefs, CrumpleOverlay } from "@/components/SvgFilterDefs";
import styles from "./page.module.css";

export function generateStaticParams() {
  return getAllTableSlugs().map((slug) => ({ slug }));
}

export default async function TablePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const table = getTable(slug);
  if (!table) notFound();

  const seatedGuests = table.guests
    .map((guestSlug) => getGuest(guestSlug))
    .filter((g): g is NonNullable<typeof g> => !!g);

  const floaters = getFloatersAt(table.slug);
  const tilt = tableTilt(table.slug);
  const centerX = TABLE_VIEWBOX.width / 2;
  const centerY = TABLE_VIEWBOX.height / 2;

  return (
    <main className={styles.page}>
      <SvgFilterDefs />
      <CrumpleOverlay opacity={0.28} />

      <nav className={styles.topNav}>
        <Link href="/">&larr; Reunion hall</Link>
      </nav>

      <header className={styles.header}>
        <h1 className={`${styles.name} ${styles.pencil}`}>{table.name}</h1>
        <p className={styles.route}>
          {table.route} &middot; {table.event}
        </p>
      </header>

      <div className={styles.tableZoneScale}>
        <div className={styles.tableZone}>
          <svg
            aria-hidden="true"
            viewBox={`0 0 ${TABLE_VIEWBOX.width} ${TABLE_VIEWBOX.height}`}
            className={styles.tableGuides}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <g
              stroke="#23306E"
              style={{ filter: "url(#wobble)" }}
              transform={`rotate(${tilt} ${centerX} ${centerY})`}
            >
              <path d={TABLE_OUTLINE_PATH} strokeWidth={2} />
              <path d={TABLE_NEAR_EDGE_PATH} strokeWidth={1.5} />
              <path d={TABLE_HIGHLIGHT_PATH} strokeWidth={1} opacity={0.55} />
            </g>
          </svg>

          <div className={styles.gossipBlock}>
            <p className={`${styles.gossip} ${styles.pencil}`}>
              {table.setupLines[0]}
            </p>
            {floaters[0] && (
              <p className={`${styles.cameo} ${styles.pencil}`}>
                {floaters[0].cameoLines?.[0]}
              </p>
            )}
          </div>

          {seatedGuests.map((guest, i) => {
            const pos = placeAroundTable(table.slug, i, seatedGuests.length);
            return (
              <div
                key={guest.slug}
                className={styles.cardGroup}
                style={{ left: pos.left, top: pos.top }}
              >
                <Link
                  href={`/word/${guest.slug}`}
                  className={`${styles.placeCard} ${eraFontClassName[guest.eraBand]}`}
                  style={{ transform: `rotate(${pos.rotate}deg)` }}
                >
                  {guest.word}
                </Link>
                <span className={styles.objectTag}>
                  [object &middot; {guest.word}]
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <nav className={styles.pillNav}>
        <Link href="/" className={styles.pillOutline}>
          Reunion hall
        </Link>
      </nav>
    </main>
  );
}
