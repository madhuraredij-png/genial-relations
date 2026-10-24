import { notFound } from "next/navigation";
import Link from "next/link";
import { getTable, getAllTableSlugs, getGuest } from "@/lib/data";
import { eraFontClassName } from "@/lib/fonts";
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

  return (
    <main className={styles.page}>
      <h1 className={styles.name}>{table.name}</h1>
      <p className={styles.route}>
        {table.route} &middot; {table.event}
      </p>
      <p className={`${styles.setup} ${styles.pencil}`}>
        {table.setupLines[0]}
      </p>

      <ul className={styles.guests}>
        {table.guests.map((guestSlug) => {
          const guest = getGuest(guestSlug);
          if (!guest) return null;
          const pointer = table.pointerLines[guestSlug]?.[0];
          return (
            <li key={guestSlug} className={styles.guest}>
              <Link
                href={`/word/${guest.slug}`}
                className={eraFontClassName[guest.eraBand]}
              >
                {guest.word}
              </Link>
              {pointer && (
                <p className={`${styles.pointer} ${styles.pencil}`}>
                  {pointer}
                </p>
              )}
            </li>
          );
        })}
      </ul>

      <nav className={styles.nav}>
        <Link href="/">Reunion hall</Link>
      </nav>
    </main>
  );
}
