import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { personalInfo } from '../data/portfolioData';

const vertexShader = `
  uniform float uTime;
  uniform float uScroll;
  varying vec3 vNormal;
  varying vec3 vColor;

  float hash(vec3 p) {
    p = fract(p * vec3(443.897, 441.423, 437.195));
    p += dot(p, p.yxz + 19.19);
    return fract((p.x + p.y) * p.z);
  }
  float noise(vec3 p) {
    vec3 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i),               hash(i+vec3(1,0,0)), f.x),
          mix(hash(i+vec3(0,1,0)), hash(i+vec3(1,1,0)), f.x), f.y),
      mix(mix(hash(i+vec3(0,0,1)), hash(i+vec3(1,0,1)), f.x),
          mix(hash(i+vec3(0,1,1)), hash(i+vec3(1,1,1)), f.x), f.y), f.z
    );
  }

  void main() {
    vec3 pos = position;
    float t = uTime * 0.20;

    // Displacement reduces smoothly as sphere grows
    float blobAmt = max(0.0, 1.0 - uScroll * 1.1);
    float n = (noise(pos * 1.10 + t)         * 0.42
             + noise(pos * 2.40 - t * 1.15)  * 0.20
             + noise(pos * 5.20 + t * 0.70)  * 0.09) * blobAmt;

    vec3 peach = vec3(0.99, 0.86, 0.68);
    vec3 cream = vec3(0.953, 0.925, 0.875);
    vec3 sage  = vec3(0.60, 0.78, 0.68);
    float c1 = noise(pos * 0.85 + t * 0.42);
    float c2 = noise(pos * 1.60 - t * 0.28);
    vColor = mix(mix(peach, cream, c1), sage, c2 * 0.32);

    // Sphere expands to overfill viewport on scroll (Arsh exact signature effect)
    float expand = 1.0 + uScroll * 8.5;
    pos = pos * expand + normal * n * 0.30;

    vNormal = normalMatrix * normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform float uScroll;
  varying vec3 vNormal;
  varying vec3 vColor;

  void main() {
    float rim = pow(1.0 - dot(normalize(vNormal), vec3(0, 0, 1)), 2.2);
    vec3 peach = vec3(0.99, 0.86, 0.68);
    vec3 col = mix(vColor, peach * 1.2, rim * 0.45 * (1.0 - uScroll));
    col += 0.06;
    // Flattens completely to solid cream color (#f3ecdf) on scroll
    col = mix(col, vec3(0.953, 0.925, 0.875), min(1.0, uScroll * 1.1));
    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function IntroScreen({ onComplete }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const textRef = useRef(null);
  const cueRef = useRef(null);
  const [isDismissing, setIsDismissing] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let isDestroyed = false;
    let animId;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.z = 5;

    const geometry = new THREE.SphereGeometry(1.3, 96, 96);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uScroll: { value: 0 },
      },
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    const glowGeo = new THREE.SphereGeometry(1.46, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xffdcb0,
      transparent: true,
      opacity: 0.14,
      side: THREE.BackSide,
    });
    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    scene.add(glowMesh);

    const onResize = () => {
      if (isDestroyed) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    onResize();
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    let targetScroll = 0;
    let currentScroll = 0;
    let triggeredDismiss = false;

    const triggerDismissal = () => {
      if (triggeredDismiss) return;
      triggeredDismiss = true;
      setIsDismissing(true);

      setTimeout(() => {
        setHasCompleted(true);
        if (onComplete) onComplete();
      }, 1050);
    };

    const renderLoop = () => {
      if (isDestroyed) return;

      const elapsed = clock.getElapsedTime();
      material.uniforms.uTime.value = elapsed;
      sphere.rotation.y += 0.0018;
      sphere.rotation.x += 0.0007;

      currentScroll += (targetScroll - currentScroll) * 0.1;
      material.uniforms.uScroll.value = currentScroll;
      glowMat.opacity = Math.max(0, 0.14 * (1.0 - 2.0 * currentScroll));

      if (cueRef.current) {
        cueRef.current.style.opacity = String(Math.max(0, 1.0 - currentScroll / 0.25));
      }
      if (textRef.current) {
        textRef.current.style.opacity = String(Math.max(0, 1.0 - currentScroll / 0.25));
      }

      renderer.render(scene, camera);

      if (currentScroll >= 0.15 && !triggeredDismiss) {
        triggerDismissal();
      }

      animId = requestAnimationFrame(renderLoop);
    };
    animId = requestAnimationFrame(renderLoop);

    const onWheel = (e) => {
      if (triggeredDismiss) return;
      targetScroll = Math.min(1.0, Math.max(0.0, targetScroll + 0.0018 * e.deltaY));
      if (e.deltaY > 15) {
        targetScroll = Math.max(targetScroll, 0.2);
      }
    };

    let touchStartY = 0;
    const onTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e) => {
      if (triggeredDismiss) return;
      const t = e.touches[0].clientY;
      const diff = touchStartY - t;
      touchStartY = t;
      targetScroll = Math.min(1.0, Math.max(0.0, targetScroll + 0.0035 * diff));
      if (diff > 15) {
        targetScroll = Math.max(targetScroll, 0.2);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    return () => {
      isDestroyed = true;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);

      geometry.dispose();
      material.dispose();
      glowGeo.dispose();
      glowMat.dispose();
      renderer.dispose();
    };
  }, [onComplete]);

  if (hasCompleted) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#000000',
        overflow: 'hidden',
        cursor: 'pointer',
        willChange: 'transform',
        transform: isDismissing ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 1.05s cubic-bezier(0.77, 0, 0.175, 1)',
      }}
      onClick={() => {
        setIsDismissing(true);
        setTimeout(() => {
          setHasCompleted(true);
          if (onComplete) onComplete();
        }, 1050);
      }}
      role="banner"
      aria-label="Welcome screen"
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'block',
          width: '100%',
          height: '100%',
        }}
      />

      <div
        ref={textRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          textAlign: 'center',
          transform: 'translateY(-50%)',
          zIndex: 10,
          mixBlendMode: 'difference',
          pointerEvents: 'none',
          padding: '0 24px',
          transition: 'opacity 0.25s ease',
        }}
      >
        <h1
          style={{
            margin: 0,
            fontFamily: "'Fraunces', serif",
            fontWeight: 400,
            fontSize: 'clamp(2.2rem, 6vw, 4.8rem)',
            color: '#ffffff',
            lineHeight: 1,
            letterSpacing: '-0.01em',
          }}
        >
          {personalInfo.name}
        </h1>
        <p
          style={{
            margin: '18px 0 0',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#ffffff',
            opacity: 0.8,
          }}
        >
          {personalInfo.kicker}
        </p>
      </div>

      <div
        ref={cueRef}
        style={{
          position: 'absolute',
          bottom: '36px',
          left: 0,
          right: 0,
          textAlign: 'center',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '10px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(243, 236, 223, 0.35)',
          zIndex: 10,
          pointerEvents: 'none',
          transition: 'opacity 0.25s ease',
        }}
      >
        <p style={{ margin: '0 0 8px' }}>scroll to enter</p>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          style={{ display: 'inline-block' }}
        >
          <path
            d="M2 5l5 5 5-5"
            stroke="#e3a874"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
