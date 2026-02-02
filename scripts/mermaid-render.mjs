#!/usr/bin/env node
/**
 * mermaid-render - Render Mermaid diagrams to ASCII or SVG
 * Usage:
 *   mermaid-render ascii "graph LR; A --> B"
 *   mermaid-render svg "graph TD; A --> B" -o output.svg
 *   mermaid-render ascii -f diagram.mmd
 *   echo "graph LR; A-->B" | mermaid-render ascii
 */

import { renderMermaid, renderMermaidAscii, THEMES } from 'beautiful-mermaid';
import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);

function printUsage() {
  console.log(`Usage: mermaid-render <mode> [diagram] [options]

Modes:
  ascii    Render to ASCII/Unicode (default: Unicode box-drawing)
  svg      Render to SVG

Options:
  -f, --file <path>     Read diagram from file
  -o, --output <path>   Write output to file (SVG mode)
  -t, --theme <name>    Use built-in theme (SVG mode)
  --ascii               Use pure ASCII instead of Unicode (ASCII mode)
  --list-themes         List available themes

Examples:
  mermaid-render ascii "graph LR; A --> B --> C"
  mermaid-render svg "graph TD; A --> B" -o diagram.svg -t tokyo-night
  echo "sequenceDiagram; A->>B: Hello" | mermaid-render ascii
  mermaid-render ascii -f diagram.mmd`);
}

async function main() {
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    printUsage();
    process.exit(0);
  }

  if (args.includes('--list-themes')) {
    console.log('Available themes:');
    Object.keys(THEMES).forEach(t => console.log(`  ${t}`));
    process.exit(0);
  }

  const mode = args[0];
  if (!['ascii', 'svg'].includes(mode)) {
    console.error(`Error: Unknown mode "${mode}". Use "ascii" or "svg".`);
    process.exit(1);
  }

  let diagram = null;
  let outputFile = null;
  let themeName = null;
  let useAscii = false;

  // Parse arguments
  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    if (arg === '-f' || arg === '--file') {
      const filePath = args[++i];
      if (!filePath) {
        console.error('Error: --file requires a path');
        process.exit(1);
      }
      diagram = fs.readFileSync(filePath, 'utf-8');
    } else if (arg === '-o' || arg === '--output') {
      outputFile = args[++i];
    } else if (arg === '-t' || arg === '--theme') {
      themeName = args[++i];
    } else if (arg === '--ascii') {
      useAscii = true;
    } else if (!arg.startsWith('-') && !diagram) {
      diagram = arg;
    }
  }

  // Read from stdin if no diagram provided
  if (!diagram) {
    if (process.stdin.isTTY) {
      console.error('Error: No diagram provided. Pass as argument, --file, or pipe via stdin.');
      process.exit(1);
    }
    diagram = await new Promise((resolve) => {
      let data = '';
      process.stdin.setEncoding('utf8');
      process.stdin.on('data', chunk => data += chunk);
      process.stdin.on('end', () => resolve(data.trim()));
    });
  }

  if (!diagram) {
    console.error('Error: Empty diagram');
    process.exit(1);
  }

  try {
    if (mode === 'ascii') {
      const result = renderMermaidAscii(diagram, { useAscii });
      console.log(result);
    } else {
      const theme = themeName ? THEMES[themeName] : undefined;
      if (themeName && !theme) {
        console.error(`Error: Unknown theme "${themeName}". Use --list-themes to see available themes.`);
        process.exit(1);
      }
      const svg = await renderMermaid(diagram, theme);
      if (outputFile) {
        fs.writeFileSync(outputFile, svg);
        console.log(`SVG written to ${outputFile}`);
      } else {
        console.log(svg);
      }
    }
  } catch (err) {
    console.error(`Error rendering diagram: ${err.message}`);
    process.exit(1);
  }
}

main();
