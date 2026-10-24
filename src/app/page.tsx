import Link from "next/link";
import { getAllTables, getAllGuestSlugs, getGuest } from "@/lib/data";
import styles from "./page.module.css";

export default function Home() {
  const tables = getAllTables();
  const floaters = getAllGuestSlugs()
    .map((slug) => getGuest(slug))
    .filter((guest) => guest?.role === "floater");

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Genial Relations</h1>

      {tables.map((table) => (
        <section key={table.slug} className={styles.table}>
          <h2 className={`${styles.tableName} ${styles.pencil}`}>
            <Link href={`/table/${table.slug}`}>{table.name}</Link>
          </h2>
          <ul className={styles.objects}>
            {table.guests.map((guestSlug) => {
              const guest = getGuest(guestSlug);
              if (!guest) return null;
              return (
                <li key={guest.slug}>
                  <Link
                    href={`/word/${guest.slug}`}
                    className={styles.placeholder}
                  >
                    [{guest.object} &middot; {guest.word}]
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ))}

      <section className={styles.table}>
        <h2 className={`${styles.tableName} ${styles.pencil}`}>Floaters</h2>
        <ul className={styles.objects}>
          {floaters.map((guest) => (
            <li key={guest!.slug}>
              <Link
                href={`/word/${guest!.slug}`}
                className={styles.placeholder}
              >
                [{guest!.object} &middot; {guest!.word}]
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
