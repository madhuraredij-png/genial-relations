// Minimal SVG path parser/serializer for the layout editor's draggable curve
// handles. Deliberately supports only the command letters that actually
// appear in this codebase today (M L H V C, upper and lower case, plus
// SVG's "implicit repeat" shorthand where extra coordinate pairs after a
// command letter repeat that same command) — not a general-purpose SVG path
// library. Arcs/quadratics (A, Q, S, T) aren't used anywhere here, so they're
// not supported; parse() throws if it meets one, so a future path using them
// fails loudly in the dev tool rather than silently mangling it.
//
// Dev-tool-only: imported by src/app/dev/layout-editor/page.tsx, never by
// the production word page, so this never ships to the live rendering path.

export type PointRole =
  | { kind: "point"; axis: "xy" } // M, L endpoint
  | { kind: "point"; axis: "x" } // H endpoint (y fixed)
  | { kind: "point"; axis: "y" } // V endpoint (x fixed)
  | { kind: "cp1" | "cp2" | "end"; axis: "xy" }; // C control points / endpoint

interface ParsedCommand {
  letter: "M" | "m" | "L" | "l" | "H" | "h" | "V" | "v" | "C" | "c";
  // Whether this command's letter is written out in the source, vs. an
  // implicit continuation of the previous command's letter (e.g. the second
  // "5 5" pair in "l5-5 5 5" has no letter of its own in the source).
  explicit: boolean;
  // Whether there was whitespace in the source immediately before this
  // command (its letter, or its first number for an implicit repeat) —
  // preserved so re-serializing matches the source's spacing, e.g.
  // "104 C130" keeps its space rather than collapsing to "104C130".
  leadingSpace: boolean;
  // Raw numbers as given in the source, in source order, interpreted as
  // relative deltas (lower-case letters) or absolute values (upper-case).
  nums: number[];
}

interface Subpath {
  commands: ParsedCommand[];
}

export interface PathModel {
  subpaths: Subpath[];
}

// One draggable point, with its resolved absolute (x,y) and enough back-
// reference to write a drag back into the owning command's raw numbers.
export interface Handle {
  id: string;
  x: number;
  y: number;
  kind: "anchor" | "control";
  subpathIndex: number;
  commandIndex: number;
  role: "point" | "cp1" | "cp2" | "end";
  // For control-point handles, the anchor handle id to draw a guide line to.
  guideTo?: string;
}

const COMMAND_ARITY: Record<string, number> = {
  M: 2,
  L: 2,
  H: 1,
  V: 1,
  C: 6,
};

export function parsePath(d: string): PathModel {
  const tokens = d
    .trim()
    .replace(/,/g, " ");
  // Match any letter (not just the supported set) so an unsupported command
  // like Q/A/S/T surfaces as an explicit error below, instead of being
  // silently skipped by the tokenizer and corrupting the path.
  const matches = [...tokens.matchAll(/[A-Za-z]|-?\d*\.?\d+(?:e-?\d+)?/g)];
  if (matches.length === 0) return { subpaths: [] };

  const letterRe = /^[MLHVCmlhvc]$/;
  const anyLetterRe = /^[A-Za-z]$/;
  const hasLeadingSpace = (index: number) => index > 0 && /\s/.test(tokens[index - 1]);

  const subpaths: Subpath[] = [];
  let current: Subpath | null = null;
  let i = 0;
  let activeLetter: ParsedCommand["letter"] | null = null;

  while (i < matches.length) {
    const tok = matches[i][0];
    const tokIndex = matches[i].index!;
    let letter: ParsedCommand["letter"];
    let explicit: boolean;
    let leadingSpace: boolean;
    if (anyLetterRe.test(tok) && !letterRe.test(tok)) {
      throw new Error(`svgPathEditor: unsupported command "${tok}" in "${d}"`);
    }
    if (letterRe.test(tok)) {
      letter = tok as ParsedCommand["letter"];
      explicit = true;
      leadingSpace = hasLeadingSpace(tokIndex);
      i++;
      if (letter === "M" || letter === "m") {
        current = { commands: [] };
        subpaths.push(current);
      }
    } else if (activeLetter) {
      // Implicit repeat: reuse the previous command's letter, except a
      // repeated M/m implicitly becomes L/l per the SVG spec.
      letter =
        activeLetter === "M" ? "L" : activeLetter === "m" ? "l" : activeLetter;
      explicit = false;
      leadingSpace = hasLeadingSpace(tokIndex);
    } else {
      throw new Error(`svgPathEditor: unexpected token "${tok}" in "${d}"`);
    }

    const upper = letter.toUpperCase();
    const arity = COMMAND_ARITY[upper];
    if (arity === undefined) {
      throw new Error(`svgPathEditor: unsupported command "${letter}" in "${d}"`);
    }
    const nums: number[] = [];
    for (let k = 0; k < arity; k++) {
      const n = Number(matches[i]?.[0]);
      if (Number.isNaN(n)) {
        throw new Error(`svgPathEditor: expected number, got "${matches[i]?.[0]}" in "${d}"`);
      }
      nums.push(n);
      i++;
    }
    if (!current) {
      throw new Error(`svgPathEditor: path "${d}" does not start with M/m`);
    }
    current.commands.push({ letter, explicit, leadingSpace, nums });
    activeLetter = letter;
  }

  return { subpaths };
}

