"use client";

/**
 * HeroVisual — "Digital Product Ecosystem"
 *
 * Node positions are calculated via Math.cos / Math.sin inside
 * useAnimationFrame and written directly to a DOM ref (no React state).
 * This eliminates the counter-rotation drift that plagued the previous
 * rotate + counter-rotate approach (whose root cause was the counter-orbit
 * div rotating around its own misaligned center).
 *
 * Labels are never rotated — they always render upright because the position
 * div moves while the content div stays orientation-neutral.
 */

import { useState, useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useAnimationFrame,
} from "framer-motion";

// ── Constants ────────────────────────────────────────────────────────────────

const CANVAS = 480;          // SVG viewBox — all orbit radii are in these units
const CENTER = CANVAS / 2;   // 240
const NODE_D = 34;           // node circle diameter (px)
const NODE_R = NODE_D / 2;   // 17 — subtracted from left/top to center the node

const ORBIT_RINGS = [
  { r: 85,  color: "#22d3ee", opacity: 0.22 },
  { r: 135, color: "#22d3ee", opacity: 0.16 },
  { r: 185, color: "#818cf8", opacity: 0.14 },
] as const;

const NODES = [
  { id: "ai",   label: "AI",    orbitR: 85,  startAngleDeg: 280, duration: 11, color: "#22d3ee" },
  { id: "web",  label: "Web",   orbitR: 135, startAngleDeg:  40, duration: 19, color: "#22d3ee" },
  { id: "saas", label: "SaaS",  orbitR: 135, startAngleDeg: 220, duration: 19, color: "#818cf8" },
  { id: "uiux", label: "UI/UX", orbitR: 185, startAngleDeg: 130, duration: 31, color: "#818cf8" },
] as const;

const PARTICLES = [
  { x: "13%", y: "17%", r: 1.5, delay: 0.0 },
  { x: "83%", y: "11%", r: 2.0, delay: 1.3 },
  { x: "77%", y: "79%", r: 1.5, delay: 0.7 },
  { x: "17%", y: "73%", r: 2.0, delay: 1.9 },
  { x: "57%", y:  "7%", r: 1.5, delay: 2.4 },
  { x: "89%", y: "47%", r: 1.5, delay: 0.5 },
  { x:  "7%", y: "44%", r: 2.0, delay: 1.6 },
];

// ── OrbitNode ────────────────────────────────────────────────────────────────

