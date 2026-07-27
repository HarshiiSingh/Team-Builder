import type { Character } from "../core/character.ts";
import ZZZList from "./zzz/data/characters.json";
export interface ZZZCharacterRecord {
    id: string;
    gameId: "zzz";
    name: string;
    images:{
        circle: string;
        full: string;
        interknot: string;
        select: string;
        trap: string;
    };
}

const rawCharacters = ZZZList as ZZZCharacterRecord[];

export const zzzCharacters: Character[] = rawCharacters.map((zCharacter) => {
    return {
        id: zCharacter.id,
        gameId: zCharacter.gameId,
        name: zCharacter.name,
        image: zCharacter.images.circle,
    }
})
