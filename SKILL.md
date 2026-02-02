---
name: beautiful-mermaid
description: Render Mermaid diagrams to ASCII art or SVG. Use when visualizing flowcharts, state diagrams, sequence diagrams, class diagrams, or ER diagrams in chat or terminal. ASCII output is perfect for messaging platforms (Telegram, Discord, Slack, etc).
---

# Beautiful Mermaid

Render Mermaid text diagrams to ASCII/Unicode or SVG.

## Setup

```bash
cd scripts && npm install -g .
```

## Quick Start

```bash
# ASCII output (chat-friendly)
mermaid-render ascii "graph LR
A --> B --> C"

# SVG output
mermaid-render svg "graph TD
A --> B" -o diagram.svg
```

## Supported Diagram Types

| Type | Header |
|------|--------|
| Flowchart | `graph TD`, `graph LR`, `flowchart TD` |
| State | `stateDiagram-v2` |
| Sequence | `sequenceDiagram` |
| Class | `classDiagram` |
| ER | `erDiagram` |

## ASCII Mode

```bash
mermaid-render ascii "graph LR
A[Start] --> B{Decision}
B -->|Yes| C[Action]
B -->|No| D[End]"
```

Output:
```
┌───────┐     ┌──────────┐     ┌────────┐
│       │     │          │     │        │
│ Start ├────►│ Decision ├────►│ Action │
│       │     │          │     │        │
└───────┘     └────┬─────┘     └────────┘
                   │
                   ▼
              ┌────────┐
              │  End   │
              └────────┘
```

Options:
- `--ascii` — Use pure ASCII (no Unicode box-drawing)

## SVG Mode

```bash
mermaid-render svg "graph TD
A --> B" -o output.svg -t tokyo-night
```

Options:
- `-o, --output <path>` — Write to file
- `-t, --theme <name>` — Apply theme
- `--list-themes` — Show available themes

## Input Methods

```bash
# Inline
mermaid-render ascii "graph LR
A --> B"

# From file
mermaid-render ascii -f diagram.mmd

# From stdin
echo "graph LR
A --> B" | mermaid-render ascii
```

## Common Patterns

### Flowchart
```mermaid
graph TD
A[Start] --> B{Check}
B -->|Yes| C[Process]
B -->|No| D[End]
C --> D
```

### Sequence
```mermaid
sequenceDiagram
Alice->>Bob: Request
Bob-->>Alice: Response
```

### State
```mermaid
stateDiagram-v2
[*] --> Idle
Idle --> Active: trigger
Active --> Idle: reset
```

## Notes

- Mermaid syntax requires newlines between nodes (`;` alone won't work for ASCII)
- ASCII output works great in code blocks on messaging platforms
- For complex diagrams, save SVG and share as image
