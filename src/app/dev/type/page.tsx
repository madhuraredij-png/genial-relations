import {
  jacquard24,
  ebGaramond,
  imFellEnglish,
  bodoniModa,
  fraunces,
  inconsolata,
  reenieBeanie,
} from "@/lib/fonts";
import styles from "./page.module.css";

const eraSamples = [
  { font: jacquard24, family: "Jacquard 24", band: "Old English" },
  { font: ebGaramond, family: "EB Garamond", band: "1200–1499" },
  { font: imFellEnglish, family: "IM Fell English", band: "1500–1699" },
  { font: bodoniModa, family: "Bodoni Moda", band: "1800–1899" },
  { font: fraunces, family: "Fraunces", band: "1900 onward" },
];

export default function DevTypePage() {
  return (
    <main className={styles.page}>
      <h1 className={styles.heading}>Type reference</h1>
      <p className={styles.intro}>
        Layer 1 era fonts (picked from a guest&rsquo;s first_use) and the two
        body faces. Internal dev page, not part of the site.
      </p>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Era fonts</h2>
        {eraSamples.map(({ font, family, band }) => (
          <div key={family} className={styles.row}>
            <div className={styles.label}>
              {family} &middot; {band}
            </div>
            <div className={`${styles.sample} ${font.className}`}>
              {family}
            </div>
          </div>
        ))}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Body faces</h2>
        <div className={styles.row}>
          <div className={styles.label}>Inconsolata &middot; body text</div>
          <p className={`${styles.bodySample} ${inconsolata.className}`}>
            The record is fixed; the gossip is generated.
          </p>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>
            Reenie Beanie &middot; pencil hand (gossip, testimony, notes)
          </div>
          <p className={`${styles.pencilSample} ${reenieBeanie.className}`}>
            The record is fixed; the gossip is generated.
          </p>
        </div>
      </section>
    </main>
  );
}
