"use client";

import { useState } from "react";
import { Segmented } from "./Segmented";
import { CopyButton } from "./CopyButton";

type PM = "npm" | "pnpm" | "yarn" | "bun";

const PKG = "react-depth-parallax";
const COMMAND: Record<PM, string> = {
  npm: `npm install ${PKG}`,
  pnpm: `pnpm add ${PKG}`,
  yarn: `yarn add ${PKG}`,
  bun: `bun add ${PKG}`,
};
const OPTIONS: { value: PM; label: string }[] = [
  { value: "npm", label: "npm" },
  { value: "pnpm", label: "pnpm" },
  { value: "yarn", label: "yarn" },
  { value: "bun", label: "bun" },
];

/** Install command with a package-manager selector (npm / pnpm / yarn / bun). */
export function InstallBlock() {
  const [pm, setPm] = useState<PM>("npm");
  const command = COMMAND[pm];

  return (
    <div className="overflow-hidden rounded-lg bg-bg-soft/50">
      <div className="flex items-center justify-between gap-2 p-2">
        <Segmented options={OPTIONS} value={pm} onChange={setPm} />
        <CopyButton text={command} label="Copy install command" />
      </div>
      <div className="h-px bg-line" />
      <code className="code block truncate px-4 py-3.5 text-[12px] text-muted">
        $ {command}
      </code>
    </div>
  );
}
