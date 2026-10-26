"use client";

// A drag-and-drop tool for the hand-placed layout systems on the word page:
// the numbered record-fact callouts (CALLOUT_SLOTS), the relative
// place-cards (RELATIVE_SLOTS), and the six hand-drawn decorative lines (name
// bracket, callout stems, gossip squiggle, pushpin, paperclip, current-tag
// zigzag). All defined in src/lib/placement.ts. Editing those numbers blind,
// rebuilding, and screenshotting is slow; this page lets you drag the same
// real elements (same CSS classes as the live site) and see the result
// immediately. Internal dev page, not part of the site, not linked from
// anywhere live.
//
// Known limits (v1): the relative-card connector lines (the lines from each
// place-card back to the current-page tag) aren't editable here — they're
// calculated fresh from wherever a card sits (connectorPath in placement.ts)
// so the line always reaches a dragged card; hand-editing that curve's shape
// would need a different kind of control (a bend-amount override on top of
// the formula), not plain draggable points. Everything else — callout/
// relative positions, callout+relative box widths, and every other hand-
// drawn line on the page (the name bracket, callout stems, gossip squiggle,
// pushpin, paperclip, current-tag zigzag) — is editable below. A guest's
// cards also get a small +/-1deg random rotation on top of whatever base
// rotate you set here (see placeRelative in placement.ts); this editor shows
// your base value only, not that jitter.
//
// Nothing here writes to the real source files directly. Clicking "Save to
// file" posts the current state to a dev-only API route
// (src/app/api/dev/layout-editor/save/route.ts) that writes it to
// .layout-editor-save.json (gitignored) — Claude reads that file and makes
// the actual edit to placement.ts/page.tsx, preserving the surrounding
// comments by hand rather than mechanically overwriting them. That save
// route is guarded to do nothing outside local development.

import { useEffect, useMemo, useRef, useState } from "react";
import { getAllGuestSlugs, getGuest } from "@/lib/data";
import { eraFontClassName } from "@/lib/fonts";
import {
  CALLOUT_SLOTS,
  RELATIVE_SLOTS,
  CALLOUT_STEM_PATHS,
  NAME_BRACKET_PATH,
  GOSSIP_SQUIGGLE_PATH,
  PUSHPIN_PATHS,
  PAPERCLIP_PATH,
  CURRENT_TAG_ZIGZAG_PATH,
  connectorPath,
  calloutBorderRadius,
  type CalloutSlot,
  type RelativeSlot,
} from "@/lib/placement";
import type { Link as GuestLink } from "@/lib/schemas/shared";
import type { Guest } from "@/lib/schemas/guest";
import { SvgFilterDefs } from "@/components/SvgFilterDefs";
import {
  parsePath,
  serializePath,
  getHandles,
  moveHandle,
  type PathModel,
  type Handle,
} from "./svgPathEditor";
import wordStyles from "../../word/[slug]/page.module.css";
import styles from "./layout-editor.module.css";

const STORAGE_KEY_CALLOUTS = "genial-relations:layout-editor:calloutSlots";
const STORAGE_KEY_RELATIVES = "genial-relations:layout-editor:relativeSlots";
const STORAGE_KEY_PATHS = "genial-relations:layout-editor:paths";

// The six hand-drawn line groups, each stored as one or more PathModels so
// multi-path icons (pushpin, stems) keep their pieces independent.
interface PathsState {
  bracket: PathModel;
  stems: PathModel[];
  squiggle: PathModel;
  pushpin: PathModel[];
  paperclip: PathModel;
  zigzag: PathModel;
}

function defaultPathsState(): PathsState {
  return {
    bracket: parsePath(NAME_BRACKET_PATH),
    stems: CALLOUT_STEM_PATHS.map(parsePath),
    squiggle: parsePath(GOSSIP_SQUIGGLE_PATH),
    pushpin: PUSHPIN_PATHS.map(parsePath),
    paperclip: parsePath(PAPERCLIP_PATH),
    zigzag: parsePath(CURRENT_TAG_ZIGZAG_PATH),
  };
}

