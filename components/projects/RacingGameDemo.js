"use client";

import { useEffect, useRef } from "react";

// elevation: -1 (downhill) to 1 (uphill), 0 = flat
const TRACK = [
  { curvature: 0, length: 200, elevation: 0 },
  { curvature: 1, length: 300, elevation: 0 },
  { curvature: 0, length: 400, elevation: 1 },
  { curvature: -1, length: 100, elevation: 0 },
  { curvature: 0, length: 200, elevation: -1 },
  { curvature: -1, length: 100, elevation: 0 },
  { curvature: 1, length: 100, elevation: 0 },
  { curvature: 0, length: 200, elevation: 0 },
];
const TOTAL_TRACK_DISTANCE = TRACK.reduce((sum, section) => sum + section.length, 0);

// Horizon shifts as one unit with elevation; any scale is safe from
// row gaps/crossing -- this just caps how far it can move.
const ELEVATION_SCALE = 0.2;

// Mountain silhouettes: x/h as fractions of canvas width / layer
// height. x runs outside [0,1] so a ridge still covers the full
// width once shifted.
const MOUNTAIN_PEAKS_FAR = [
  { x: -0.35, h: 0.15 },
  { x: 0.0, h: 0.4 },
  { x: 0.12, h: 0.22 },
  { x: 0.26, h: 0.5 },
  { x: 0.38, h: 0.2 },
  { x: 0.5, h: 0.34 },
  { x: 0.63, h: 0.46 },
  { x: 0.76, h: 0.24 },
  { x: 0.89, h: 0.42 },
  { x: 1.0, h: 0.22 },
  { x: 1.35, h: 0.3 },
];
const MOUNTAIN_PEAKS_NEAR = [
  { x: -0.5, h: 0.3 },
  { x: 0.05, h: 0.65 },
  { x: 0.22, h: 0.35 },
  { x: 0.4, h: 0.55 },
  { x: 0.58, h: 0.25 },
  { x: 0.75, h: 0.6 },
  { x: 0.9, h: 0.32 },
  { x: 1.05, h: 0.5 },
  { x: 1.5, h: 0.28 },
];

