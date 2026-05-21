import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useStore } from '../state/store';

const ExerciseScene = () => {
  const mountRef = useRef(null);
  const { user } = useStore();
  const modelRef = useRef(null);
  const mixerRef = useRef(null);
  const clockRef = useRef(new THREE.Clock());

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a2a);
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1.2, 3);
    const renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0x404060);
    scene.add(ambient);
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(2, 3, 4);
    scene.add(dirLight);
    const backLight = new THREE.PointLight(0x00d4aa, 0.5);
    backLight.position.set(0, 1, -2);
    scene.add(backLight);

    const loader = new GLTFLoader();
    loader.load('/models/humanoid_exercise.glb', (gltf) => {
      const model = gltf.scene;
      model.scale.set(1.2, 1.2, 1.2);
      model.position.y = -0.8;
      scene.add(model);
      modelRef.current = model;
      if (gltf.animations.length) {
        mixerRef.current = new THREE.AnimationMixer(model);
        const idleAction = mixerRef.current.clipAction(gltf.animations[0]);
        idleAction.play();
      }
    }, undefined, (err) => {
      console.warn('Humanoid model not found, using capsule fallback', err);
      const geometry = new THREE.CylinderGeometry(0.4, 0.4, 1.2, 8);
      const material = new THREE.MeshStandardMaterial({ color: 0x88aaff });
      const capsule = new THREE.Mesh(geometry, material);
      capsule.position.y = -0.2;
      scene.add(capsule);
      modelRef.current = capsule;
    });

    const gridHelper = new THREE.GridHelper(10, 20, 0x00d4aa, 0x336699);
    gridHelper.position.y = -0.9;
    scene.add(gridHelper);

    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clockRef.current.getDelta();
      if (mixerRef.current) mixerRef.current.update(delta);
      if (modelRef.current) {
        const level = user?.level || 1;
        modelRef.current.position.y = -0.8 + Math.sin(Date.now() * 0.002) * 0.02;
        backLight.intensity = Math.min(0.5 + level / 20, 1.2);
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
      if (mixerRef.current) mixerRef.current.stopAllAction();
    };
  }, [user]);

  return <div ref={mountRef} className="fixed inset-0 z-0" />;
};

export default ExerciseScene;