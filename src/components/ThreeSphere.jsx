import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec3 vNormal;
  varying vec3 vPosition;

  float hash(vec3 p) {
    p = fract(p * vec3(443.897, 441.423, 437.195));
    p += dot(p, p.yxz + 19.19);
    return fract((p.x + p.y) * p.z);
  }
  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i),               hash(i + vec3(1,0,0)), f.x),
          mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
      mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
          mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z
    );
  }

  void main() {
    vNormal = normal;
    vPosition = position;
    vec3 pos = position;
    float t = uTime * 0.25;

    float n = noise(pos * 1.15 + t) * 0.38
            + noise(pos * 2.2 - t * 0.4) * 0.16;

    pos += normal * (n * 0.35);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(-vPosition);
    float fresnel = pow(1.0 - max(0.0, dot(normal, viewDir)), 2.6);

    vec3 baseColor = vec3(0.07, 0.06, 0.05);
    vec3 emberColor = vec3(0.89, 0.66, 0.45);
    vec3 highlight = vec3(1.0, 0.94, 0.86);

    float light = dot(normal, normalize(vec3(0.8, 1.2, 1.8))) * 0.5 + 0.5;
    vec3 color = mix(baseColor, emberColor, light * 0.5);
    color += emberColor * fresnel * 1.2;
    color += highlight * pow(fresnel, 3.8) * 0.65;

    gl_FragColor = vec4(color, 0.88);
  }
`;

export default function ThreeSphere() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let isDestroyed = false;
    let animId;
    let isVisible = true;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Optimized 56x56 resolution for 60-120 FPS buttery smooth performance
    const geometry = new THREE.SphereGeometry(1.4, 56, 56);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
      },
      transparent: true,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Halo ring
    const glowGeo = new THREE.SphereGeometry(1.54, 30, 30);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xe3a874,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    scene.add(glowMesh);

    // Pause when off-screen to avoid lag
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.05 });
    observer.observe(container);

    const clock = new THREE.Clock();
    const animate = () => {
      if (isDestroyed) return;

      if (isVisible) {
        const elapsed = clock.getElapsedTime();
        material.uniforms.uTime.value = elapsed;
        sphere.rotation.y = elapsed * 0.11;
        sphere.rotation.x = elapsed * 0.07;
        glowMesh.rotation.y = -elapsed * 0.05;
        renderer.render(scene, camera);
      }

      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    const onResize = () => {
      if (isDestroyed || !container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      isDestroyed = true;
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener('resize', onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      glowGeo.dispose();
      glowMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="pf-hero-shader-canvas" />;
}
