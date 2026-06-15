"use client";

import { useEffect, useRef, useState } from "react";
import { DepthCard } from "react-depth-parallax";
import { useMounted } from "./useMounted";

// Pre-cropped to the container's 590×342 aspect so it fills edge-to-edge with
// no distortion (the source is square).
const SRC = "/the-weeknd-wide.png";
const DEPTH = "/the-weeknd-wide-depth.png";

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

/**
 * Hero: the real depth-map parallax filling a 590×342 (aspect-ratio) container.
 * On desktop it follows the cursor (the library's own pointermove). On touch
 * devices, pointer input is disabled (no jitter, page scrolls through it) and
 * the parallax is driven by the device gyroscope instead — tilt the phone.
 */
export function HeroDemo() {
  const mounted = useMounted();
  const panelRef = useRef<HTMLDivElement>(null);
  const [coarse, setCoarse] = useState(false);

  // detect touch / coarse-pointer devices (mobile)
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const update = () => setCoarse(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // gyroscope-driven parallax on mobile (in place of touch)
  useEffect(() => {
    if (!coarse || !mounted) return;
    const panel = panelRef.current;
    if (!panel) return;

    const onOrient = (e: DeviceOrientationEvent) => {
      const card = panel.firstElementChild as HTMLElement | null;
      if (!card) return;
      const nx = clamp((e.gamma ?? 0) / 28, -0.5, 0.5); // left-right tilt
      const ny = clamp(((e.beta ?? 0) - 45) / 28, -0.5, 0.5); // front-back, neutral ~45°
      const r = card.getBoundingClientRect();
      // drive the library's pointermove handler with a synthetic event
      card.dispatchEvent(
        new PointerEvent("pointermove", {
          clientX: r.left + (0.5 + nx) * r.width,
          clientY: r.top + (0.5 + ny) * r.height,
          bubbles: true,
        }),
      );
    };

    const DOE = window.DeviceOrientationEvent as
      | (typeof DeviceOrientationEvent & { requestPermission?: () => Promise<string> })
      | undefined;

    let cleanupTap: (() => void) | undefined;

    if (DOE && typeof DOE.requestPermission === "function") {
      // iOS 13+ needs a user gesture to grant motion access
      const onTap = async () => {
        try {
          if ((await DOE.requestPermission!()) === "granted") {
            window.addEventListener("deviceorientation", onOrient);
          }
        } catch {
          /* denied — hero stays still */
        }
      };
      window.addEventListener("touchend", onTap, { once: true });
      cleanupTap = () => window.removeEventListener("touchend", onTap);
    } else {
      window.addEventListener("deviceorientation", onOrient);
    }

    return () => {
      window.removeEventListener("deviceorientation", onOrient);
      cleanupTap?.();
    };
  }, [coarse, mounted]);

  return (
    <div
      ref={panelRef}
      className="effect-panel"
      style={{
        width: 590,
        maxWidth: "100%",
        aspectRatio: "590 / 342",
        marginInline: "auto",
      }}
    >
      {mounted && (
        <DepthCard
          src={SRC}
          depthSrc={DEPTH}
          strength={2.2}
          style={{
            width: "100%",
            height: "100%",
            // mobile: ignore touch (no flutter, scroll passes through) — gyro drives it
            pointerEvents: coarse ? "none" : undefined,
          }}
        />
      )}
    </div>
  );
}
