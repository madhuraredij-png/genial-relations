import { GuestSchema, type Guest } from "./schemas/guest";
import { TableSchema, type Table } from "./schemas/table";

import kindred from "@/data/guests/kindred.json";
import kind from "@/data/guests/kind.json";
import king from "@/data/guests/king.json";
import gentle from "@/data/guests/gentle.json";
import benign from "@/data/guests/benign.json";
import malign from "@/data/guests/malign.json";
import nature from "@/data/guests/nature.json";
import engine from "@/data/guests/engine.json";
import genius from "@/data/guests/genius.json";
import genial from "@/data/guests/genial.json";
import ingenious from "@/data/guests/ingenious.json";
import ingenuous from "@/data/guests/ingenuous.json";
import genteel from "@/data/guests/genteel.json";
import jaunty from "@/data/guests/jaunty.json";
import generous from "@/data/guests/generous.json";
import naive from "@/data/guests/naive.json";
import puny from "@/data/guests/puny.json";
import kindergarten from "@/data/guests/kindergarten.json";
import krissKringle from "@/data/guests/kriss-kringle.json";
import gene from "@/data/guests/gene.json";
import wunderkind from "@/data/guests/wunderkind.json";
import genie from "@/data/guests/genie.json";
import germ from "@/data/guests/germ.json";
import gingerly from "@/data/guests/gingerly.json";
import pregnant from "@/data/guests/pregnant.json";

import headTable from "@/data/tables/head-table.json";
import oldMoney from "@/data/tables/old-money.json";
import academics from "@/data/tables/academics.json";
import backWithAnAccent from "@/data/tables/back-with-an-accent.json";
import kidsTable from "@/data/tables/kids-table.json";

const rawGuests = [
  kindred, kind, king, gentle, benign, malign, nature, engine, genius,
  genial, ingenious, ingenuous, genteel, jaunty, generous, naive, puny,
  kindergarten, krissKringle, gene, wunderkind, genie, germ, gingerly,
  pregnant,
];

const rawTables = [headTable, oldMoney, academics, backWithAnAccent, kidsTable];

// Every JSON file is parsed through its Zod schema here, at module load time,
// so a malformed field fails the Next.js build rather than failing silently at render.
const guests: Guest[] = rawGuests.map((g) => GuestSchema.parse(g));
const tables: Table[] = rawTables.map((t) => TableSchema.parse(t));

export function getAllGuestSlugs(): string[] {
  return guests.map((g) => g.slug);
}

export function getGuest(slug: string): Guest | undefined {
  return guests.find((g) => g.slug === slug);
}

export function getAllTableSlugs(): string[] {
  return tables.map((t) => t.slug);
}

export function getTable(slug: string): Table | undefined {
  return tables.find((t) => t.slug === slug);
}

export function getAllTables(): Table[] {
  return tables;
}
