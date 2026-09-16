import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Fully 3D Rich Beige / Champagne Architectural Silk Mesh
const beigeVertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying float vElevation;

  // Simplex 3D Noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  float getElevation(vec2 p, float t) {
    float e = snoise(vec3(p.x * 0.32, p.y * 0.32, t * 0.35)) * 1.05;
    e += snoise(vec3(p.x * 0.65, p.y * 0.65, t * 0.55)) * 0.45;
    e += snoise(vec3(p.x * 1.30, p.y * 1.30, t * 0.75)) * 0.18;
    return e;
  }

  void main() {
    vUv = uv;
    vec3 pos = position;
    float t = uTime * 0.28;

    // 3D elevation
    float elevation = getElevation(pos.xy, t);
    pos.z += elevation * 1.25;

    // Analytical normal calculation for true 3D lighting
    float delta = 0.04;
    float eX = getElevation(pos.xy + vec2(delta, 0.0), t);
    float eY = getElevation(pos.xy + vec2(0.0, delta), t);
    vec3 normalCalc = normalize(vec3(-(eX - elevation) / delta, -(eY - elevation) / delta, 1.0));

    vElevation = elevation;
    vNormal = normalMatrix * normalCalc;
    vec4 worldPos = modelMatrix * vec4(pos, 1.0);
    vWorldPos = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const beigeFragmentShader = `
  uniform float uTime;
  uniform vec3 uLightPos;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying float vElevation;

  float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
  }

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(cameraPosition - vWorldPos);
    vec3 lightDir = normalize(uLightPos - vWorldPos);
    vec3 halfDir = normalize(lightDir + viewDir);

    // Rich luxury beige / warm champagne palette
    vec3 deepShadow  = vec3(0.12, 0.10, 0.08);   // Dark espresso shadow (#1f1a14)
    vec3 warmStone   = vec3(0.42, 0.35, 0.28);   // Warm umber midtone
    vec3 richBeige   = vec3(0.84, 0.75, 0.64);   // Rich champagne beige (#d6bfa3)
    vec3 softIvory   = vec3(0.96, 0.92, 0.85);   // Soft ivory highlight (#f5ebd9)
    vec3 goldenGlow  = vec3(0.92, 0.72, 0.48);   // Warm caramel accent

    // Diffuse lighting
    float NdotL = max(0.0, dot(normal, lightDir));
    float diff = smoothstep(0.05, 0.85, NdotL);

    // Specular highlight for satin / 3D silk sheen
    float spec = pow(max(0.0, dot(normal, halfDir)), 28.0) * 0.45;

    // Fresnel rim glow
    float fresnel = pow(1.0 - max(0.0, dot(normal, viewDir)), 2.5) * 0.35;

    // Elevation gradient
    float normElev = (vElevation + 1.2) * 0.42;

    // Layered color blending
    vec3 col = mix(deepShadow, warmStone, smoothstep(0.0, 0.38, normElev));
    col = mix(col, richBeige, smoothstep(0.30, 0.75, normElev));
    col = mix(col, softIvory, smoothstep(0.68, 1.15, normElev));

    // Apply 3D lighting
    col *= (0.45 + 0.55 * diff);
    col += goldenGlow * spec;
    col += softIvory * fresnel;

    // Subtle film grain for tactile texture
    float grain = (rand(vUv * 400.0 + fract(uTime * 0.1)) - 0.5) * 0.04;
    col += grain;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function HeroBackground() {
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
    camera.position.set(0, -0.4, 4.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // 3D Sculpted plane geometry
    const geometry = new THREE.PlaneGeometry(13, 10.5, 110, 110);
    const material = new THREE.ShaderMaterial({
      vertexShader: beigeVertexShader,
      fragmentShader: beigeFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uLightPos: { value: new THREE.Vector3(2.5, 3.5, 4.0) },
      },
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI * 0.16; // Dramatic 3D perspective angle
    scene.add(mesh);

    // Smooth mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = -0.4;

    const onMouseMove = (e) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      targetCameraX = normX * 0.45;
      targetCameraY = -0.4 + normY * 0.25;
      material.uniforms.uLightPos.value.x = 2.5 + normX * 2.0;
      material.uniforms.uLightPos.value.y = 3.5 + normY * 2.0;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Pause rendering when offscreen
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

        // Smooth camera lerp for full 3D parallax
        camera.position.x += (targetCameraX - camera.position.x) * 0.04;
        camera.position.y += (targetCameraY - camera.position.y) * 0.04;
        camera.lookAt(0, 0, 0);

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
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="pf-hero-shader-canvas" />;
}
