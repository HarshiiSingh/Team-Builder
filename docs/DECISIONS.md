# Architecture Decisions

This document records important architectural decisions made throughout the
development of Character Team Builder.

The purpose of this file is to document **why** certain decisions were made so
they do not need to be rediscovered later.

Each decision includes:

- Context
- Decision
- Reasoning
- Consequences

This document should grow over time as the project evolves.

---

# ADR-001 — Desktop-First Development

**Status**

Accepted

## Context

The application is an interactive graph editor that relies heavily on dragging,
panning, zooming, selecting, and connecting nodes.

These interactions are significantly easier to implement and use with a mouse
and keyboard than on touch devices.

Supporting desktop and mobile simultaneously would introduce additional design
complexity without improving the learning objectives of this project.

## Decision

The MVP targets desktop browsers only.

Mobile editing is explicitly out of scope.

## Consequences

### Benefits

- Faster development
- Simpler interaction model
- Cleaner UI
- Less testing
- Better user experience for graph editing

### Tradeoffs

- Mobile users cannot edit boards during the MVP.
- Responsive layouts are not a priority initially.

---

# ADR-002 — One Game Per Board

**Status**

Accepted

## Context

Supporting multiple games within a single board would complicate filtering,
searching, persistence, and future features.

There is currently no strong use case for mixing characters from different
games.

## Decision

Each board belongs to exactly one game.

```text
Board
└── gameId
```

The user chooses a game before editing begins.

## Consequences

### Benefits

- Simpler data model
- Simpler persistence
- Simpler search
- Easier future maintenance

### Tradeoffs

Cross-game boards are not supported.

If demand exists later, this decision can be revisited.

---

# ADR-003 — Separate Characters from Board Nodes

**Status**

Accepted

## Context

Characters represent catalog data.

Board nodes represent placed instances.

Treating them as the same object would make future features difficult, such as
placing multiple copies of the same character.

## Decision

Character and BoardNode are separate models.

```text
Character
    ↓
BoardNode
```

BoardNodes reference Characters using `characterId`.

## Consequences

### Benefits

- Cleaner architecture
- Multiple instances supported
- Catalog remains independent of board state

### Tradeoffs

An additional lookup is required when rendering nodes.

---

# ADR-004 — Normalize External Data Sources

**Status**

Accepted

## Context

The application retrieves character information from game-specific raw data
sources.

Those sources may change structure over time, whether they are local curated
files, scripts, or future providers.

Using raw source data throughout the project would tightly couple the
application to one format.

## Decision

Every game-specific data source is normalized by an adapter or provider
boundary.

```text
API
 ↓
Adapter
 ↓
Application Models
```

The UI never consumes raw source data directly.

## Consequences

### Benefits

- Easier maintenance
- Easier testing
- Easier support for additional games
- Reduced impact from source-format changes

### Tradeoffs

Requires an additional translation layer.

---

# ADR-005 — React Flow as an Interaction Engine

**Status**

Accepted

## Context

React Flow provides excellent interaction primitives for graph editing.

However, its internal node and edge models should not become the application's
business model.

## Decision

React Flow is responsible only for rendering and interaction.

The application's domain models remain independent.

Conversion occurs at the boundary between the editor and the rendering library.

## Consequences

### Benefits

- Rendering library can be replaced later
- Persistence format stays stable
- Cleaner architecture

### Tradeoffs

Requires conversion between models.

---

# ADR-006 — Add Dependencies Only When Needed

**Status**

Accepted

## Context

Modern frontend projects often install many libraries before they are required.

Unused dependencies increase maintenance costs and make the project more
difficult to understand.

## Decision

Dependencies are added only when they solve an immediate problem.

Examples:

- React Flow when graph editing begins.
- Zustand when shared state becomes difficult to manage.
- Zod when runtime validation becomes necessary.

## Consequences

### Benefits

- Smaller dependency tree
- Simpler project setup
- Fewer unnecessary updates

### Tradeoffs

Dependencies are introduced gradually rather than all at once.

---

# ADR-007 — Local Data Before New Providers

**Status**

Accepted

## Context

Building UI while depending on a changing external provider slows development
and introduces unnecessary failure points.

Most editor functionality can be developed without real data.

## Decision

The application will first use local curated character data.

That local data pipeline will remain the primary approach unless a later
decision introduces a new provider.

## Consequences

### Benefits

- Faster iteration
- Easier debugging
- UI development is independent from network availability

### Tradeoffs

The application still requires a clean adapter/provider boundary so local data
can be swapped or extended later without changing the UI.

---

# ADR-008 — Local Persistence First

**Status**

Accepted

## Context

Cloud synchronization requires authentication, backend infrastructure, and
conflict resolution.

These are outside the scope of the MVP.

## Decision

Boards are stored locally within the browser.

Cloud storage may be explored in a future version.

## Consequences

### Benefits

- Zero backend
- Simpler implementation
- Offline support

### Tradeoffs

Boards are tied to the current browser unless exported.

---

# ADR-009 — Incremental Development

**Status**

Accepted

## Context

Attempting to build every feature simultaneously increases complexity and makes
debugging more difficult.

## Decision

The project is developed in small milestones.

Each milestone should leave the application in a working state.

Features should be completed before moving to the next milestone whenever
possible.

## Consequences

### Benefits

- Easier debugging
- Easier code reviews
- Better learning experience
- Lower risk of regressions

### Tradeoffs

Some temporary implementations may be replaced later as the project grows.

---

# Implementation Notes — 2026-09-27

The current prototype implements ADR-003 and ADR-005 with local React
`BoardNode[]` state and derived React Flow nodes. The page supplies normalized
characters through editor props; the custom portrait node only renders data.

Catalog placement uses native HTML drag and drop for the desktop-first scope.
The payload contains a character ID, which the editor validates before creating
a distinct placement at converted board coordinates. No additional drag-and-drop
dependency was needed for this implementation.

ADR-002's game selection and ADR-008's local persistence describe intended
behavior: the prototype currently opens ZZZ directly and does not save boards.

# Future Decisions

Future architectural decisions should be added whenever a significant design
choice is made.

Examples include:

- Supporting multiple boards
- Cloud synchronization
- Relationship labels
- Multiple game providers
- Plugin architecture
- Performance optimizations
- Undo/redo implementation
- State management changes
- New persistence formats
