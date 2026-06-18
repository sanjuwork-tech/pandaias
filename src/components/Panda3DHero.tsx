import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import pandaTextureSrc from "../../assets/panda.png";

export default function Panda3DHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Create Scene, Camera, and Renderer
    const scene = new THREE.Scene();
    
    // Transparent background to show the underlying layout grid
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // 2. Load Texture
    const textureLoader = new THREE.TextureLoader();
    const pandaTexture = textureLoader.load(pandaTextureSrc, (tex) => {
      // Configure texture filtering for sharp high-quality display
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
    });

    // 3. Create 3D Card Mesh (BoxGeometry with small thickness)
    const geometry = new THREE.BoxGeometry(3.2, 3.2, 0.08);

    // Array of materials (Right, Left, Top, Bottom, Front, Back)
    // Front face (index 4) gets the panda texture
    const sideMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xf3f4f6, // Slate 100 tone
      roughness: 0.2, 
      metalness: 0.1 
    });
    
    const frontMaterial = new THREE.MeshStandardMaterial({ 
      map: pandaTexture,
      roughness: 0.3,
      metalness: 0.0,
      transparent: true
    });

    const materials = [
      sideMaterial, // Right
      sideMaterial, // Left
      sideMaterial, // Top
      sideMaterial, // Bottom
      frontMaterial, // Front
      sideMaterial  // Back
    ];

    const card = new THREE.Mesh(geometry, materials);
    scene.add(card);

    // 4. Add Lights for Depth and Specular Highlights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(2, 3, 5);
    scene.add(dirLight);

    // Soft backlight for visual lift
    const backLight = new THREE.DirectionalLight(0xfdf2f8, 1.5); // Warm pink/white glow
    backLight.position.set(-2, -3, -4);
    scene.add(backLight);

    // 5. Interactive Mouse Parallax state
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      // Map mouse coordinates to range [-1, 1]
      mouseX = (x / rect.width) * 2 - 1;
      mouseY = -(y / rect.height) * 2 + 1;

      // Set target rotation limits (max 30 degrees / 0.52 radians)
      targetRotationY = mouseX * 0.45;
      targetRotationX = -mouseY * 0.45;
    };

    const handleMouseLeave = () => {
      // Return smoothly to center when cursor leaves
      targetRotationX = 0;
      targetRotationY = 0;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    // 6. Animation Loop
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Gentle vertical floating (sinusoidal wave)
      card.position.y = Math.sin(elapsedTime * 1.5) * 0.12;

      // Smooth easing (Lerp) toward target mouse rotations
      card.rotation.x += (targetRotationX - card.rotation.x) * 0.08;
      card.rotation.y += (targetRotationY - card.rotation.y) * 0.08;

      // Subtle breath rotation
      card.rotation.z = Math.sin(elapsedTime * 0.8) * 0.015;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 7. Handle Window Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // 8. Garbage Collection and Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose Three.js objects to prevent GPU memory leaks
      geometry.dispose();
      sideMaterial.dispose();
      frontMaterial.dispose();
      pandaTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center"
      aria-label="Interactive 3D Panda Badge"
      role="img"
    />
  );
}
