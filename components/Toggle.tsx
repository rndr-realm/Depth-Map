"use client";

import { useWebHaptics } from "web-haptics/react";

/** Binary on/off switch. Thumb slides and the track recolors to indicate state. */
export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
}) {
  const { trigger } = useWebHaptics();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => {
        trigger("selection"); // light haptic on devices that support it (mobile)
        onChange(!checked);
      }}
      className={`toggle ${checked ? "toggle-on" : ""}`}
    >
      <span className="toggle-thumb" />
    </button>
  );
}
