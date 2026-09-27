import { CharacterCatalog } from "@/features/character-catalog";
import styles from "./page.module.css";
export default function HomePage() {
  return (
    <main className={styles.appShell}>
      <CharacterCatalog />
      <section className={styles.board}>
        <h2>Team Board</h2>
      </section>
    </main>
  );
}
