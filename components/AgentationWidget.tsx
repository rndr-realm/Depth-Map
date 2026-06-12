"use client";

import { Agentation } from "agentation";

/**
 * Client wrapper for the Agentation feedback toolbar. Kept in its own client
 * component so the `onSessionCreated` callback isn't passed across the
 * server→client boundary from the (server) root layout.
 */
export function AgentationWidget() {
  return (
    <Agentation
      endpoint="http://localhost:4747"
      onSessionCreated={(sessionId) => {
        console.log("Session started:", sessionId);
      }}
    />
  );
}
