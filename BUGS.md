# Bugs

Known issues, with steps to reproduce.

- **`/dev/layout-editor` fails `react-hooks/set-state-in-effect` lint** (`npx eslint`, 3 occurrences — the localStorage-restore `useEffect`s for callout slots, relative slots, and paths). Intentional, not a defect: the page is statically prerendered, so reading `localStorage` can't happen in a lazy `useState` initializer at build time; the mount effect is the only place it can happen. Confirmed dev-tool-only, doesn't affect the real site. Leave as-is rather than refactoring around it.
