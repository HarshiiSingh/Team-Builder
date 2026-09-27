"use client";
import { zzzCharacters } from "@/games/zzz";
import styles from "./character-catalog.module.css";
import type { Character } from "@/core/character";
import { useState } from "react";
import Image from "next/image";

// TODO: Different Screen Size handling maybe
export function CharacterCatalog() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Character[]>(zzzCharacters);

  // Look into Fuzzy Search for a big improvement later
  const normalizeSearchText = (text: string) => {
    return text.toLowerCase().replace(/[\s-]/g, "");
  };

  // Describes the input-change event so TypeScript knows event.target is an HTML input.
  const handleSearch = (term: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = term.target.value;

    setQuery(searchTerm);
    const normalizedSearchTerm = normalizeSearchText(searchTerm);
    setResults(
      zzzCharacters.filter((characters) => {
        const normalizedCharacterName = normalizeSearchText(characters.name);

        return normalizedCharacterName.includes(
          normalizedSearchTerm.toLowerCase(),
        );
      }),
    );
  };

  return (
    <aside className={styles.sidebar}>
      <h1 className={styles.characterTitle}>Characters</h1>
      <input
        type="search"
        placeholder="Search Characters"
        aria-label="Search Characters"
        className={styles.searchInput}
        value={query}
        onChange={handleSearch}
      />
      <div className={styles.characterCatalog}>
        {results.map((character) => (
          <div key={character.id} className={styles.characterCard}>
            <Image
              alt={character.name}
              src={character.image}
              width={75}
              height={75}
              className={styles.characterImage}
            />
            <p className={styles.characterName}>{character.name}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}
