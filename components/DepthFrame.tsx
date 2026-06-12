"use client";

import { DepthCard } from "react-depth-parallax";
import { useMounted } from "./useMounted";

/**
 * A framed parallax card. The image is painted by the provider's shared canvas
 * behind this transparent box; we add the edge outline + lift shadow via the
 * .depth-frame class. `aspect` keeps the box at the scenes' native 4:5.
 */
export function DepthFrame({
  name,
  className = "",
  width,
  strength = 1,
  depthScale = 1,
  smoothing = 10,
}: {
  name: string;
  className?: string;
  width?: number;
  strength?: number;
  depthScale?: number;
  smoothing?: number;
}) {
  const mounted = useMounted();
  return (
    <div
      className={`depth-frame ${className}`}
      style={{ width, aspectRatio: "4 / 5" }}
    >
      {mounted && (
        <DepthCard
          src={`/scenes/${name}.jpg`}
          depthSrc={`/scenes/${name}-depth.png`}
          strength={strength}
          depthScale={depthScale}
          smoothing={smoothing}
          style={{ width: "100%", height: "100%" }}
        />
      )}
    </div>
  );
}
