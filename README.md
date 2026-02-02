# beautiful-mermaid-skill

Clawdbot skill for rendering [Mermaid](https://mermaid.js.org/) diagrams to ASCII or SVG.

Based on [lukilabs/beautiful-mermaid](https://github.com/lukilabs/beautiful-mermaid).

## Installation

```bash
# Install globally
cd scripts && npm install -g .

# Or use npx (after npm install)
cd scripts && npm install
npx mermaid-render --help
```

## Usage

### ASCII Output (chat/terminal friendly)

```bash
mermaid-render ascii "graph LR
A --> B --> C"
```

Output:
```
┌───┐     ┌───┐     ┌───┐
│   │     │   │     │   │
│ A ├────►│ B ├────►│ C │
│   │     │   │     │   │
└───┘     └───┘     └───┘
```

### SVG Output

```bash
mermaid-render svg "graph TD
A --> B" -o diagram.svg -t tokyo-night
```

### Input Methods

```bash
# Inline diagram
mermaid-render ascii "graph LR
A --> B"

# From file
mermaid-render ascii -f diagram.mmd

# From stdin
cat diagram.mmd | mermaid-render ascii
```

### Options

```
mermaid-render <mode> [diagram] [options]

Modes:
  ascii    Render to ASCII/Unicode art
  svg      Render to SVG

Options:
  -f, --file <path>     Read diagram from file
  -o, --output <path>   Write output to file (SVG mode)
  -t, --theme <name>    Use built-in theme (SVG mode)
  --ascii               Use pure ASCII instead of Unicode
  --list-themes         List available themes
```

## Supported Diagrams

| Type | Header |
|------|--------|
| Flowchart | `graph TD`, `graph LR`, `flowchart TD` |
| State | `stateDiagram-v2` |
| Sequence | `sequenceDiagram` |
| Class | `classDiagram` |
| ER | `erDiagram` |

## Examples

### Flowchart

```bash
mermaid-render ascii "graph TD
A[Start] --> B{Decision}
B -->|Yes| C[Process]
B -->|No| D[End]
C --> D"
```

### Sequence Diagram

```bash
mermaid-render ascii "sequenceDiagram
Alice->>Bob: Hello!
Bob-->>Alice: Hi there!"
```

### State Diagram

```bash
mermaid-render ascii "stateDiagram-v2
[*] --> Idle
Idle --> Running: start
Running --> Idle: stop"
```

## Themes (SVG mode)

```bash
mermaid-render --list-themes
```

Available: `tokyo-night`, `dracula`, `nord`, `github-dark`, `catppuccin-mocha`, etc.

## As Clawdbot Skill

This repo is also a Clawdbot skill. Clone to your skills directory:

```bash
cd ~/clawd/skills
git clone https://github.com/nil957/beautiful-mermaid-skill beautiful-mermaid
cd beautiful-mermaid/scripts && npm install
```

## License

MIT
