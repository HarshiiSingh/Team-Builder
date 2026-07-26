import {
  access,
  copyFile,
  mkdir,
  readdir,
  writeFile,
} from "node:fs/promises";
import path from "node:path";

const IMAGE_TYPES = [
  "circle",
  "full",
  "interknot",
  "select",
  "trap",
] as const;

type ImageType = (typeof IMAGE_TYPES)[number];

type CharacterImages = Partial<Record<ImageType, string>>;

type CharacterRecord = {
  id: string;
  gameId: "zzz";
  name: string;
  images: CharacterImages;
};

const PROJECT_ROOT = process.cwd();

const OPTIMIZER_CHARACTER_DIR = path.resolve(
  PROJECT_ROOT,
  "../../genshin-optimizer/libs/zzz/assets/src/gen/chars",
);

const OUTPUT_IMAGE_DIR = path.resolve(
  PROJECT_ROOT,
  "public/characters/zzz",
);

const OUTPUT_DATA_FILE = path.resolve(
  PROJECT_ROOT,
  "src/games/zzz/data/characters.json",
);

const CHARACTER_NAME_OVERRIDES: Record<string, string> = {
  JuFufu: "Ju Fufu",
  OrphieMagus: "Orphie & Magus",
  Soldier0Anby: "Soldier 0 - Anby",
  YeShunguang: "Ye Shunguang",
  ZhuYuan: "Zhu Yuan",
};

const EXCLUDED_CHARACTERS = new Set<string>([
  // Add character folder names here if you want to skip them.
  // Example:
  // "UnreleasedCharacter",
]);

function createSlug(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function formatCharacterName(folderName: string): string {
  return (
    CHARACTER_NAME_OVERRIDES[folderName] ??
    folderName
      .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
      .trim()
  );
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function copyCharacterImages(
  folderName: string,
  characterId: string,
): Promise<CharacterImages> {
  const images: CharacterImages = {};

  const characterOutputDirectory = path.join(
    OUTPUT_IMAGE_DIR,
    characterId,
  );

  await mkdir(characterOutputDirectory, {
    recursive: true,
  });

  for (const imageType of IMAGE_TYPES) {
    const sourceImagePath = path.join(
      OPTIMIZER_CHARACTER_DIR,
      folderName,
      `${imageType}.png`,
    );

    const outputImagePath = path.join(
      characterOutputDirectory,
      `${imageType}.png`,
    );

    const exists = await fileExists(sourceImagePath);

    if (!exists) {
      console.warn(
        `Missing ${folderName}/${imageType}.png`,
      );

      continue;
    }

    await copyFile(sourceImagePath, outputImagePath);

    images[imageType] =
      `/characters/zzz/${characterId}/${imageType}.png`;

    console.log(
      `Copied ${folderName}/${imageType}.png`,
    );
  }

  return images;
}

async function createCharacterRecord(
  folderName: string,
): Promise<CharacterRecord | null> {
  const id = createSlug(folderName);

  const images = await copyCharacterImages(
    folderName,
    id,
  );

  if (!images.circle) {
    console.warn(
      `Skipped ${folderName}: circle.png was not found`,
    );

    return null;
  }

  return {
    id,
    gameId: "zzz",
    name: formatCharacterName(folderName),
    images,
  };
}

async function getCharacterFolders(): Promise<string[]> {
  const entries = await readdir(
    OPTIMIZER_CHARACTER_DIR,
    {
      withFileTypes: true,
    },
  );

  return entries
    .filter(
      (entry) =>
        entry.isDirectory() &&
        !EXCLUDED_CHARACTERS.has(entry.name),
    )
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
}

async function writeCharacterDatabase(
  characters: CharacterRecord[],
): Promise<void> {
  await mkdir(path.dirname(OUTPUT_DATA_FILE), {
    recursive: true,
  });

  await writeFile(
    OUTPUT_DATA_FILE,
    `${JSON.stringify(characters, null, 2)}\n`,
    "utf8",
  );
}

async function syncCharacters(): Promise<void> {
  console.log("Project root:");
  console.log(PROJECT_ROOT);

  console.log("\nOptimizer character directory:");
  console.log(OPTIMIZER_CHARACTER_DIR);

  console.log("\nStarting ZZZ character sync...\n");

  await mkdir(OUTPUT_IMAGE_DIR, {
    recursive: true,
  });

  const characterFolders =
    await getCharacterFolders();

  const characters: CharacterRecord[] = [];

  for (const folderName of characterFolders) {
    const character =
      await createCharacterRecord(folderName);

    if (character) {
      characters.push(character);
    }
  }

  await writeCharacterDatabase(characters);

  console.log("");
  console.log(
    `Generated ${characters.length} character records.`,
  );
  console.log(`Data file: ${OUTPUT_DATA_FILE}`);
  console.log(`Images: ${OUTPUT_IMAGE_DIR}`);
}

syncCharacters().catch((error: unknown) => {
  console.error(
    "Failed to synchronize ZZZ characters.",
  );

  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error(error);
  }

  process.exitCode = 1;
});