// Walks a parsed path, resolving every command's absolute coordinates.
// Returns, per command, the absolute end point (and, for C, the two
// absolute control points) plus the running current point used to convert
// relative commands.
interface ResolvedCommand {
  subpathIndex: number;
  commandIndex: number;
  letter: ParsedCommand["letter"];
  startX: number; // current point before this command runs
  startY: number;
  endX: number;
  endY: number;
  cp1X?: number;
  cp1Y?: number;
  cp2X?: number;
  cp2Y?: number;
}

function resolve(model: PathModel): ResolvedCommand[] {
  const out: ResolvedCommand[] = [];
  model.subpaths.forEach((sub, subpathIndex) => {
    let cx = 0;
    let cy = 0;
    sub.commands.forEach((cmd, commandIndex) => {
      const rel = cmd.letter === cmd.letter.toLowerCase();
      const startX = cx;
      const startY = cy;
      let endX = cx;
      let endY = cy;
      let cp1X: number | undefined;
      let cp1Y: number | undefined;
      let cp2X: number | undefined;
      let cp2Y: number | undefined;

      switch (cmd.letter.toUpperCase()) {
        case "M":
        case "L":
          endX = rel ? cx + cmd.nums[0] : cmd.nums[0];
          endY = rel ? cy + cmd.nums[1] : cmd.nums[1];
          break;
        case "H":
          endX = rel ? cx + cmd.nums[0] : cmd.nums[0];
          endY = cy;
          break;
        case "V":
          endX = cx;
          endY = rel ? cy + cmd.nums[0] : cmd.nums[0];
          break;
        case "C":
          cp1X = rel ? cx + cmd.nums[0] : cmd.nums[0];
          cp1Y = rel ? cy + cmd.nums[1] : cmd.nums[1];
          cp2X = rel ? cx + cmd.nums[2] : cmd.nums[2];
          cp2Y = rel ? cy + cmd.nums[3] : cmd.nums[3];
          endX = rel ? cx + cmd.nums[4] : cmd.nums[4];
          endY = rel ? cy + cmd.nums[5] : cmd.nums[5];
          break;
      }

      out.push({
        subpathIndex,
        commandIndex,
        letter: cmd.letter,
        startX,
        startY,
        endX,
        endY,
        cp1X,
        cp1Y,
        cp2X,
        cp2Y,
      });
      cx = endX;
      cy = endY;
    });
  });
  return out;
}

