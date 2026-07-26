# Product Requirements

## Overview

Character Team Builder is a desktop-first web application that allows users to
visually organize video game characters into relationship graphs.

Instead of displaying information in tables or lists, the application provides
an interactive workspace where users can drag character portraits onto a board,
arrange them freely, and create visual connections between them.

Those connections are intentionally flexible. They may represent team
compositions, combat synergies, friendships, rivalries, story relationships,
organizations, personal notes, or any other meaning chosen by the user.

The application is designed to be game-independent. While the first supported
game is **Zenless Zone Zero**, the editor itself should not depend on any
individual game's data model. Future games should be supported by adding new
game providers rather than modifying the editor.

This project is primarily a learning project that focuses on software
architecture, maintainability, frontend engineering, and interactive UI design.

---

# Goals

The primary goals of the application are:

- Create an intuitive visual graph editor for game characters.
- Make building and editing graphs fast and enjoyable.
- Keep the editor independent from any specific game.
- Support future game integrations without major architectural changes.
- Serve as a long-term portfolio project that demonstrates strong frontend
  architecture and engineering practices.
- Build the project incrementally while maintaining a clean codebase.

---

# Non-Goals

The application is **not** intended to be:

- A combat simulator.
- A damage calculator.
- A build optimizer.
- A tier list creator.
- A wiki replacement.
- A multiplayer application.
- A real-time collaborative editor.
- A social media platform.
- A backend-heavy application.

These features may be explored in the future, but they are explicitly outside
the scope of the initial project.

---

# Target Audience

The application is intended for players who enjoy organizing information about
their favorite games.

Typical use cases include:

- Planning character teams.
- Visualizing team compositions.
- Mapping character relationships.
- Organizing factions.
- Creating diagrams for guides.
- Sharing graph layouts with friends.

The application is also intended to serve as a software engineering portfolio
project demonstrating modern frontend architecture.

---

# Supported Platforms

The initial version supports:

- Desktop browsers
- Mouse
- Keyboard
- Trackpad

Mobile editing is not part of the MVP.

The application should remain usable on tablets where practical, but desktop
interaction is the primary design target.

---

# Supported Games

## Initial Game

The first supported game is:

- Zenless Zone Zero

Character information will be retrieved from Hakush and transformed into the
application's internal data model.

## Future Games

The architecture should support additional games without changing the editor.

Possible future games include:

- Path to Nowhere
- Honkai: Star Rail
- Wuthering Waves
- Other character collection games

Adding a new game should primarily involve creating a new game provider rather
than modifying existing editor functionality.

---

# Core Features

## Character Catalog

The application provides a searchable catalog containing every available
character for the selected game.

Each catalog entry displays:

- Portrait
- Character name

Future versions may additionally display information such as:

- Rarity
- Role
- Element
- Faction
- Specialty

The catalog remains visible while editing the board.

Removing a character from the board does not remove it from the catalog.

---

## Search

Users can search the character catalog.

Search should:

- Update results immediately.
- Ignore capitalization.
- Search by character name.

Future improvements may include searching aliases or tags.

---

## Board

The primary workspace is an infinite graph board.

The board allows users to:

- Place characters.
- Move characters.
- Select characters.
- Create relationships.
- Delete relationships.
- Pan.
- Zoom.
- Organize layouts.

The board should feel similar to a visual whiteboard rather than a traditional
flowchart editor.

---

## Character Nodes

Dragging a character from the catalog creates a node on the board.

Each node represents one placed instance of a character.

Nodes display:

- Portrait
- Character name

Nodes should remain visually compact while still being easy to interact with.

---

## Relationships

Users can create relationships between characters.

Relationships intentionally have no predefined meaning.

Examples include:

- Team member
- Friend
- Enemy
- Organization
- Story connection
- Personal note

The application stores only the connection.

The interpretation belongs entirely to the user.

---

## Node Editing

Users should be able to:

- Move nodes
- Delete nodes
- Select nodes
- Connect nodes
- Reposition nodes at any time

Deleting a node also removes every relationship connected to that node.

---

## Edge Editing

Users should be able to:

- Create relationships
- Delete relationships
- Reconnect relationships

Duplicate relationships should not be created.

A node cannot connect to itself.

---

## Undo and Redo

The editor should support:

- Undo
- Redo

Undo history should include meaningful editing actions such as:

- Adding nodes
- Moving nodes
- Removing nodes
- Creating relationships
- Removing relationships

---

## Local Saving

The application should automatically preserve the current board locally.

Reloading the page should restore the latest saved board whenever possible.

The user should not need to manually save normal edits.

---

## Import

Users should be able to import previously exported board files.

Invalid files should not modify the current board.

---

## Export

Users should be able to export:

- JSON
- PNG

JSON allows boards to be restored later.

PNG allows boards to be shared as images.

---

# User Workflow

A typical editing session looks like this:

1. Open the application.
2. Select a game.
3. Browse or search the character catalog.
4. Drag characters onto the board.
5. Arrange the nodes.
6. Create relationships.
7. Continue editing.
8. Close the application.

When the application is reopened, the board is restored automatically.

---

# User Experience Goals

The editor should feel:

- Responsive
- Predictable
- Lightweight
- Visual
- Easy to learn

Common actions should require very few clicks.

The application should encourage experimentation by making editing reversible.

---

# Performance Goals

Normal editing should remain smooth while working with reasonably sized boards.

The application should comfortably support approximately:

- 100 nodes
- 300 relationships

Performance optimizations should be introduced only when actual bottlenecks are
identified.

---

# Accessibility Goals

Where practical, the application should:

- Support keyboard navigation.
- Maintain visible focus indicators.
- Use sufficient color contrast.
- Avoid relying exclusively on color to communicate information.
- Provide accessible labels for interactive controls.

Accessibility improvements should be incorporated throughout development rather
than postponed until the end of the project.

---

# MVP Scope

The first public version includes:

- Desktop application
- Zenless Zone Zero support
- Character catalog
- Search
- Drag and drop
- Portrait nodes
- Relationship creation
- Relationship deletion
- Node deletion
- Undo
- Redo
- Automatic local saving
- JSON import
- JSON export
- PNG export

---

# Out of Scope

The following features are intentionally excluded from the MVP:

- User accounts
- Cloud synchronization
- Multiplayer editing
- Real-time collaboration
- Authentication
- Comments
- Notifications
- Automatic team generation
- Combat simulation
- Damage calculations
- AI recommendations
- Mobile editing
- Native desktop applications

---

# Success Criteria

The MVP will be considered successful if a user can:

1. Open the application.
2. Search for a character.
3. Drag characters onto the board.
4. Arrange those characters freely.
5. Create relationships between characters.
6. Delete nodes and relationships.
7. Undo and redo edits.
8. Reload the application without losing work.
9. Export a board as JSON.
10. Import that JSON successfully.
11. Export the completed board as a PNG image.

If all of these tasks can be completed without confusion or data loss, the MVP
has achieved its primary objective.