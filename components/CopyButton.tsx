"use client";

import { useEffect, useRef, useState } from "react";
import { playClick } from "./sounds";

/**
 * Copy-to-clipboard button. Copy/check icons cross-fade (both kept in the DOM,
 * one absolutely positioned) with the exact opacity/scale/blur values from the
 * polish guidelines — no motion dependency. Scale-on-press at 0.96.
 */
export function CopyButton({
  text,
  label = "Copy",
}: {
  text: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => void (timer.current && clearTimeout(timer.current)), []);

  async function onCopy() {
    playClick();
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* clipboard blocked — still flash the confirmation */
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={copied ? "Copied" : label}
      className="copy-btn"
    >
      <span className="copy-icons" aria-hidden>
        <Icon show={!copied}>
          {/* copy */}
          <rect x="9" y="9" width="11" height="11" rx="2.5" />
          <path d="M5 15V5a2 2 0 0 1 2-2h8" />
        </Icon>
        <Icon show={copied}>
          {/* check */}
          <path d="M4 12.5 9 17.5 20 6.5" />
        </Icon>
      </span>
    </button>
  );
}

function Icon({ show, children }: { show: boolean; children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        position: "absolute",
        inset: 0,
        margin: "auto",
        opacity: show ? 1 : 0,
        scale: show ? "1" : "0.25",
        filter: show ? "blur(0px)" : "blur(4px)",
        transition:
          "opacity 0.3s cubic-bezier(0.2,0,0,1), scale 0.3s cubic-bezier(0.2,0,0,1), filter 0.3s cubic-bezier(0.2,0,0,1)",
      }}
    >
      {children}
    </svg>
  );
}