export function getHandles(model: PathModel): Handle[] {
  const resolved = resolve(model);
  const handles: Handle[] = [];
  resolved.forEach((r) => {
    const base = `${r.subpathIndex}-${r.commandIndex}`;
    const endId = `${base}-end`;
    if (r.letter.toUpperCase() === "C") {
      handles.push({
        id: `${base}-cp1`,
        x: r.cp1X!,
        y: r.cp1Y!,
        kind: "control",
        subpathIndex: r.subpathIndex,
        commandIndex: r.commandIndex,
        role: "cp1",
        guideTo: endIdForStart(resolved, r),
      });
      handles.push({
        id: `${base}-cp2`,
        x: r.cp2X!,
        y: r.cp2Y!,
        kind: "control",
        subpathIndex: r.subpathIndex,
        commandIndex: r.commandIndex,
        role: "cp2",
        guideTo: endId,
      });
    }
    handles.push({
      id: endId,
      x: r.endX,
      y: r.endY,
      kind: "anchor",
      subpathIndex: r.subpathIndex,
      commandIndex: r.commandIndex,
      role: r.letter.toUpperCase() === "C" ? "end" : "point",
    });
  });
  return handles;
}

// cp1's guide line goes back to the anchor the segment started from, i.e.
// the previous command's end point (or the subpath's M if it's the first).
function endIdForStart(resolved: ResolvedCommand[], r: ResolvedCommand): string | undefined {
  if (r.commandIndex === 0) return `${r.subpathIndex}-0-end`; // the M itself
  return `${r.subpathIndex}-${r.commandIndex - 1}-end`;
}

// Immutably applies a drag to one handle, respecting the axis that H/V
// commands can represent (dragging an H handle only ever changes x, a V
// handle only ever changes y) and preserving every command's original
// letter/explicitness so re-serializing stays in the source's shorthand.
export function moveHandle(
  model: PathModel,
  subpathIndex: number,
  commandIndex: number,
  role: "point" | "cp1" | "cp2" | "end",
  newX: number,
  newY: number
): PathModel {
  const next: PathModel = {
    subpaths: model.subpaths.map((s) => ({ commands: s.commands.map((c) => ({ ...c, nums: [...c.nums] })) })),
  };
  const resolvedBefore = resolve(model);
  const r = resolvedBefore.find(
    (x) => x.subpathIndex === subpathIndex && x.commandIndex === commandIndex
  );
  if (!r) return model;
  const cmd = next.subpaths[subpathIndex].commands[commandIndex];
  const rel = cmd.letter === cmd.letter.toLowerCase();
  const upper = cmd.letter.toUpperCase();

  const toStored = (absX: number, absY: number): [number, number] => [
    rel ? absX - r.startX : absX,
    rel ? absY - r.startY : absY,
  ];

  if (upper === "M" || upper === "L") {
    [cmd.nums[0], cmd.nums[1]] = toStored(newX, newY);
  } else if (upper === "H") {
    cmd.nums[0] = rel ? newX - r.startX : newX;
  } else if (upper === "V") {
    cmd.nums[0] = rel ? newY - r.startY : newY;
  } else if (upper === "C") {
    if (role === "cp1") [cmd.nums[0], cmd.nums[1]] = toStored(newX, newY);
    else if (role === "cp2") [cmd.nums[2], cmd.nums[3]] = toStored(newX, newY);
    else [cmd.nums[4], cmd.nums[5]] = toStored(newX, newY);
  }
  return next;
}

function fmtNum(n: number): string {
  const rounded = Math.round(n * 100) / 100;
  return String(rounded);
}

export function serializePath(model: PathModel): string {
  let out = "";
  model.subpaths.forEach((sub) => {
    sub.commands.forEach((cmd) => {
      const nums = cmd.nums.map(fmtNum);
      // Match the source convention: a space between numbers, except no
      // space right before a negative number (the "-" itself separates it).
      const numStr = nums.reduce((acc, n, i) => {
        if (i === 0) return n;
        return acc + (n.startsWith("-") ? "" : " ") + n;
      }, "");
      out += (cmd.leadingSpace ? " " : "") + (cmd.explicit ? cmd.letter : "") + numStr;
    });
  });
  return out;
}
