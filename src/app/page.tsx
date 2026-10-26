import Link from "next/link";
import { getAllTables, getAllGuestSlugs, getGuest } from "@/lib/data";
import { eraFontClassName } from "@/lib/fonts";
import { placeOnOval } from "@/lib/tablePlacement";
import {
  HALL_VIEWBOX,
  HALL_TABLE_SLOTS,
  FLOATER_SLOTS,
  nameStyleVariant,
} from "@/lib/hallPlacement";
import { SvgFilterDefs, CrumpleOverlay } from "@/components/SvgFilterDefs";
import styles from "./page.module.css";

// Short pill labels for the bottom nav, copied from docs/mockups/Main.html
// -- head-table's pill reads "kindred" (its host) rather than the table's
// own name, matching CLAUDE.md ("The head-table host is Kindred").
const TABLE_NAV_LABELS: Record<string, string> = {
  "head-table": "kindred",
  "old-money": "Old money",
  academics: "Academics",
  "back-with-an-accent": "Accent",
  "kids-table": "Kids",
};

export default function Home() {
  const tables = getAllTables();
  const floaters = getAllGuestSlugs()
    .map((slug) => getGuest(slug))
    .filter((g): g is NonNullable<typeof g> => !!g && g.role === "floater");

  return (
    <main className={styles.page}>
      <SvgFilterDefs />
      <CrumpleOverlay opacity={0.28} />

      <div className={styles.header}>
        <span className={styles.siteTitle}>Genial Relations</span>
        {/* No /portrait page exists yet, so this isn't a link -- see
            session report. */}
        <span className={styles.portraitTag}>[portrait &middot; *gene-]</span>
      </div>

      <div className={styles.hallZoneScale}>
        <div className={styles.hallZone}>
          <svg
            aria-hidden="true"
            viewBox={`0 0 ${HALL_VIEWBOX.width} ${HALL_VIEWBOX.height}`}
            className={styles.hallGuides}
            fill="none"
          >
            <g stroke="#23306E" strokeWidth={1.6} style={{ filter: "url(#wobble)" }}>
              {HALL_TABLE_SLOTS.map((slot) => (
                <ellipse
                  key={slot.slug}
                  cx={slot.center.x}
                  cy={slot.center.y}
                  rx={slot.radius.x}
                  ry={slot.radius.y}
                />
              ))}
            </g>
          </svg>

          {HALL_TABLE_SLOTS.map((slot) => {
            const table = tables.find((t) => t.slug === slot.slug);
            if (!table) return null;
            return (
              <div key={slot.slug}>
                <Link
                  href={`/table/${slot.slug}`}
                  className={`${styles.tableName} ${styles.pencil}`}
                  style={{ left: slot.center.x, top: slot.center.y }}
                >
                  {table.name}
                </Link>
                {table.guests.map((guestSlug, i) => {
                  const guest = getGuest(guestSlug);
                  if (!guest) return null;
                  const pos = placeOnOval(
                    table.slug,
                    i,
                    table.guests.length,
                    slot.center,
                    slot.radius
                  );
                  const variant = nameStyleVariant(guest.slug);
                  return (
                    <Link
                      key={guest.slug}
                      href={`/word/${guest.slug}`}
                      className={`${styles.guestCard} ${eraFontClassName[guest.eraBand]}`}
                      style={{
                        left: pos.left,
                        top: pos.top,
                        transform: `translate(-50%, -50%) rotate(${pos.rotate}deg)`,
                        fontSize: variant.fontSize,
                        fontWeight: variant.fontWeight,
                        fontStyle: variant.fontStyle,
                        textTransform: variant.textTransform,
                        letterSpacing: variant.letterSpacing,
                      }}
                    >
                      {guest.word}
                    </Link>
                  );
                })}
              </div>
            );
          })}

          {floaters.map((guest) => {
            const slot = FLOATER_SLOTS.find((f) => f.slug === guest.slug);
            if (!slot) return null;
            return (
              <Link
                key={guest.slug}
                href={`/word/${guest.slug}`}
                className={styles.floaterCard}
                style={{ left: slot.left, top: slot.top }}
              >
                {guest.word}
              </Link>
            );
          })}
        </div>
      </div>

      <nav className={styles.tableNav}>
        {tables.map((table) => (
          <Link
            key={table.slug}
            href={`/table/${table.slug}`}
            className={styles.navPill}
          >
            {TABLE_NAV_LABELS[table.slug] ?? table.name}
          </Link>
        ))}
      </nav>
    </main>
  );
}
