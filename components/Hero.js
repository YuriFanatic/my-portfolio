"use client";

import { useEffect, useRef } from "react";
import { site } from "@/lib/site";

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let frameId;
    let phase = 0;
    let lastTime = performance.now();

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { clientWidth, clientHeight } = canvas;
      canvas.width = clientWidth * dpr;
      canvas.height = clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    const STRIPE_COUNT = 10;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    function draw(now) {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      if (!prefersReducedMotion) {
        phase = (phase + dt * 0.12) % 1;
      }

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      const horizonY = h * 0.34;
      const centerX = w * 0.5;
      const topHalfWidth = w * 0.02;
      const bottomHalfWidth = w * 0.62;

      // Road edges converging to a vanishing point
      ctx.strokeStyle = "rgba(205, 163, 73, 0.28)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(centerX - topHalfWidth, horizonY);
      ctx.lineTo(centerX - bottomHalfWidth, h);
      ctx.moveTo(centerX + topHalfWidth, horizonY);
      ctx.lineTo(centerX + bottomHalfWidth, h);
      ctx.stroke();

      // Scrolling rumble stripes, foreshortened toward the horizon —
      // the same perspective trick the racing game demo uses.
      for (let i = 0; i < STRIPE_COUNT; i++) {
        const p = (i / STRIPE_COUNT + phase) % 1;
        const ease = p * p;
        const y = horizonY + (h - horizonY) * ease;
        const halfWidth = topHalfWidth + (bottomHalfWidth - topHalfWidth) * ease;
        const stripeH = 1 + ease * 5;
        const opacity = 0.08 + ease * 0.3;
        const isGold = i % 2 === 0;
        ctx.fillStyle = isGold
          ? `rgba(205, 163, 73, ${opacity})`
          : `rgba(243, 239, 228, ${opacity * 0.5})`;
        ctx.fillRect(centerX - halfWidth * 0.14, y, halfWidth * 0.28, stripeH);
      }

      frameId = requestAnimationFrame(draw);
    }

    frameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section id="top" className="relative overflow-hidden border-b border-border/70">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-80"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(16,30,23,0) 0%, rgba(16,30,23,0.4) 55%, rgba(16,30,23,1) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-6 pt-28 pb-24 sm:pt-36 sm:pb-32">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
          {site.name} — {site.role}
        </p>
        <h1 className="mt-5 max-w-2xl font-display text-4xl leading-[1.1] sm:text-6xl">
          I build systems you can{" "}
          <span className="italic text-gold-soft">actually play with.</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg">
          Computer Science graduate from San Francisco State, shipping
          full-stack apps with React, Node, and PostgreSQL — with a growing
          interest in applied ML. Three of my builds are live below: pull up
          a hand of poker, take a lap around the track, or talk to a chatbot
          I wired up myself.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <a
            href="#projects"
            className="rounded-full bg-gold px-6 py-3 text-sm font-medium text-bg transition-colors hover:bg-gold-soft"
          >
            See the projects
          </a>
          <a
            href={`mailto:${site.email}`}
            className="rounded-full border border-border px-6 py-3 text-sm text-text transition-colors hover:border-gold hover:text-gold"
          >
            Email me
          </a>
        </div>
      </div>
    </section>
  );
}
