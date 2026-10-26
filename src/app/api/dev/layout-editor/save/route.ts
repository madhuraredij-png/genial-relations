// Dev-only save endpoint for /dev/layout-editor. Writes whatever JSON the
// editor posts to a local scratch file (.layout-editor-save.json, gitignored)
// so Claude can read it directly and write the real code change — no
// copy/paste, per CLAUDE.md's "no backend in v1" this is guarded to only do
// anything during local development: in a production build/deployment this
// route returns 404 and never touches the filesystem, so it's never a live,
// reachable write endpoint on the deployed site.
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const SAVE_PATH = path.join(process.cwd(), ".layout-editor-save.json");

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return new NextResponse(null, { status: 404 });
  }
  const body = await request.json();
  await writeFile(SAVE_PATH, JSON.stringify(body, null, 2), "utf-8");
  return NextResponse.json({ ok: true, savedTo: SAVE_PATH });
}