// onPreviewChange is part of the shared demo-embed prop contract (see
// ProjectsSection.js / FullscreenCarousel.js) but unused here -- the
// racing game reports its own preview via onFrame instead.
export default function RacingGameDemo({ active = true, fill = false, onFrame, onPreviewChange }) {
  const canvasRef = useRef(null);
  const activeRef = useRef(active);
  const onFrameRef = useRef(onFrame);
  const stateRef = useRef({
    carSpeed: 0,
    trackCurvature: 0,
    trackElevation: 0,
    playerCurvature: 0,
    distanceTravelled: 0,
    keys: { up: false, left: false, right: false },
  });

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    onFrameRef.current = onFrame;
  }, [onFrame]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const s = stateRef.current;
    let raf;
    let last = performance.now();
    let lastSnapshot = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    const ARROW_KEYS = ["ArrowUp", "ArrowLeft", "ArrowRight", "ArrowDown"];

    function onKeyDown(e) {
      if (!activeRef.current) return;
      if (document.activeElement !== canvas) return;
      if (ARROW_KEYS.includes(e.key)) e.preventDefault();
      if (e.key === "ArrowUp") s.keys.up = true;
      if (e.key === "ArrowLeft") s.keys.left = true;
      if (e.key === "ArrowRight") s.keys.right = true;
    }
    function onKeyUp(e) {
      if (e.key === "ArrowUp") s.keys.up = false;
      if (e.key === "ArrowLeft") s.keys.left = false;
      if (e.key === "ArrowRight") s.keys.right = false;
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    function onBlur() {
      s.keys.up = false;
      s.keys.left = false;
      s.keys.right = false;
    }
    canvas.addEventListener("blur", onBlur);

    function update(elapsedTime) {
      if (s.keys.up) s.carSpeed += 0.1;
      else s.carSpeed -= 0.01;

      if (s.carSpeed < 0) s.carSpeed = 0;
      if (s.carSpeed > 1) s.carSpeed = 1;

      const steeringFactor = 0.005;
      if (s.keys.left) s.playerCurvature -= steeringFactor;
      if (s.keys.right) s.playerCurvature += steeringFactor;

      s.distanceTravelled += s.carSpeed * 200 * elapsedTime;
      if (s.distanceTravelled >= TOTAL_TRACK_DISTANCE) {
        s.distanceTravelled -= TOTAL_TRACK_DISTANCE;
      }

      let offset = 0;
      let currentTrackSection = 0;
      while (currentTrackSection < TRACK.length && offset <= s.distanceTravelled) {
        offset += TRACK[currentTrackSection].length;
        currentTrackSection++;
      }

      const targetCurvature = TRACK[currentTrackSection - 1].curvature;
      s.trackCurvature += (targetCurvature - s.trackCurvature) * elapsedTime * s.carSpeed;

      const targetElevation = TRACK[currentTrackSection - 1].elevation;
      s.trackElevation += (targetElevation - s.trackElevation) * elapsedTime * s.carSpeed;

      // slows down on grass
      if (Math.abs(s.playerCurvature - s.trackCurvature) >= 0.7) {
        s.carSpeed -= 0.2;
        if (s.carSpeed < 0) s.carSpeed = 0;
      }
    }

    // One mountain layer. Shifts horizontally with curvature (parallax
    // controls how fast). Base runs to the bottom of the canvas, not
    // just to horizonY, so a shrunken ground area on an uphill never
    // exposes bare sky under the ridge.
    function drawMountains(w, h, horizonY, peaks, parallax, maxHeight, color) {
      const shiftX = -s.trackCurvature * parallax;
      const firstX = peaks[0].x * w + shiftX;
      const lastX = peaks[peaks.length - 1].x * w + shiftX;

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(firstX, h);
      ctx.lineTo(firstX, horizonY - peaks[0].h * maxHeight);
      for (const peak of peaks) {
        ctx.lineTo(peak.x * w + shiftX, horizonY - peak.h * maxHeight);
      }
      ctx.lineTo(lastX, h);
      ctx.closePath();
      ctx.fill();
    }

    function drawCar(w, h) {
      const carW = Math.min(w * 0.09, 44);
      const carH = carW * 0.5;
      const carX = w / 2 - carW / 2 + (s.playerCurvature - s.trackCurvature) * w * 0.5;
      const carY = h - carH - Math.max(6, h * 0.04);
      const lean = s.keys.left ? -1 : s.keys.right ? 1 : 0;

      ctx.save();
      ctx.translate(carX + carW / 2, carY + carH / 2);
      ctx.rotate(lean * 0.08);
      ctx.fillStyle = "#cda349";
      ctx.beginPath();
      ctx.roundRect(-carW / 2, -carH / 2, carW, carH, carH * 0.3);
      ctx.fill();
      ctx.fillStyle = "#3a2f1a";
      ctx.beginPath();
      ctx.roundRect(-carW * 0.28, -carH * 0.32, carW * 0.56, carH * 0.4, carH * 0.15);
      ctx.fill();
      ctx.restore();
    }

    function draw() {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      // Redraw from scratch each frame -- rows move with elevation,
      // so without a full clear old pixels would linger as ghosts.
      ctx.clearRect(0, 0, w, h);

      // Rounded to a whole pixel: a fractional horizonY makes every
      // 1px row straddle two physical pixel rows, and since the
      // canvas starts transparent, the antialiased edges of adjacent
      // rows don't fully composite back to opaque -- a flicker as
      // trackElevation eases through fractional values.
      const horizonY = Math.round(h / 2 + s.trackElevation * (h * ELEVATION_SCALE));
      const groundHeight = h - horizonY;

      const skyGradient = ctx.createLinearGradient(0, 0, 0, horizonY);
      skyGradient.addColorStop(0, "indianred");
      skyGradient.addColorStop(1, "lightpink");
      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, w, horizonY);

      // Sun and mountains sit at a fixed sky height -- only the road
      // itself should rise/fall with elevation.
      const skyAnchorY = h / 2;

      const sunX = w / 2 - s.trackCurvature * (w / 20);
      const sunY = h * 0.32;
      ctx.fillStyle = "gold";
      ctx.beginPath();
      ctx.arc(sunX, sunY, Math.min(w, h) * 0.1, 0, Math.PI * 2);
      ctx.fill();

      drawMountains(w, h, skyAnchorY, MOUNTAIN_PEAKS_FAR, w / 8, h * 0.48, "#7a5c74");
      drawMountains(w, h, skyAnchorY, MOUNTAIN_PEAKS_NEAR, w / 3, h * 0.29, "#5c4560");

      for (let y = 0; y < groundHeight; y++) {
        const perspective = y / groundHeight;
        const roadWidth = (0.1 + perspective * 0.6) * 0.5;

        const middle = 0.5 + s.trackCurvature * Math.pow(1.0 - perspective, 3);
        const leftGrass = (middle - roadWidth * 1.2) * w;
        const rightGrass = (middle + roadWidth * 1.2) * w;
        const roadLeft = (middle - roadWidth) * w;
        const roadRight = (middle + roadWidth) * w;

        const rowY = horizonY + y;

        // Alternating grass bands, wider apart the closer they are.
        const grassFrequency = 20 * Math.pow(1 - perspective, 3);
        const grassColor =
          Math.sin(grassFrequency + s.distanceTravelled * 0.1) > 0 ? "green" : "darkgreen";
        ctx.fillStyle = grassColor;
        ctx.fillRect(0, rowY, leftGrass, 1);
        ctx.fillRect(rightGrass, rowY, w - rightGrass, 1);

        const rumbleWidth = 4 * (1 + perspective * 7);
        ctx.fillStyle =
          Math.sin(grassFrequency + s.distanceTravelled * 0.3) > 0 ? "red" : "white";
        ctx.fillRect(roadLeft - rumbleWidth, rowY, rumbleWidth, 1);
        ctx.fillRect(roadRight, rowY, rumbleWidth, 1);

        ctx.fillStyle = "grey";
        ctx.fillRect(roadLeft, rowY, roadRight - roadLeft, 1);
      }

      drawCar(w, h);
    }

    function loop(now) {
      if (!activeRef.current) {
        raf = requestAnimationFrame(loop);
        last = now;
        return;
      }
      const elapsedTime = Math.min((now - last) / 1000, 0.05);
      last = now;
      update(elapsedTime);
      draw();

      if (onFrameRef.current && now - lastSnapshot > 200) {
        lastSnapshot = now;
        onFrameRef.current(canvas.toDataURL("image/jpeg", 0.5));
      }

      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      canvas.removeEventListener("blur", onBlur);
    };
  }, []);

  function setControl(key, held) {
    stateRef.current.keys[key] = held;
  }

  return (
    <div
      className={
        fill
          ? "relative flex h-full w-full flex-col overflow-hidden"
          : "relative overflow-hidden rounded-xl border border-border"
      }
    >
      <canvas
        ref={canvasRef}
        tabIndex={0}
        className={
          fill
            ? "min-h-0 flex-1 w-full touch-none outline-none"
            : "h-72 w-full touch-none outline-none sm:h-80"
        }
      />

      <div className="flex items-center justify-between border-t border-border bg-surface-2 px-4 py-2">
        <span className="font-mono text-xs text-text-muted">
          Click the game, then use arrow keys to drive!
        </span>
        <div className="flex gap-2 sm:hidden">
          <button
            type="button"
            onPointerDown={() => setControl("left", true)}
            onPointerUp={() => setControl("left", false)}
            onPointerLeave={() => setControl("left", false)}
            className="rounded-full border border-border px-4 py-1.5 text-sm text-text active:bg-surface"
            aria-label="Steer left"
          >
            ←
          </button>
          <button
            type="button"
            onPointerDown={() => setControl("up", true)}
            onPointerUp={() => setControl("up", false)}
            onPointerLeave={() => setControl("up", false)}
            className="rounded-full border border-border px-4 py-1.5 text-sm text-text active:bg-surface"
            aria-label="Accelerate"
          >
            ↑
          </button>
          <button
            type="button"
            onPointerDown={() => setControl("right", true)}
            onPointerUp={() => setControl("right", false)}
            onPointerLeave={() => setControl("right", false)}
            className="rounded-full border border-border px-4 py-1.5 text-sm text-text active:bg-surface"
            aria-label="Steer right"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
