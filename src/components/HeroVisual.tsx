"use client";

import { motion } from "framer-motion";

/**
 * Abstract 3D / spline-inspired hero visual.
 *
 * ── TO EMBED A SPLINE 3D SCENE ──────────────────────────────────────────────
 *  1. npm install @splinetool/react-spline
 *  2. Add 'use client' (already present)
 *  3. Replace this component's return with:
 *
 *     import Spline from '@splinetool/react-spline'
 *     return (
 *       <div className="w-full h-full">
 *         <Spline scene="https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode" />
 *       </div>
 *     )
 *
 * ── TO USE REACT THREE FIBER INSTEAD ────────────────────────────────────────
 *  1. npm install @react-three/fiber @react-three/drei three
 *  2. Replace return with a <Canvas> component and your scene
 * ────────────────────────────────────────────────────────────────────────────
 */
export default function HeroVisual() {
  return (
    <div className="relative w-full h-full min-h-[460px] overflow-hidden rounded-2xl">
      {/* Perspective grid */}
      <div
        className="absolute inset-0 opacity-25 animate-grid"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,211,238,0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.12) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      {/* Outer ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(34,211,238,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Rotating outer ring */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full border border-primary/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      />

      {/* Rotating dashed ring */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full border border-dashed border-accent/15"
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      />

      {/* Central pulsing orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.45) 0%, rgba(34,211,238,0.1) 55%, transparent 70%)",
          boxShadow: "0 0 60px 20px rgba(34,211,238,0.12)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      {/* Inner core dot */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary"
        style={{ boxShadow: "0 0 16px 6px rgba(34,211,238,0.5)" }}
        aria-hidden="true"
      />

      {/* SVG spline curves + nodes */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 480 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Curve 1 — broad sweep bottom-left to top-right */}
        <motion.path
          d="M 30 400 C 100 300 200 230 280 195 S 400 140 450 80"
          stroke="rgba(34,211,238,0.35)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut", delay: 0.3 }}
        />

        {/* Curve 2 — counter sweep */}
        <motion.path
          d="M 450 400 C 380 310 290 270 200 240 S 90 190 30 140"
          stroke="rgba(129,140,248,0.25)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut", delay: 0.8 }}
        />

        {/* Curve 3 — vertical sweep */}
        <motion.path
          d="M 240 30 C 260 120 300 200 275 290 S 230 380 255 450"
          stroke="rgba(34,211,238,0.18)"
          strokeWidth="1"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 1.2 }}
        />

        {/* Control point nodes — appear after curves are drawn */}
        {[
          { cx: 280, cy: 195, r: 5, color: "rgba(34,211,238,0.9)", delay: 1.4 },
          { cx: 200, cy: 240, r: 4, color: "rgba(34,211,238,0.7)", delay: 1.6 },
          { cx: 100, cy: 300, r: 3.5, color: "rgba(129,140,248,0.8)", delay: 1.8 },
          { cx: 390, cy: 170, r: 3, color: "rgba(34,211,238,0.6)", delay: 2.0 },
          { cx: 160, cy: 360, r: 2.5, color: "rgba(129,140,248,0.6)", delay: 2.1 },
        ].map(({ cx, cy, r, color, delay }) => (
          <motion.circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r={r}
            fill={color}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.35, delay, ease: "backOut" }}
          />
        ))}
      </svg>

      {/* Floating orbs */}
      <motion.div
        className="absolute top-[18%] right-[22%] w-3 h-3 rounded-full bg-primary/70 blur-[2px]"
        animate={{ y: [-10, 10, -10], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-[28%] left-[18%] w-2 h-2 rounded-full bg-accent/70 blur-[1px]"
        animate={{ y: [10, -10, 10], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute top-[55%] right-[12%] w-1.5 h-1.5 rounded-full bg-primary/50"
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        aria-hidden="true"
      />

      {/* Corner accent glow */}
      <div
        className="absolute bottom-0 left-0 w-48 h-48 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(129,140,248,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
