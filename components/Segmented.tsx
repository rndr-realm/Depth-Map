"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

type Box = { left: number; top: number; width: number; height: number };

/** Pill segmented control — a single indicator slides to the active option. */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pill, setPill] = useState<Box | null>(null);
  const [ready, setReady] = useState(false);

  const activeIndex = options.findIndex((o) => o.value === value);
  const activeIndexRef = useRef(activeIndex);
  activeIndexRef.current = activeIndex;

  const measure = useCallback(() => {
    const btn = btnRefs.current[activeIndexRef.current];
    if (btn) {
      setPill({
        left: btn.offsetLeft,
        top: btn.offsetTop,
        width: btn.offsetWidth,
        height: btn.offsetHeight,
      });
    }
  }, []);

  // Position before paint so the pill never animates into place on mount.
  useLayoutEffect(() => {
    measure();
  }, [activeIndex, options, measure]);

  // Enable the slide only after the first paint; re-measure on resize.
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  return (
    <div className="seg" role="radiogroup">
      {pill && (
        <span
          className="seg-pill"
          data-init={!ready}
          style={{
            transform: `translate(${pill.left}px, ${pill.top}px)`,
            width: pill.width,
            height: pill.height,
          }}
        />
      )}
      {options.map((o, i) => (
        <button
          key={o.value}
          ref={(el) => {
            btnRefs.current[i] = el;
          }}
          type="button"
          role="radio"
          aria-checked={o.value === value}
          onClick={() => {
            if (o.value === value) return;
            onChange(o.value);
          }}
          onKeyDown={(e) => {
            let next = -1;
            if (e.key === "ArrowRight" || e.key === "ArrowDown") {
              next = (i + 1) % options.length;
            } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
              next = (i - 1 + options.length) % options.length;
            }
            if (next !== -1) {
              e.preventDefault();
              onChange(options[next].value);
              btnRefs.current[next]?.focus();
            }
          }}
          tabIndex={o.value === value ? 0 : -1}
          className={`seg-btn ${value === o.value ? "seg-active" : ""}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
