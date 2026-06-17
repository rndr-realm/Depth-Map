"use client";

import { useCallback, useRef, useState } from "react";
import { playClick } from "./sounds";

const GITHUB = "https://github.com/rndr-realm/react-depth-parallax";
const X = "https://x.com/rndr_realm";
const NPM = "https://www.npmjs.com/package/react-depth-parallax";
const INSTALL = "npm install react-depth-parallax";
const AI_QUERY =
  "Tell me about react-depth-parallax — a lightweight WebGL depth-map parallax effect for React: " +
  GITHUB;
const CHATGPT = "https://chatgpt.com/?q=" + encodeURIComponent(AI_QUERY);
const CLAUDE = "https://claude.ai/new?q=" + encodeURIComponent(AI_QUERY);

/** Header "…" overflow menu: external links + actions. */
export function HeaderMenu() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const panelCallbackRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      const first = node.querySelector<HTMLElement>('[role="menuitem"]');
      first?.focus();
    }
  }, []);

  function onPanelBlur(e: React.FocusEvent) {
    const panel = e.currentTarget;
    if (!panel.contains(e.relatedTarget) && e.relatedTarget !== triggerRef.current) {
      setOpen(false);
    }
  }

  function onPanelKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      setOpen(false);
      triggerRef.current?.focus();
    }
  }

  async function copyInstall() {
    playClick();
    try {
      await navigator.clipboard.writeText(INSTALL);
    } catch {
      /* clipboard blocked — still flash confirmation */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className="menu">
      <button
        ref={triggerRef}
        type="button"
        className={`menu-trigger${open ? " is-open" : ""}`}
        aria-label="More links and actions"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
          <circle cx="3" cy="8" r="1.4" />
          <circle cx="8" cy="8" r="1.4" />
          <circle cx="13" cy="8" r="1.4" />
        </svg>
      </button>

      <div
        ref={open ? panelCallbackRef : undefined}
        className="menu-panel"
        role="menu"
        data-open={open}
        aria-hidden={!open}
        onBlur={onPanelBlur}
        onKeyDown={onPanelKeyDown}
      >
        <MenuLink href={GITHUB} onSelect={() => setOpen(false)}>
          GitHub
        </MenuLink>
        <MenuLink href={X} onSelect={() => setOpen(false)}>
          X (Twitter)
        </MenuLink>
        <MenuLink href={NPM} onSelect={() => setOpen(false)}>
          NPM
        </MenuLink>

        <div className="menu-sep" />

        <button type="button" role="menuitem" className="menu-item" onClick={copyInstall}>
          {copied ? "Copied!" : "Copy install command"}
        </button>

        <div className="menu-sep" />

        <MenuLink href={CHATGPT} onSelect={() => setOpen(false)}>
          Open in ChatGPT
        </MenuLink>
        <MenuLink href={CLAUDE} onSelect={() => setOpen(false)}>
          Open in Claude
        </MenuLink>
      </div>
    </div>
  );
}

function MenuLink({
  href,
  onSelect,
  children,
}: {
  href: string;
  onSelect: () => void;
  children: React.ReactNode;
}) {
  return (
    <a
      role="menuitem"
      className="menu-item"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onSelect}
    >
      {children}
    </a>
  );
}
