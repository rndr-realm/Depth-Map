"use client";

import { ParallaxProvider } from "react-depth-parallax";
import { HeroDemo } from "@/components/HeroDemo";
import { Playground } from "@/components/Playground";
import { CodeBlock } from "@/components/CodeBlock";
import { InstallBlock } from "@/components/InstallBlock";
import { HeaderMenu } from "@/components/HeaderMenu";
import { Reveal } from "@/components/Reveal";

const NPM = "https://www.npmjs.com/package/react-depth-parallax";
const VERSION = "1.0.10";

const USAGE = `import { ParallaxProvider, DepthCard } from "react-depth-parallax";

export default function App() {
  return (
    <ParallaxProvider>
      <DepthCard src="/image.jpg" depthSrc="/depth.png" />
    </ParallaxProvider>
  );
}`;

export default function Page() {
  return (
    <ParallaxProvider>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <main id="main-content" className="mx-auto w-full max-w-[592px] px-6 pb-24">
        {/* hero */}
        <Reveal>
          <header className="pt-20 sm:pt-[140px]">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-baseline gap-2.5">
                <h1 className="display text-[18px] leading-tight">
                  depth parallax
                </h1>
                <a
                  href={NPM}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Version ${VERSION} on npm (opens in a new tab)`}
                  className="tnum -my-2 py-2 text-[13px] text-muted transition-[color,scale] duration-150 hover:text-fg active:scale-[0.96]"
                >
                  v{VERSION}
                </a>
              </div>
              <HeaderMenu />
            </div>
            <p className="mt-1.5 font-medium text-muted">
              WebGL depth-map parallax for React.
            </p>
          </header>
        </Reveal>

        {/* hero demo */}
        <Reveal delay={120}>
          <div className="mt-10">
            <HeroDemo />
          </div>
        </Reveal>

        {/* the two inputs the effect needs: the image and its depth map */}
        <Reveal delay={80}>
          <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:gap-4">
            <Preview src="/the-weeknd.png" label="Image" className="w-full sm:flex-1" />
            <span
              aria-hidden
              className="shrink-0 text-[20px] leading-none text-faint"
            >
              +
            </span>
            <Preview
              src="/the-weeknd-depth.png"
              label="Depth map"
              className="w-full sm:flex-1"
            />
          </div>
        </Reveal>

        {/* installation */}
        <Section title="Installation">
          <InstallBlock />
        </Section>

        {/* usage */}
        <Section title="Usage">
          <CodeBlock raw={USAGE} label="App.tsx" />
        </Section>

        {/* playground */}
        <Section title="Playground">
          <Playground />
        </Section>

        {/* footer */}
        <Reveal>
          <footer className="mt-12">
            <h2 className="section-title">Acknowledgements</h2>
            <p className="mt-4 text-[13px] text-muted">
              Built by{" "}
              <ExtLink href="https://x.com/rndr_realm">Rndr Realm</ExtLink>
              , from our WebGL alchemist{" "}
              <span className="avatar-hover">
                <ExtLink href="https://x.com/shawn_kel">Stephen Oyediran</ExtLink>
                <span className="avatar-card" aria-hidden>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/stephen.jpg" alt="" />
                </span>
              </span>
              .
            </p>

            <div className="rule mt-8 w-24" />

            <ol className="footnotes mt-8 flex flex-col gap-3.5 text-[12px] leading-snug tracking-normal text-faint">
              <li>
                Each card draws the parallax to its own WebGL canvas, clipped to
                the rounded frame, and only repaints while the pointer is moving —
                so it sits idle, and stays smooth, while you scroll.
              </li>
              <li>
                On phones the parallax is driven by the device gyroscope — tilt the
                screen instead of moving a cursor. Native gyro support is in the works
                for the library itself.
              </li>
              <li>
                The depth map is grayscale — brighter pixels read as nearer and shift
                more under the cursor, darker pixels sit farther back.
              </li>
              <li>
                These maps were generated from the photos with{" "}
                <ExtLink href="https://huggingface.co/spaces/cubuvl/DepthPro-transformers-Grayscale">
                  DepthPro
                </ExtLink>{" "}
                (grayscale output) — also a handy way to generate your own depth map
                from any image.
              </li>
              <li>
                The scroll-in reveals are disabled under{" "}
                <code className="note-code">prefers-reduced-motion</code>; content
                appears instantly instead of fading up.
              </li>
            </ol>
          </footer>
        </Reveal>
      </main>
    </ParallaxProvider>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <section className="mt-9">
        <h2 className="section-title">{title}</h2>
        <div className="mt-6">{children}</div>
      </section>
    </Reveal>
  );
}

function Preview({
  src,
  label,
  className = "",
}: {
  src: string;
  label: string;
  className?: string;
}) {
  return (
    <figure className={`flex flex-col gap-2.5 ${className}`}>
      <div className="overflow-hidden rounded-xl" style={{ aspectRatio: "4 / 5" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={label} className="h-full w-full object-cover" />
      </div>
      <figcaption className="text-center text-[12px] tracking-normal text-faint">
        {label}
      </figcaption>
    </figure>
  );
}

function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="link">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