// One shared ref holds in-flight drag starting points, keyed by a string id
// (e.g. "callout-0"), so every draggable element can share a single
// useRef instead of needing one hook per element (hooks can't live inside
// .map()).
function useDragHandlers() {
  const startRef = useRef<Record<string, { x: number; y: number } | null>>({});

  return function dragHandlers(key: string, onMove: (dx: number, dy: number) => void) {
    return {
      onPointerDown: (e: React.PointerEvent<Element>) => {
        e.preventDefault();
        e.currentTarget.setPointerCapture(e.pointerId);
        startRef.current[key] = { x: e.clientX, y: e.clientY };
      },
      onPointerMove: (e: React.PointerEvent<Element>) => {
        const start = startRef.current[key];
        if (!start) return;
        const dx = e.clientX - start.x;
        const dy = e.clientY - start.y;
        startRef.current[key] = { x: e.clientX, y: e.clientY };
        onMove(dx, dy);
      },
      onPointerUp: () => {
        startRef.current[key] = null;
      },
    };
  };
}

function NumberField({
  label,
  value,
  onChange,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  step?: number;
}) {
  return (
    <label className={styles.field}>
      <span>{label}</span>
      <input
        type="number"
        step={step}
        value={Number.isFinite(value) ? value : 0}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}

function calloutSlotsCode(slots: CalloutSlot[]): string {
  const lines = slots
    .map(
      (s) =>
        `  { left: ${Math.round(s.left)}, top: ${Math.round(s.top)}, rotate: ${s.rotate}, maxWidth: ${Math.round(s.maxWidth)} },`
    )
    .join("\n");
  return `export const CALLOUT_SLOTS: CalloutSlot[] = [\n${lines}\n];`;
}

function relativeSlotsCode(slots: RelativeSlot[]): string {
  const lines = slots
    .map(
      (s) =>
        `  { left: ${Math.round(s.left)}, top: ${Math.round(s.top)}, rotate: ${s.rotate}, maxWidth: ${Math.round(s.maxWidth)} },`
    )
    .join("\n");
  return `export const RELATIVE_SLOTS: RelativeSlot[] = [\n${lines}\n];`;
}

function singlePathCode(name: string, model: PathModel): string {
  return `export const ${name} = ${JSON.stringify(serializePath(model))};`;
}

function pathArrayCode(name: string, models: PathModel[]): string {
  const lines = models.map((m) => `  ${JSON.stringify(serializePath(m))},`).join("\n");
  return `export const ${name} = [\n${lines}\n];`;
}

// Plain-data form of PathsState (serialized strings, same shape as the real
// placement.ts exports) — used for the save-to-file payload so the saved
// JSON can be read directly against placement.ts.
function pathsToJSON(p: PathsState) {
  return {
    nameBracket: serializePath(p.bracket),
    calloutStems: p.stems.map(serializePath),
    gossipSquiggle: serializePath(p.squiggle),
    pushpin: p.pushpin.map(serializePath),
    paperclip: serializePath(p.paperclip),
    currentTagZigzag: serializePath(p.zigzag),
  };
}

// Renders a path's draggable handles (filled circles = anchors, hollow
// circles = bezier control points) plus thin guide lines from each control
// point back to its segment's anchor (standard vector-editor convention).
// `zoom` is screen-pixels-per-viewBox-unit for the enclosing <svg>, so drag
// deltas (which arrive in screen pixels) convert back to viewBox units
// before being handed to onDragHandle.
function PathHandlesOverlay({
  model,
  zoom,
  stroke,
  dragHandlers,
  idPrefix,
  onDragHandle,
}: {
  model: PathModel;
  zoom: number;
  stroke: string;
  dragHandlers: ReturnType<typeof useDragHandlers>;
  idPrefix: string;
  onDragHandle: (
    subpathIndex: number,
    commandIndex: number,
    role: Handle["role"],
    dx: number,
    dy: number
  ) => void;
}) {
  const handles = getHandles(model);
  const byId = new Map(handles.map((h) => [h.id, h]));
  return (
    <>
      {handles
        .filter((h) => h.guideTo && byId.has(h.guideTo))
        .map((h) => {
          const target = byId.get(h.guideTo!)!;
          return (
            <line
              key={`guide-${h.id}`}
              x1={h.x}
              y1={h.y}
              x2={target.x}
              y2={target.y}
              stroke="#999"
              strokeWidth={0.6}
              strokeDasharray="2 2"
            />
          );
        })}
      {handles.map((h) => (
        <g
          key={h.id}
          className={styles.handleHit}
          {...dragHandlers(`${idPrefix}-${h.id}`, (dx, dy) =>
            onDragHandle(h.subpathIndex, h.commandIndex, h.role, dx / zoom, dy / zoom)
          )}
        >
          {/* Hit-circle radius is deliberately only a bit bigger than the
              visible dot (not the usual generous touch-target size) because
              several real paths (e.g. the name bracket) have handles just a
              few units apart — an oversized hit area would make adjacent
              handles steal each other's clicks. Numbers fields remain the
              precise fallback if two handles sit too close to grab apart. */}
          <circle cx={h.x} cy={h.y} r={5 / zoom} fill="transparent" />
          <circle
            cx={h.x}
            cy={h.y}
            r={(h.kind === "anchor" ? 4 : 3.2) / zoom}
            fill={h.kind === "anchor" ? stroke : "#fff"}
            stroke={stroke}
            strokeWidth={1 / zoom}
          />
        </g>
      ))}
    </>
  );
}

// One zoomed-up mini canvas for a decorative line (or group of lines, for
// multi-path icons like the pushpin): the shape plus its draggable handles,
// at a scale big enough to grab comfortably, with a read-only code preview
// underneath. `models` is an array so single-path icons just pass a 1-item
// array.
function DecorativeLineEditor({
  title,
  note,
  models,
  viewBoxWidth,
  viewBoxHeight,
  zoom,
  stroke,
  strokeWidth,
  filterId,
  dragHandlers,
  idPrefix,
  onDragHandle,
  codeText,
}: {
  title: string;
  note?: string;
  models: PathModel[];
  viewBoxWidth: number;
  viewBoxHeight: number;
  zoom: number;
  stroke: string;
  strokeWidth: number;
  filterId?: "crayon" | "wobble";
  dragHandlers: ReturnType<typeof useDragHandlers>;
  idPrefix: string;
  onDragHandle: (
    pathIndex: number,
    subpathIndex: number,
    commandIndex: number,
    role: Handle["role"],
    dx: number,
    dy: number
  ) => void;
  codeText: string;
}) {
  return (
    <div className={styles.pathEditorBlock}>
      <div className={styles.slotRowTitle}>{title}</div>
      {note && <p className={styles.sectionNote}>{note}</p>}
      <svg
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        width={viewBoxWidth * zoom}
        height={viewBoxHeight * zoom}
        className={styles.pathCanvas}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g
          stroke={stroke}
          strokeWidth={strokeWidth}
          style={filterId ? { filter: `url(#${filterId})` } : undefined}
        >
          {models.map((m, pi) => (
            <path key={pi} d={serializePath(m)} />
          ))}
        </g>
        {models.map((m, pi) => (
          <PathHandlesOverlay
            key={pi}
            model={m}
            zoom={zoom}
            stroke={stroke}
            dragHandlers={dragHandlers}
            idPrefix={`${idPrefix}-${pi}`}
            onDragHandle={(subpathIndex, commandIndex, role, dx, dy) =>
              onDragHandle(pi, subpathIndex, commandIndex, role, dx, dy)
            }
          />
        ))}
      </svg>
      <textarea readOnly className={styles.codeBlock} value={codeText} />
    </div>
  );
}

export default function LayoutEditorPage() {
  const slugs = useMemo(() => getAllGuestSlugs(), []);
  const [guestSlug, setGuestSlug] = useState(
    slugs.includes("kriss-kringle") ? "kriss-kringle" : slugs[0]
  );
  const guest = getGuest(guestSlug);

  const [calloutSlots, setCalloutSlots] = useState<CalloutSlot[]>(() =>
    CALLOUT_SLOTS.map((s) => ({ ...s }))
  );
  const [relativeSlots, setRelativeSlots] = useState<RelativeSlot[]>(() =>
    RELATIVE_SLOTS.map((s) => ({ ...s }))
  );
  const [paths, setPaths] = useState<PathsState>(() => defaultPathsState());
  const [loaded, setLoaded] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Restore any saved session on mount (client-only: localStorage isn't
  // available during the server render of this page's initial HTML).
  useEffect(() => {
    try {
      const savedCallouts = localStorage.getItem(STORAGE_KEY_CALLOUTS);
      if (savedCallouts) setCalloutSlots(JSON.parse(savedCallouts));
      const savedRelatives = localStorage.getItem(STORAGE_KEY_RELATIVES);
      if (savedRelatives) setRelativeSlots(JSON.parse(savedRelatives));
      const savedPaths = localStorage.getItem(STORAGE_KEY_PATHS);
      if (savedPaths) setPaths(JSON.parse(savedPaths));
    } catch {
      // Corrupt or missing storage just means starting from code defaults.
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY_CALLOUTS, JSON.stringify(calloutSlots));
    } catch {}
  }, [calloutSlots, loaded]);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY_RELATIVES, JSON.stringify(relativeSlots));
    } catch {}
  }, [relativeSlots, loaded]);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY_PATHS, JSON.stringify(paths));
    } catch {}
  }, [paths, loaded]);

  const dragHandlers = useDragHandlers();

  function updateCallout(i: number, dx: number, dy: number) {
    setCalloutSlots((prev) =>
      prev.map((s, idx) => (idx === i ? { ...s, left: s.left + dx, top: s.top + dy } : s))
    );
  }

  function setCalloutField(i: number, field: keyof CalloutSlot, value: number) {
    setCalloutSlots((prev) => prev.map((s, idx) => (idx === i ? { ...s, [field]: value } : s)));
  }

  function updateRelative(i: number, dx: number, dy: number) {
    setRelativeSlots((prev) =>
      prev.map((s, idx) => (idx === i ? { ...s, left: s.left + dx, top: s.top + dy } : s))
    );
  }

  function setRelativeField(i: number, field: keyof RelativeSlot, value: number) {
    setRelativeSlots((prev) => prev.map((s, idx) => (idx === i ? { ...s, [field]: value } : s)));
  }

  // Applies a handle drag to one of the single-path groups (bracket,
  // squiggle, paperclip, zigzag). Computes the new absolute target inside
  // the setState updater itself (via a fresh getHandles(prev...)) rather
  // than off a render-time snapshot, so rapid-fire drag events can't read a
  // stale handle position.
  function updatePath(
    key: "bracket" | "squiggle" | "paperclip" | "zigzag",
    subpathIndex: number,
    commandIndex: number,
    role: Handle["role"],
    dx: number,
    dy: number
  ) {
    setPaths((prev) => {
      const model = prev[key];
      const h = getHandles(model).find(
        (h) => h.subpathIndex === subpathIndex && h.commandIndex === commandIndex && h.role === role
      );
      if (!h) return prev;
      return { ...prev, [key]: moveHandle(model, subpathIndex, commandIndex, role, h.x + dx, h.y + dy) };
    });
  }

  // Same as updatePath, but for the multi-path groups (stems, pushpin),
  // where pathIndex picks which of the group's PathModels moved.
  function updatePathArray(
    key: "stems" | "pushpin",
    pathIndex: number,
    subpathIndex: number,
    commandIndex: number,
    role: Handle["role"],
    dx: number,
    dy: number
  ) {
    setPaths((prev) => {
      const arr = prev[key];
      const model = arr[pathIndex];
      const h = getHandles(model).find(
        (h) => h.subpathIndex === subpathIndex && h.commandIndex === commandIndex && h.role === role
      );
      if (!h) return prev;
      const newModel = moveHandle(model, subpathIndex, commandIndex, role, h.x + dx, h.y + dy);
      const newArr = arr.map((m, i) => (i === pathIndex ? newModel : m));
      return { ...prev, [key]: newArr };
    });
  }

  async function handleSave() {
    setSaveStatus("Saving…");
    try {
      const payload = {
        calloutSlots,
        relativeSlots,
        paths: pathsToJSON(paths),
      };
      const res = await fetch("/api/dev/layout-editor/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setSaveStatus(`Saved to ${data.savedTo}`);
    } catch (err) {
      setSaveStatus(`Save failed: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  if (!guest) {
    return <main className={styles.page}>No guests found.</main>;
  }

  const facts = guest.recordFacts ?? [];

  const acrossTheRoomByTarget = new Map(
    guest.links
      .filter(
        (l): l is GuestLink & { slug: string } => l.type === "across-the-room" && !!l.slug
      )
      .map((l) => [l.slug, l])
  );

  const relativeLinkEntries = guest.links
    .map((link, i) => ({ link, i, target: link.slug ? getGuest(link.slug) : undefined }))
    .filter(
      (entry): entry is { link: GuestLink; i: number; target: Guest } =>
        entry.link.type !== "across-the-room" && !!entry.target
    );

  const cappedEntries = relativeLinkEntries.slice(0, relativeSlots.length);
  const overflowEntries = relativeLinkEntries.slice(relativeSlots.length);

  const relativeCards = cappedEntries.map((entry, slot) => ({
    ...entry,
    pos: relativeSlots[slot],
    pointer: acrossTheRoomByTarget.get(entry.target.slug),
  }));

  const relativeCardTargetSlugs = new Set(relativeCards.map((c) => c.target.slug));
  const orphanPointerLinks = guest.links
    .map((link, i) => ({ link, i, target: link.slug ? getGuest(link.slug) : undefined }))
    .filter(
      (entry): entry is { link: GuestLink; i: number; target: Guest } =>
        entry.link.type === "across-the-room" &&
        !!entry.target &&
        !relativeCardTargetSlugs.has(entry.target.slug)
    );
  const fallbackLinks = [...overflowEntries, ...orphanPointerLinks];

  // Mirrors relativeFallbackTop in placement.ts, but off the live-dragged
  // positions in this editor rather than the static code constant, so the
  // fallback links visibly follow the last card row as you drag it.
  const cardsBottom =
    relativeCards.length > 0
      ? relativeSlots[Math.min(relativeCards.length, relativeSlots.length) - 1].top + 180
      : 0;
  const fallbackTop = cardsBottom + 14;

  return (
    <main className={styles.page}>
      <SvgFilterDefs />
      <h1 className={styles.heading}>Layout editor</h1>
      <p className={styles.intro}>
        Drag the circles and place-cards below to reposition them, or type exact numbers on the
        right. These are the shared slot positions and line shapes every guest&rsquo;s word page
        uses (not just this one) &mdash; switch guests to check a change against short and long
        content. Nothing here writes to the real files directly: click &ldquo;Save to
        file&rdquo; and Claude will read the result and make the actual edit in{" "}
        <code>src/lib/placement.ts</code>. Internal dev page, not part of the site.
      </p>

      <div className={styles.controlsBar}>
        <label>
          Guest
          <select value={guestSlug} onChange={(e) => setGuestSlug(e.target.value)}>
            {slugs.map((slug) => (
              <option key={slug} value={slug}>
                {slug}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          className={styles.resetButton}
          onClick={() => setCalloutSlots(CALLOUT_SLOTS.map((s) => ({ ...s })))}
        >
          Reset callouts to code
        </button>
        <button
          type="button"
          className={styles.resetButton}
          onClick={() => setRelativeSlots(RELATIVE_SLOTS.map((s) => ({ ...s })))}
        >
          Reset relatives to code
        </button>
        <button
          type="button"
          className={styles.resetButton}
          onClick={() => setPaths(defaultPathsState())}
        >
          Reset lines to code
        </button>
        <button type="button" className={styles.copyButton} onClick={handleSave}>
          Save to file
        </button>
        {saveStatus && <span className={styles.saveStatus}>{saveStatus}</span>}
      </div>

      {/* --- name zone: numbered record-fact callouts + bracket/stems --- */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Record-fact callouts (CALLOUT_SLOTS) + name bracket/stems
        </h2>
        <p className={styles.sectionNote}>
          390&times;300 canvas, matching the name zone&rsquo;s coordinate space on phone (desktop
          scales these same numbers up). {guest.word} has {facts.length} fact
          {facts.length === 1 ? "" : "s"}, so only the first {facts.length} slot
          {facts.length === 1 ? "" : "s"} below are in use for this guest. The green lines (the
          bracket next to the name, and the stem connecting each callout) are draggable too:
          filled circles are anchor points, hollow circles are curve handles.
        </p>
        <div className={styles.editorGrid}>
          <div className={styles.canvas} style={{ width: 390, height: 300 }}>
            <svg
              aria-hidden="true"
              viewBox="0 0 390 300"
              className={wordStyles.nameGuides}
              // Raised above the name/callout text (which paint on top by
              // default DOM order otherwise) so the bracket/stem handles
              // below stay draggable even where they sit under the name.
              style={{ zIndex: 2 }}
              fill="none"
              strokeLinecap="round"
            >
              <path d="M0 118H390" stroke="#2E8B3E" strokeWidth={1} strokeDasharray="2 4" />
              <path d="M0 142H390" stroke="#2E8B3E" strokeWidth={1} strokeDasharray="2 4" />
              <path d="M0 162H390" stroke="#2E8B3E" strokeWidth={1} strokeDasharray="2 4" />
              <g style={{ filter: "url(#crayon)" }} stroke="#2E8B3E" strokeWidth={2}>
                <path d={serializePath(paths.bracket)} />
                {paths.stems.slice(0, facts.length).map((m, i) => (
                  <path key={i} d={serializePath(m)} />
                ))}
              </g>
              <PathHandlesOverlay
                model={paths.bracket}
                zoom={1}
                stroke="#2E8B3E"
                dragHandlers={dragHandlers}
                idPrefix="bracket"
                onDragHandle={(si, ci, role, dx, dy) => updatePath("bracket", si, ci, role, dx, dy)}
              />
              {paths.stems.slice(0, facts.length).map((m, i) => (
                <PathHandlesOverlay
                  key={i}
                  model={m}
                  zoom={1}
                  stroke="#2E8B3E"
                  dragHandlers={dragHandlers}
                  idPrefix={`stem-${i}`}
                  onDragHandle={(si, ci, role, dx, dy) =>
                    updatePathArray("stems", i, si, ci, role, dx, dy)
                  }
                />
              ))}
            </svg>
            <h2 className={`${wordStyles.name} ${eraFontClassName[guest.eraBand]}`}>
              {guest.word}
            </h2>
            <div className={wordStyles.objectPlaceholder}>[object &middot; {guest.word}]</div>
            {facts.map((fact, i) => {
              const pos = calloutSlots[i % calloutSlots.length];
              return (
                <div
                  key={i}
                  className={`${wordStyles.callout} ${styles.draggable}`}
                  style={{ left: pos.left, top: pos.top, maxWidth: pos.maxWidth }}
                  {...dragHandlers(`callout-${i}`, (dx, dy) => updateCallout(i, dx, dy))}
                >
                  <span
                    className={wordStyles.calloutNumber}
                    style={{ borderRadius: calloutBorderRadius(guest.slug, i) }}
                  >
                    {i + 1}
                  </span>
                  {fact}
                </div>
              );
            })}
          </div>
          <div className={styles.panel}>
            {calloutSlots.map((slot, i) => (
              <div key={i} className={styles.slotRow}>
                <div className={styles.slotRowTitle}>
                  Slot {i + 1}
                  {i >= facts.length ? " (unused by this guest)" : ""}
                </div>
                <div className={styles.fieldGrid}>
                  <NumberField
                    label="Left"
                    value={slot.left}
                    onChange={(v) => setCalloutField(i, "left", v)}
                  />
                  <NumberField
                    label="Top"
                    value={slot.top}
                    onChange={(v) => setCalloutField(i, "top", v)}
                  />
                  <NumberField
                    label="Rotate"
                    value={slot.rotate}
                    step={0.5}
                    onChange={(v) => setCalloutField(i, "rotate", v)}
                  />
                  <NumberField
                    label="Max width"
                    value={slot.maxWidth}
                    onChange={(v) => setCalloutField(i, "maxWidth", v)}
                  />
                </div>
              </div>
            ))}
            <textarea readOnly className={styles.codeBlock} value={calloutSlotsCode(calloutSlots)} />
          </div>
        </div>
        <div className={styles.panel}>
          <div className={styles.slotRowTitle}>Name bracket + stems (code preview)</div>
          <textarea
            readOnly
            className={styles.codeBlock}
            value={`${singlePathCode("NAME_BRACKET_PATH", paths.bracket)}\n\n${pathArrayCode("CALLOUT_STEM_PATHS", paths.stems)}`}
          />
        </div>
      </section>

      {/* --- relatives zone: place-cards --- */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Relative place-cards (RELATIVE_SLOTS)</h2>
        <p className={styles.sectionNote}>
          342px-wide canvas (height grows to fit); matches the relatives zone&rsquo;s coordinate
          space on phone. {guest.word} is using {relativeCards.length} of{" "}
          {relativeSlots.length} slots
          {fallbackLinks.length > 0
            ? `, plus ${fallbackLinks.length} link${fallbackLinks.length === 1 ? "" : "s"} that overflowed to plain text below`
            : ""}
          . The connector lines here aren&rsquo;t editable (see the note at the top of this
          page); the current-tag zigzag is edited separately, zoomed up, below.
        </p>
        <div className={styles.editorGrid}>
          <div className={styles.canvas} style={{ width: 342, height: 700 }}>
            <svg
              aria-hidden="true"
              viewBox="0 0 342 700"
              className={wordStyles.relativesGuides}
              style={{ height: 700 }}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <g stroke="#23306E" strokeWidth={1.4} style={{ filter: "url(#wobble)" }}>
                {relativeCards.map(({ i, pos }) => (
                  <path key={i} d={connectorPath(pos.left, pos.top)} />
                ))}
              </g>
            </svg>

            <span
              aria-current="page"
              className={`${wordStyles.placeCard} ${wordStyles.currentTag} ${eraFontClassName[guest.eraBand]}`}
            >
              {guest.word}
              <svg
                aria-hidden="true"
                viewBox="0 0 56 10"
                className={wordStyles.currentTagZigzag}
                fill="none"
                stroke="#D23A2A"
                strokeWidth={2.4}
                strokeLinejoin="round"
                strokeLinecap="round"
                style={{ filter: "url(#crayon)" }}
              >
                <path d={serializePath(paths.zigzag)} />
              </svg>
            </span>

            {relativeCards.map(({ link, i, target, pos, pointer }) => (
              <div
                key={i}
                className={`${wordStyles.relativeGroup} ${styles.draggable}`}
                style={{ left: pos.left, top: pos.top, maxWidth: pos.maxWidth }}
                {...dragHandlers(`relative-${i}`, (dx, dy) => updateRelative(i, dx, dy))}
              >
                <div
                  className={`${wordStyles.placeCard} ${eraFontClassName[target.eraBand]}`}
                  style={{ transform: `rotate(${pos.rotate}deg)` }}
                >
                  {target.word}
                </div>
                <p className={`${wordStyles.relativeCaption} ${wordStyles.pencil}`}>
                  {link.label}
                </p>
                {pointer && (
                  <div className={wordStyles.pointerLink}>{pointer.label} &rarr;</div>
                )}
              </div>
            ))}

            {fallbackLinks.map(({ link, i }, idx) => (
              <div
                key={i}
                className={wordStyles.pointerLink}
                style={{ position: "absolute", left: 50, top: fallbackTop + idx * 40 }}
              >
                {link.label} &rarr;
              </div>
            ))}
          </div>
          <div className={styles.panel}>
            {relativeSlots.map((slot, i) => (
              <div key={i} className={styles.slotRow}>
                <div className={styles.slotRowTitle}>
                  Slot {i + 1}
                  {i >= relativeCards.length ? " (unused by this guest)" : ""}
                </div>
                <div className={styles.fieldGrid}>
                  <NumberField
                    label="Left"
                    value={slot.left}
                    onChange={(v) => setRelativeField(i, "left", v)}
                  />
                  <NumberField
                    label="Top"
                    value={slot.top}
                    onChange={(v) => setRelativeField(i, "top", v)}
                  />
                  <NumberField
                    label="Rotate"
                    value={slot.rotate}
                    step={0.5}
                    onChange={(v) => setRelativeField(i, "rotate", v)}
                  />
                  <NumberField
                    label="Max width"
                    value={slot.maxWidth}
                    onChange={(v) => setRelativeField(i, "maxWidth", v)}
                  />
                </div>
              </div>
            ))}
            <textarea
              readOnly
              className={styles.codeBlock}
              value={relativeSlotsCode(relativeSlots)}
            />
          </div>
        </div>
      </section>

      {/* --- hand-drawn decorative lines (zoomed up for easier dragging) --- */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Hand-drawn lines</h2>
        <p className={styles.sectionNote}>
          These are curves, not single points &mdash; drag the filled circles (anchors) or
          hollow circles (bezier control points) to reshape them. Shown zoomed up here for
          easier dragging; the live site renders them at their normal small size. Same shape on
          every guest page, not per-guest like the callouts/relatives above.
        </p>
        <div className={styles.pathGrid}>
          <DecorativeLineEditor
            title="Gossip squiggle (GOSSIP_SQUIGGLE_PATH)"
            models={[paths.squiggle]}
            viewBoxWidth={150}
            viewBoxHeight={44}
            zoom={3}
            stroke="#D23A2A"
            strokeWidth={2.4}
            filterId="crayon"
            dragHandlers={dragHandlers}
            idPrefix="squiggle"
            onDragHandle={(_pi, si, ci, role, dx, dy) => updatePath("squiggle", si, ci, role, dx, dy)}
            codeText={singlePathCode("GOSSIP_SQUIGGLE_PATH", paths.squiggle)}
          />
          <DecorativeLineEditor
            title="Pushpin (PUSHPIN_PATHS)"
            note="4 separate strokes: head, head highlight, shaft, shaft ticks."
            models={paths.pushpin}
            viewBoxWidth={12}
            viewBoxHeight={34}
            zoom={8}
            stroke="#23306E"
            strokeWidth={1.3}
            filterId="wobble"
            dragHandlers={dragHandlers}
            idPrefix="pushpin"
            onDragHandle={(pi, si, ci, role, dx, dy) =>
              updatePathArray("pushpin", pi, si, ci, role, dx, dy)
            }
            codeText={pathArrayCode("PUSHPIN_PATHS", paths.pushpin)}
          />
          <DecorativeLineEditor
            title="Paperclip (PAPERCLIP_PATH)"
            models={[paths.paperclip]}
            viewBoxWidth={18}
            viewBoxHeight={28}
            zoom={8}
            stroke="#E8792B"
            strokeWidth={2.6}
            filterId="crayon"
            dragHandlers={dragHandlers}
            idPrefix="paperclip"
            onDragHandle={(_pi, si, ci, role, dx, dy) =>
              updatePath("paperclip", si, ci, role, dx, dy)
            }
            codeText={singlePathCode("PAPERCLIP_PATH", paths.paperclip)}
          />
          <DecorativeLineEditor
            title="Current-tag zigzag (CURRENT_TAG_ZIGZAG_PATH)"
            models={[paths.zigzag]}
            viewBoxWidth={56}
            viewBoxHeight={10}
            zoom={5}
            stroke="#D23A2A"
            strokeWidth={2.4}
            filterId="crayon"
            dragHandlers={dragHandlers}
            idPrefix="zigzag"
            onDragHandle={(_pi, si, ci, role, dx, dy) => updatePath("zigzag", si, ci, role, dx, dy)}
            codeText={singlePathCode("CURRENT_TAG_ZIGZAG_PATH", paths.zigzag)}
          />
        </div>
      </section>
    </main>
  );
}
