import { CopyButton } from "./CopyButton";
import { highlight } from "./highlight";

/**
 * A code surface with a copy button. `raw` is rendered through the lightweight
 * highlighter. `label` is an optional filename badge.
 */
export function CodeBlock({ raw, label }: { raw: string; label?: string }) {
  return (
    <div className="code-block">
      <div className="code-bar">
        <span className="code-label">{label}</span>
        <CopyButton text={raw} label="Copy code" />
      </div>
      <pre className="code-pre">
        <code className="code">{highlight(raw)}</code>
      </pre>
    </div>
  );
}
