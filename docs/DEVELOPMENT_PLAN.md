# Development Plan

## Overview

This document outlines the planned development order for Character Team Builder.

The project is intentionally developed in small, incremental milestones. Each
milestone should leave the application in a working state before moving on to
the next.

The goal is not to build every feature as quickly as possible, but to build a
solid foundation that can be expanded over time.

---

# Guiding Principles

Development should follow these principles:

- Build one feature at a time.
- Keep the application functional after every milestone.
- Prefer simple solutions over premature abstractions.
- Refactor only when it improves clarity or maintainability.
- Do not add dependencies until they solve a real problem.
- Complete one milestone before starting another whenever possible.

---

# Current Status

**Project Phase**

Repository Setup

**Current Milestone**

Milestone 1 — Project Foundation

---

# Milestone 1 — Project Foundation

## Goal

Create the initial project structure and development environment.

## Tasks

- Initialize Next.js project.
- Configure TypeScript.
- Configure ESLint and Prettier.
- Configure Git.
- Create initial folder structure.
- Add AGENTS.md.
- Add documentation.
- Create OpenSpec structure.

## Completion Criteria

- Project builds successfully.
- Repository structure is complete.
- Documentation exists.
- Initial commit created.

---

# Milestone 2 — Application Shell

## Goal

Create the basic application layout.

## Tasks

- Sidebar layout
- Main board area
- Header (if needed)
- Global styling
- Responsive desktop layout

## Completion Criteria

- Application displays a sidebar and an empty editor.
- Layout scales correctly on desktop resolutions.

---

# Milestone 3 — Mock Character Catalog

## Goal

Display characters without relying on external APIs.

## Tasks

- Create mock character data.
- Render character list.
- Display portraits.
- Display names.
- Implement scrolling.

## Completion Criteria

- Catalog renders correctly.
- Characters load from local mock data.

---

# Milestone 4 — Search

## Goal

Allow users to quickly locate characters.

## Tasks

- Search input
- Live filtering
- Case-insensitive search
- Empty-state messaging

## Completion Criteria

- Searching updates the catalog immediately.

---

# Milestone 5 — Board Prototype

## Goal

Introduce the graph editor.

## Tasks

- Install React Flow.
- Render an empty board.
- Enable panning.
- Enable zooming.
- Display background grid.

## Completion Criteria

- Users can navigate the board.

---

# Milestone 6 — Character Placement

## Goal

Allow characters to be placed on the board.

## Tasks

- Drag from catalog.
- Create board node.
- Display portrait node.
- Display character name.
- Position nodes.

## Completion Criteria

- Characters can be added to the board.

---

# Milestone 7 — Node Editing

## Goal

Allow users to organize the board.

## Tasks

- Move nodes.
- Select nodes.
- Delete nodes.
- Multi-selection (optional).

## Completion Criteria

- Users can freely arrange characters.

---

# Milestone 8 — Relationships

## Goal

Connect characters visually.

## Tasks

- Connection gesture.
- Create edges.
- Prevent self-connections.
- Prevent duplicate connections.
- Delete edges.

## Completion Criteria

- Relationships can be created and removed.

---

# Milestone 9 — Polish Editor Interactions

## Goal

Improve the editing experience.

## Tasks

- Better selection styling.
- Hover states.
- Connection previews.
- Node animations.
- Edge animations.

## Completion Criteria

- Editing feels smooth and intuitive.

---

# Milestone 10 — Persistence

## Goal

Save user progress.

## Tasks

- Save board locally.
- Load board automatically.
- Handle invalid saves.
- Version saved data.

## Completion Criteria

- Reloading restores the previous board.

---

# Milestone 11 — Import / Export

## Goal

Allow boards to be shared.

## Tasks

- Export JSON.
- Import JSON.
- Validate imported files.
- Error handling.

## Completion Criteria

- Boards can be transferred between devices.

---

# Milestone 12 — Hakush Integration

## Goal

Replace mock data with live character data.

## Tasks

- Create Hakush client.
- Create adapter.
- Normalize responses.
- Replace mock provider.

## Completion Criteria

- Characters load from Hakush.
- UI behavior remains unchanged.

---

# Milestone 13 — PNG Export

## Goal

Allow users to export finished graphs as images.

## Tasks

- Capture board.
- Export PNG.
- Handle large boards.

## Completion Criteria

- PNG output accurately represents the current board.

---

# Milestone 14 — Testing

## Goal

Improve project reliability.

## Tasks

- Unit tests
- Integration tests
- Import/export tests
- Persistence tests
- Basic Playwright tests

## Completion Criteria

Critical editor functionality is covered by automated tests.

---

# Milestone 15 — MVP Release

## Goal

Prepare the first complete release.

## Tasks

- Final bug fixes.
- Performance improvements.
- Documentation review.
- UI polish.
- Final testing.

## Completion Criteria

Users can:

- Search characters.
- Create boards.
- Edit layouts.
- Connect characters.
- Save progress.
- Import boards.
- Export boards.
- Export PNGs.

The application is considered feature complete for the MVP.

---

# Future Enhancements

The following ideas are intentionally deferred until after the MVP:

- Additional games
- Relationship labels
- Notes
- Character filters
- Multiple boards
- Cloud synchronization
- User accounts
- Collaboration
- Mobile support
- Plugin system

These features should be evaluated only after the MVP is complete.

---

# Maintaining This Document

This document should evolve alongside the project.

When a milestone is completed:

1. Mark it as complete.
2. Update the current milestone.
3. Add new milestones if necessary.
4. Keep completed milestones for historical reference.

The development plan should always reflect the current state of the project.