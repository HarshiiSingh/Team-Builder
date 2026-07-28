# Architecture

## Overview

Character Team Builder is a desktop-first web application built around a
game-independent graph editor.

The application separates three major responsibilities:

1. Game data
2. Graph editing
3. User interface

This separation allows the editor to support multiple games without requiring
changes to the core graph system.

The architecture prioritizes:

- Simplicity
- Maintainability
- Clear separation of concerns
- Incremental development
- Easy future expansion

The project intentionally favors understandable code over clever abstractions.

---

# Architectural Principles

## Separation of Responsibilities

Every major part of the application should have one primary responsibility.

Examples:

- Game providers fetch character data.
- The graph editor manages relationships.
- React components render the UI.
- Persistence saves and loads boards.

Avoid mixing these responsibilities together.

---

## Game Independence

The editor should never contain logic specific to a single game.

Instead, every supported game supplies character data through a common interface.

The editor should not care whether the current game is:

- Zenless Zone Zero
- Path to Nowhere
- Wuthering Waves
- Another future game

If adding a new game requires changing editor logic, the architecture should be
reconsidered.

---

## Domain Before UI

The application's data model represents the source of truth.

The UI should render the domain model rather than becoming the domain model.

React Flow, React components, and other UI libraries are implementation details.

The board exists independently of how it is rendered.

---

## External Data Sources Are Never Trusted

Third-party APIs may change.

Their response formats should never be used directly throughout the application.

Instead:

External API

↓

Adapter

↓

Normalized Application Models

↓

UI

This keeps the application isolated from API changes.

---

## Small Independent Modules

Each module should solve one problem.

Prefer many small files over one large file containing unrelated logic.

---

# High-Level Architecture

```
                +----------------------+
                | Local Game Data       |
                +----------+-----------+
                           |
                           v
                +----------------------+
                | Game Provider         |
                +----------+-----------+
                           |
                           v
                +----------------------+
                | Game Adapter          |
                +----------+-----------+
                           |
                           v
                +----------------------+
                | Character Catalog     |
                +----------+-----------+
                           |
                           v
                +----------------------+
                |   Board Editor        |
                +----------+-----------+
                           |
                           v
                +----------------------+
                | Persistence           |
                +----------------------+
```

The editor depends on normalized character data rather than any specific raw
game data format.

---

# Project Structure

```
src/

  app/
    Next.js routes and application entry points.

  components/
    Reusable UI components shared across features.

  core/
    Framework-independent business logic.

    board/
      Board models.

    graph/
      Graph operations.

    persistence/
      Saving and loading boards.

  features/

    board-editor/
      Interactive editing experience.

    character-catalog/
      Sidebar, searching, filtering.

  games/

    registry.ts

    zzz/
      ZZZ-specific data and adapters.

  hooks/
    Shared React hooks.

  stores/
    Global application state.

  styles/
    Global styling.

  types/
    Shared TypeScript types.

  utils/
    Generic utility functions.
```

Folders should represent responsibilities rather than technologies.

---

# Domain Models

## Character

Represents a playable character from a game.

A Character belongs to the game catalog.

Characters never store board position.
Characters are shared application data, not board state.

Recommended location:

`src/core/characters.ts`

Example:

```ts
interface Character {
  id: string;
  gameId: string;
  name: string;
  image: string;
}
```

---

## BoardNode

Represents a placed instance of a character.

Multiple BoardNodes may reference the same Character.

```ts
interface BoardNode {
  id: string;
  characterId: string;
  position: {
    x: number;
    y: number;
  };
}
```

This separation prevents catalog data from becoming mixed with board state.

Multiple BoardNodes may reference the same `characterId`.
This is how duplicate placements of one character are supported without
duplicating the Character itself.

---

## BoardEdge

Represents a relationship between two nodes.

```ts
interface BoardEdge {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
}
```

Edges always connect nodes.

Never connect characters directly.

---

## Board

The Board represents an entire workspace.

```ts
interface Board {
  schemaVersion: number;
  gameId: string;
  nodes: BoardNode[];
  edges: BoardEdge[];
}
```

Only one game is supported per board.

Recommended location:

`src/core/board.ts`

This file should contain board-state models such as:

- `BoardNode`
- `BoardEdge`
- `Board`

It should not contain catalog models such as `Character`.

---

# Identity Rules

The application contains four important identifiers.

## gameId

Identifies a supported game.

Example:

```
zzz
```

---

## characterId

Identifies a character within a game.

Example:

```
ellen
```

---

## nodeId

Identifies a placed instance of a character.

Multiple node IDs may reference the same character.

---

## edgeId

Identifies a relationship.

Each edge has its own unique ID.

---

These identifiers should never be used interchangeably.

---

# Game Providers

Every supported game provides the same functionality.

Example:

```ts
interface GameProvider {
    getCharacters(): Promise<Character[]>;
}
```

The editor communicates with providers rather than individual APIs.

A provider or adapter is responsible for converting game-specific records into
shared `Character` models before the rest of the application consumes them.

---

# Game Data Integration

Game-specific data sources should remain isolated.

Recommended structure:

```
games/

    zzz/

        data/

        zzz-provider.ts

        zzz-adapter.ts
```

Responsibilities:

`data/`

- Stores local curated raw data for a specific game.

`zzz-provider.ts`

- Loads the raw ZZZ data source.

`zzz-adapter.ts`

- Normalizes raw ZZZ data into shared application models.

The rest of the application should never know or care about the raw source
format for a game.

---

# State Management

Initially, React state is sufficient.

Introduce Zustand only when state begins to span multiple independent features.

Avoid introducing global state prematurely.

---

# React Flow

React Flow is responsible for rendering and interaction.

It is not responsible for application logic.

Convert between React Flow models and application models when necessary.

Never save React Flow objects directly.

---

# Persistence

Boards should be saved independently from the rendering library.

Recommended format:

```ts
interface Board {
    schemaVersion: number;
    gameId: string;
    nodes: BoardNode[];
    edges: BoardEdge[];
}
```

Future schema changes can be handled using migrations.

---

# Error Handling

Expected failures should be handled gracefully.

Examples:

- API unavailable
- Invalid import file
- Missing images

The editor should remain usable whenever possible.

---

# Performance Philosophy

Do not optimize prematurely.

Build readable code first.

Optimize only after identifying real bottlenecks.

---

# Testing Philosophy

Focus testing on application behavior rather than implementation details.

Examples:

- Graph operations
- Import/export
- Persistence
- Board editing
- Character loading

UI snapshots should not become the primary testing strategy.

---

# Future Expansion

The architecture should support:

- Additional games
- More character metadata
- Relationship labels
- Notes
- Categories
- Better filtering
- Cloud saves
- Multiple boards

These features should be additive rather than requiring large-scale
architectural changes.

---

# Architecture Guidelines

When contributing to the project:

- Keep modules focused.
- Prefer composition over inheritance.
- Keep game-specific code inside `src/games`.
- Keep business logic outside React components.
- Avoid unnecessary abstractions.
- Add dependencies only when they solve a real problem.
- Prefer explicit code over clever code.
- Maintain clear folder boundaries.

Whenever unsure, prioritize readability and maintainability over writing the
most sophisticated solution.
