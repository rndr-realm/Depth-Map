"use client";

import { DepthCard } from "react-depth-parallax";
import { useMounted } from "./useMounted";

// Pre-cropped to the container's 590×342 aspect so it fills edge-to-edge with
// no distortion (the source is square).
const SRC = "/the-weeknd-wide.png";
const DEPTH = "/the-weeknd-wide-depth.png";

/**
 * Hero: the real depth-map parallax — a single DepthCard filling a 590×342
 * container. The WebGL canvas is full-screen and can't be clipped, so the box
 * matches the image exactly (no overflow) and .effect-panel's ::after rounds
 * the corners.
 */
export function HeroDemo() {
  const mounted = useMounted();

  return (
    <div
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
          strength={1.3}
          style={{ width: "100%", height: "100%" }}
        />
      )}
    </div>
  );
}
