import { CharacterCatalog } from "@/features/character-catalog";
import BoardEditor from "@/features/board-editor";
import { zzzCharacters } from "@/games/zzz";
import styles from "./page.module.css";
export default function HomePage() {
  return (
    <main className={styles.appShell}>
      <CharacterCatalog />
      <section className={styles.board}>
        <h2>Team Board</h2>
        <BoardEditor characters={zzzCharacters} />
      </section>
    </main>
  );
}
