// Three.js Sunset Scene - Simplified Version
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.136.0/build/three.min.js';

// Initialize the scene when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if browser supports WebGL
    function isWebGLAvailable() {
        try {
            const canvas = document.createElement('canvas');
            return !!(window.WebGLRenderingContext && 
                (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        } catch (e) {
            return false;
        }
    }
    
    // Show warning if WebGL is not available
    if (!isWebGLAvailable()) {
        const container = document.getElementById('sunset-scene');
        if (container) {
            container.innerHTML = '<div style="text-align: center; padding: 50px;">Your browser does not support WebGL, which is required for 3D animations.</div>';
        }
        return;
    }
    
    // Only initialize if the container exists
    const container = document.getElementById('sunset-scene');
    if (!container) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 1.5, 4);
    camera.lookAt(0, 1, 0);
    
    // Create renderer with lower quality settings for better performance
    const renderer = new THREE.WebGLRenderer({ 
        antialias: false,
        alpha: true,
        precision: 'lowp'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(1); // Force 1:1 pixel ratio for better performance
    container.appendChild(renderer.domElement);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
    
    // Create sunset sky gradient
    scene.background = new THREE.Color('#9d4e3c');
    
    // Create the ground plane - simpler version
    const groundGeometry = new THREE.PlaneGeometry(30, 30);
    const groundMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x1a0e07,
        side: THREE.DoubleSide
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = Math.PI / 2;
    ground.position.y = -0.5;
    scene.add(ground);
    
    // Create sun - simpler version
    const sunGeometry = new THREE.CircleGeometry(1.5, 16); // Reduced segments
    const sunMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xff7e47,
        transparent: true,
        opacity: 0.8
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.set(0, 1.5, -15);
    scene.add(sun);
    
    // Animation loop - simplified with lower frame rate
    function animate() {
        // Render the scene
        renderer.render(scene, camera);
        
        // Call animate again on the next frame with timeout to reduce frame rate
        setTimeout(() => {
            requestAnimationFrame(animate);
        }, 1000 / 30); // Target 30fps instead of 60fps
    }
    
    animate();
}); 