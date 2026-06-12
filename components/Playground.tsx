"use client";

import { useState, type CSSProperties } from "react";
import { DepthCard } from "react-depth-parallax";
import { Toggle } from "./Toggle";
import { CodeBlock } from "./CodeBlock";
import { useMounted } from "./useMounted";

const scene = "twilight";

/** Controls panel → live demo stage → generated code snippet. */
export function Playground() {
  const [strength, setStrength] = useState(1.4);
  const [invert, setInvert] = useState(false);
  const [depthScale, setDepthScale] = useState(1);
  const mounted = useMounted();

  const code = `<DepthCard
  src="/image.jpg"
  depthSrc="/depth.png"
  strength={${strength.toFixed(1)}}
  invert={${invert}}
  depthScale={${depthScale.toFixed(1)}}
/>`;

  return (
    <div className="grid gap-5">
      {/* controls */}
      <div className="flex flex-col gap-5 rounded-2xl bg-bg-soft p-5">
        <div className="flex items-center justify-between">
          <span className="control-label">Invert</span>
          <Toggle checked={invert} onChange={setInvert} label="Invert depth map" />
        </div>
        <div className="flex flex-col gap-5 sm:flex-row">
          <div className="w-full sm:flex-1">
            <Slider label="Strength" value={strength} min={0} max={5} step={0.1} onChange={setStrength} />
          </div>
          <div className="hidden bg-black/10 sm:block sm:w-px sm:self-stretch" />
          <div className="w-full sm:flex-1">
            <Slider label="Depth" value={depthScale} min={0} max={3} step={0.1} onChange={setDepthScale} />
          </div>
        </div>
      </div>

      {/* demo */}
      <div className="flex justify-center">
        <div
          className="depth-frame"
          style={{ width: "min(300px, 70vw)", aspectRatio: "4 / 5" }}
        >
          {mounted && (
            <DepthCard
              key={scene}
              src={`/scenes/${scene}.jpg`}
              depthSrc={`/scenes/${scene}-depth.png`}
              strength={strength}
              invert={invert}
              depthScale={depthScale}
              style={{ width: "100%", height: "100%" }}
            />
          )}
        </div>
      </div>

      {/* generated code */}
      <CodeBlock raw={code} label="DepthCard" />
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  // Local text state so partial input ("1.") survives mid-typing; the slider
  // writes back through it too, keeping field and track in sync.
  const [text, setText] = useState(value.toFixed(1));
  const pct = ((value - min) / (max - min)) * 100;
  const clamp = (n: number) => Math.min(max, Math.max(min, n));

  return (
    <div>
      <div className="mb-2.5 flex items-center justify-between">
        <label className="control-label">{label}</label>
        <input
          className="num-input"
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            const n = parseFloat(e.target.value);
            if (!Number.isNaN(n)) onChange(clamp(n));
          }}
          onBlur={() => setText(clamp(parseFloat(text) || min).toFixed(1))}
        />
      </div>
      <input
        className="slider"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        style={{ "--fill": `${pct}%` } as CSSProperties}
        onChange={(e) => {
          onChange(+e.target.value);
          setText((+e.target.value).toFixed(1));
        }}
      />
    </div>
  );
}
