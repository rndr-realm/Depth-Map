"use client";

import { useEffect, useState } from "react";

/**
 * Returns false on the first render, true after mount. Used to defer mounting
 * DepthCards by one tick so the ParallaxProvider has populated its context
 * first — otherwise each card logs a (harmless but noisy) "must be wrapped in
 * <ParallaxProvider>" error because the provider seeds its context as null and
 * only fills it in a mount effect.
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
