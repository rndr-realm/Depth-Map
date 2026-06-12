import { Fragment, type ReactNode } from "react";

// Tiny JS/JSX tokeniser — enough for the snippets on this page. Maps to the
// .c/.k/.s/.t/.p colour classes in globals.css. Every character is consumed by
// one of the alternatives (the final group is a catch-all) so nothing is lost.
const KEYWORDS = new Set([
  "import",
  "from",
  "export",
  "default",
  "function",
  "return",
  "const",
  "let",
]);

const TOKEN =
  /(\/\/[^\n]*)|("[^"]*"|'[^']*')|(\d[\d.]*)|([A-Za-z_$][\w$]*)|(\s+)|([^\sA-Za-z0-9_$"']+)/g;

function tokenizeLine(line: string): ReactNode[] {
  const out: ReactNode[] = [];
  let m: RegExpExecArray | null;
  let i = 0;
  TOKEN.lastIndex = 0;
  while ((m = TOKEN.exec(line))) {
    const key = i++;
    if (m[1]) out.push(<span className="c" key={key}>{m[1]}</span>); // comment
    else if (m[2]) out.push(<span className="s" key={key}>{m[2]}</span>); // string
    else if (m[3]) out.push(<Fragment key={key}>{m[3]}</Fragment>); // number
    else if (m[4]) {
      const w = m[4];
      if (KEYWORDS.has(w)) out.push(<span className="k" key={key}>{w}</span>);
      else if (/^[A-Z]/.test(w)) out.push(<span className="t" key={key}>{w}</span>);
      else out.push(<Fragment key={key}>{w}</Fragment>);
    } else if (m[5]) out.push(<Fragment key={key}>{m[5]}</Fragment>); // whitespace
    else out.push(<span className="p" key={key}>{m[0]}</span>); // punctuation
  }
  return out;
}

export function highlight(code: string): ReactNode {
  return code.split("\n").map((line, i) => (
    <div key={i}>{line ? tokenizeLine(line) : " "}</div>
  ));
}
