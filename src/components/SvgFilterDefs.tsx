// The four hand-drawn SVG filters from docs/mockups (wobble, pencil, crayon,
// crumple). Rendered once per page; other elements reference them by
// `filter: url(#name)`. Exact feTurbulence/feDisplacementMap parameters are
// copied from docs/mockups/Desktop-WordA2.html, the highest-fidelity export.
export function SvgFilterDefs() {
  return (
    <svg aria-hidden="true" width="0" height="0" style={{ position: "absolute" }}>
      <defs>
        <filter id="wobble" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves={2} seed={4} result="w" />
          <feDisplacementMap in="SourceGraphic" in2="w" scale={5} xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="pencil" x="-5%" y="-10%" width="110%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves={2} seed={8} result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -1.8 0 0 0 1.45" result="m" />
          <feComposite in="SourceGraphic" in2="m" operator="in" result="t" />
          <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves={1} seed={2} result="d" />
          <feDisplacementMap in="t" in2="d" scale={1.2} xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="crayon" x="-10%" y="-20%" width="120%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves={2} seed={5} result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -2 0 0 0 1.6" result="m" />
          <feComposite in="SourceGraphic" in2="m" operator="in" result="t" />
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves={2} seed={9} result="d" />
          <feDisplacementMap in="t" in2="d" scale={3} xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="crumple" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.006" numOctaves={4} seed={7} />
          <feDiffuseLighting lightingColor="#ffffff" surfaceScale={2.4}>
            <feDistantLight azimuth={225} elevation={58} />
          </feDiffuseLighting>
        </filter>
      </defs>
    </svg>
  );
}

export function CrumpleOverlay({ opacity = 0.3 }: { opacity?: number }) {
  return (
    <svg
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        mixBlendMode: "multiply",
        width: "100vw",
        height: "100vh",
      }}
      preserveAspectRatio="none"
    >
      <rect width="100%" height="100%" filter="url(#crumple)" opacity={opacity} />
    </svg>
  );
}
