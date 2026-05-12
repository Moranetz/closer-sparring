"use client";

import type { Session } from "./types";

const STORAGE_KEY = "closer-sparring:sessions:v0.1";

function readAll(): Session[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Session[];
  } catch {
    return [];
  }
}

function writeAll(sessions: Session[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

export function listSessions(): Session[] {
  return readAll().sort((a, b) => b.startedAt - a.startedAt);
}

export function getSession(id: string): Session | undefined {
  return readAll().find((s) => s.id === id);
}

export function saveSession(session: Session) {
  const all = readAll();
  const idx = all.findIndex((s) => s.id === session.id);
  if (idx === -1) all.push(session);
  else all[idx] = session;
  writeAll(all);
}

export function deleteSession(id: string) {
  writeAll(readAll().filter((s) => s.id !== id));
}

export function newSessionId(): string {
  return (
    Date.now().toString(36) +
    Math.random().toString(36).slice(2, 8)
  );
}