function OrbitNode({
  orbitR,
  startAngleDeg,
  duration,
  color,
  label,
}: {
  orbitR: number;
  startAngleDeg: number;
  duration: number;
  color: string;
  label: string;
}) {
  const [hovered, setHovered] = useState(false);

  // The wrapper div is positioned absolutely. We update its left/top directly
  // via a ref — no React re-renders, no Framer transforms on this element.
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Set the correct starting position before the first animation frame fires
  // so there's no flicker.
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const a   = (startAngleDeg * Math.PI) / 180;
    const xPct = 50 + (Math.cos(a) * orbitR / CANVAS) * 100;
    const yPct = 50 + (Math.sin(a) * orbitR / CANVAS) * 100;
    el.style.left = `${xPct}%`;
    el.style.top  = `${yPct}%`;
  }, [orbitR, startAngleDeg]);

  useAnimationFrame((t) => {
    const el = wrapperRef.current;
    if (!el) return;
    // t = ms elapsed since mount; angle advances from startAngle continuously.
    const a   = (startAngleDeg * Math.PI) / 180 + (t / (duration * 1000)) * Math.PI * 2;
    const xPct = 50 + (Math.cos(a) * orbitR / CANVAS) * 100;
    const yPct = 50 + (Math.sin(a) * orbitR / CANVAS) * 100;
    el.style.left = `${xPct}%`;
    el.style.top  = `${yPct}%`;
  });

  return (
    // Position wrapper — moved by useAnimationFrame, never rotated
    <div
      ref={wrapperRef}
      style={{
        position:    "absolute",
        marginLeft:  -NODE_R,
        marginTop:   -NODE_R,
        pointerEvents: "none",
      }}
    >
      {/* Content — Framer Motion only for hover scale */}
      <motion.div
        className="flex flex-col items-center cursor-pointer"
        style={{
          gap:             5,
          pointerEvents:   "auto",
          transformOrigin: `${NODE_R}px ${NODE_R}px`,
        }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        animate={{ scale: hovered ? 1.3 : 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 20 }}
      >
        {/* Node circle */}
        <div
          style={{
            width:         NODE_D,
            height:        NODE_D,
            borderRadius:  "50%",
            background:    "rgba(6,13,26,0.92)",
            border:        `1px solid ${color}${hovered ? "95" : "55"}`,
            boxShadow:     hovered
              ? `0 0 18px 6px ${color}38, inset 0 0 10px ${color}15`
              : `0 0 7px 1px ${color}22`,
            display:       "flex",
            alignItems:    "center",
            justifyContent:"center",
            transition:    "border-color 0.25s, box-shadow 0.25s",
          }}
        >
          <div
            style={{
              width:       7,
              height:      7,
              borderRadius:"50%",
              background:  color,
              boxShadow:   `0 0 8px 3px ${color}55`,
              opacity:     hovered ? 1 : 0.8,
              transition:  "opacity 0.2s",
            }}
          />
        </div>

        {/* Label — always upright, never rotated */}
        <span
          style={{
            fontSize:       9,
            fontWeight:     700,
            letterSpacing:  "0.18em",
            textTransform:  "uppercase",
            whiteSpace:     "nowrap",
            color,
            opacity:        hovered ? 1 : 0.65,
            textShadow:     hovered ? `0 0 12px ${color}80` : "none",
            transition:     "opacity 0.2s, text-shadow 0.25s",
          }}
        >
          {label}
        </span>
      </motion.div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function HeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const tiltX  = useTransform(mouseY, [-1, 1], [ 5, -5]);
  const tiltY  = useTransform(mouseX, [-1, 1], [-5,  5]);
  const shiftX = useTransform(mouseX, [-1, 1], [-8,  8]);
  const shiftY = useTransform(mouseY, [-1, 1], [-8,  8]);

  const cfg = { stiffness: 55, damping: 22 };
  const sTiltX  = useSpring(tiltX,  cfg);
  const sTiltY  = useSpring(tiltY,  cfg);
  const sShiftX = useSpring(shiftX, cfg);
  const sShiftY = useSpring(shiftY, cfg);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = containerRef.current?.getBoundingClientRect();
    if (!r) return;
    mouseX.set((e.clientX - r.left  - r.width  / 2) / (r.width  / 2));
    mouseY.set((e.clientY - r.top   - r.height / 2) / (r.height / 2));
  }
  function onMouseLeave() { mouseX.set(0); mouseY.set(0); }

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square max-w-[480px] mx-auto select-none"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      aria-hidden="true"
    >
      {/* Blueprint grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,211,238,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px",
        }}
      />

      {/* Parallax + tilt scene */}
      <motion.div
        className="relative w-full h-full"
        style={{
          rotateX: sTiltX,
          rotateY: sTiltY,
          x: sShiftX,
          y: sShiftY,
          transformPerspective: 900,
        }}
      >
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(34,211,238,0.07) 0%, transparent 68%)",
          }}
        />

        {/* SVG: all-solid orbit rings */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={`0 0 ${CANVAS} ${CANVAS}`}
          fill="none"
        >
          {/* Centre crosshair */}
          <line x1={CENTER} y1={CENTER-13} x2={CENTER} y2={CENTER-5}
            stroke="#22d3ee" strokeWidth="0.6" strokeOpacity="0.3" />
          <line x1={CENTER} y1={CENTER+5}  x2={CENTER} y2={CENTER+13}
            stroke="#22d3ee" strokeWidth="0.6" strokeOpacity="0.3" />
          <line x1={CENTER-13} y1={CENTER} x2={CENTER-5} y2={CENTER}
            stroke="#22d3ee" strokeWidth="0.6" strokeOpacity="0.3" />
          <line x1={CENTER+5}  y1={CENTER} x2={CENTER+13} y2={CENTER}
            stroke="#22d3ee" strokeWidth="0.6" strokeOpacity="0.3" />

          {/* Solid orbit rings */}
          {ORBIT_RINGS.map(({ r, color, opacity }) => (
            <circle
              key={r}
              cx={CENTER} cy={CENTER} r={r}
              stroke={color}
              strokeWidth="0.7"
              strokeOpacity={opacity}
            />
          ))}

          {/* Cardinal tick marks on inner ring */}
          {[0, 90, 180, 270].map((deg) => {
            const a  = (deg * Math.PI) / 180;
            const cx = CENTER + 85 * Math.cos(a);
            const cy = CENTER + 85 * Math.sin(a);
            const dx = 3 * Math.cos(a);
            const dy = 3 * Math.sin(a);
            return (
              <line key={deg}
                x1={cx-dx} y1={cy-dy} x2={cx+dx} y2={cy+dy}
                stroke="#22d3ee" strokeWidth="1" strokeOpacity="0.4"
              />
            );
          })}
        </svg>

        {/* Central sphere */}
        <motion.div
          className="absolute inset-0 m-auto rounded-full"
          style={{ width: 64, height: 64 }}
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className="relative w-full h-full rounded-full"
            style={{
              background:
                "radial-gradient(circle at 34% 28%, #a5f3fc, #22d3ee 46%, #0891b2 82%)",
              boxShadow:
                "0 0 28px 8px rgba(34,211,238,0.28), 0 0 56px 22px rgba(34,211,238,0.08)",
            }}
          >
            <div className="absolute top-[13%] left-[20%] w-[34%] h-[24%] rounded-full bg-white/35 blur-[3px]" />
          </div>
        </motion.div>

        {/* Orbiting nodes — positioned via useAnimationFrame + DOM ref */}
        {NODES.map((node) => (
          <OrbitNode key={node.id} {...node} />
        ))}

        {/* Ambient data particles */}
        {PARTICLES.map(({ x, y, r, delay }) => (
          <motion.div
            key={`${x}-${y}`}
            className="absolute rounded-full pointer-events-none"
            style={{ left: x, top: y, width: r * 2, height: r * 2, background: "#22d3ee" }}
            animate={{ y: [-6, 6, -6], opacity: [0.2, 0.6, 0.2] }}
            transition={{
              duration: 2.8 + delay * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
