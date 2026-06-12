export const SCENES = [
  { value: "mountains", label: "Mountains" },
  { value: "dunes", label: "Dunes" },
  { value: "twilight", label: "Twilight" },
  { value: "orb", label: "Orb" },
] as const;

export type SceneName = (typeof SCENES)[number]["value"];
