import Link from "next/link";
import { getAllTables, getAllGuestSlugs, getGuest } from "@/lib/data";
import { eraFontClassName } from "@/lib/fonts";
import { placeOnOval } from "@/lib/tablePlacement";
import {
  HALL_VIEWBOX,
  HALL_TABLE_SLOTS,
  FLOATER_SLOTS,
  DESKTOP_VIEWBOX,
  HALL_TABLE_SLOTS_DESKTOP,
  FLOATER_SLOTS_DESKTOP,
  nameStyleVariant,
  nameStyleVariantDesktop,
  type HallTableSlot,
  type FloaterSlot,
  type NameStyle,
} from "@/lib/hallPlacement";
import type { Table } from "@/lib/schemas/table";
import type { Guest } from "@/lib/schemas/guest";
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

// Desktop-Main.html has its own hand-drawn arrangement, not a scaled-up
// version of the phone one (same as Desktop-Table.html vs Table.html) --
// see the comment on HALL_TABLE_SLOTS_DESKTOP in hallPlacement.ts. So this
// renders the same table/floater content twice, once per breakpoint's own
// slot data, and page.module.css shows only one at a time via media query
// -- cheaper and more honest than a CSS transform trying to fake a
// different layout out of the same numbers.
function HallMap({
  tables,
  floaters,
  viewBoxWidth,
  viewBoxHeight,
  tableSlots,
  floaterSlots,
  getNameStyle,
}: {
  tables: Table[];
  floaters: Guest[];
  viewBoxWidth: number;
  viewBoxHeight: number;
  tableSlots: HallTableSlot[];
  floaterSlots: FloaterSlot[];
  getNameStyle: (guestSlug: string) => NameStyle;
}) {
  return (
    <>
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        className={styles.hallGuides}
        fill="none"
      >
        <g stroke="#23306E" strokeWidth={1.6} style={{ filter: "url(#wobble)" }}>
          {tableSlots.map((slot) => (
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

      {tableSlots.map((slot) => {
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
              const variant = getNameStyle(guest.slug);
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
        const slot = floaterSlots.find((f) => f.slug === guest.slug);
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
    </>
  );
}

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
          <HallMap
            tables={tables}
            floaters={floaters}
            viewBoxWidth={HALL_VIEWBOX.width}
            viewBoxHeight={HALL_VIEWBOX.height}
            tableSlots={HALL_TABLE_SLOTS}
            floaterSlots={FLOATER_SLOTS}
            getNameStyle={nameStyleVariant}
          />
        </div>
      </div>

      <div className={styles.hallZoneDesktop}>
        <HallMap
          tables={tables}
          floaters={floaters}
          viewBoxWidth={DESKTOP_VIEWBOX.width}
          viewBoxHeight={DESKTOP_VIEWBOX.height}
          tableSlots={HALL_TABLE_SLOTS_DESKTOP}
          floaterSlots={FLOATER_SLOTS_DESKTOP}
          getNameStyle={nameStyleVariantDesktop}
        />
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
