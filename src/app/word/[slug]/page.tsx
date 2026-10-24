import { notFound } from "next/navigation";
import Link from "next/link";
import { getGuest, getAllGuestSlugs, getTable } from "@/lib/data";
import { eraFontClassName } from "@/lib/fonts";
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

  return (
    <main className={styles.page}>
      <div className={styles.recordColumn}>
        <h1 className={`${styles.word} ${eraFontClassName[guest.eraBand]}`}>
          {guest.word}
        </h1>
        <p className={styles.route}>
          {guest.route} &middot; {guest.firstUse}
        </p>
        <p className={styles.record}>{guest.recordText}</p>
        <ul className={styles.sources}>
          {guest.sources.map((source) => (
            <li key={source.url}>
              <a href={source.url} target="_blank" rel="noopener noreferrer">
                {source.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.voiceColumn}>
        <p className={`${styles.gossip} ${styles.pencil}`}>
          {guest.gossipText}
        </p>
        <p className={styles.testimony}>{guest.testimony}</p>

        {guest.links.length > 0 && (
          <ul className={styles.links}>
            {guest.links.map((link, i) => {
              const target = link.slug ? getGuest(link.slug) : undefined;
              return (
                <li key={i}>
                  {target ? (
                    <Link href={`/word/${target.slug}`}>{target.word}</Link>
                  ) : null}
                  {target ? " — " : ""}
                  {link.label}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <nav className={styles.nav}>
        {table && (
          <Link href={`/table/${table.slug}`}>&larr; {table.name}</Link>
        )}
        <Link href="/">Reunion hall</Link>
      </nav>
    </main>
  );
}
