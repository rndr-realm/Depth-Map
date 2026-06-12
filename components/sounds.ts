import { defineSound } from "@web-kits/audio";

/**
 * Click sound — the "drawer open" sound from Raphael Salaja's `core` pack
 * (@web-kits/audio registry): a quick 350→1000 Hz sine sweep. Inlined so there's
 * no runtime fetch. The Web Audio context is created lazily on first play.
 */
export const playClick = defineSound({
  source: { type: "sine", frequency: { start: 350, end: 1000 } },
  envelope: { attack: 0, decay: 0.1, sustain: 0, release: 0.03 },
  gain: 0.08,
});
