// Snow.js
import React, { useRef, useEffect } from 'react';

const Snow = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const flakes = [];

    function Flake() {
      this.x = Math.random() * canvas.width;
      this.y = 0;
      this.size = Math.random() * 3; // Adjust size range for larger snowflakes
      this.speed = Math.random() * 1;
      this.opacity = Math.random() * 0.5 + 0.3;
    }

    Flake.prototype.update = function () {
      this.y += this.speed;

      if (this.y > canvas.height) {
        this.y = 0;
        this.x = Math.random() * canvas.width;
      }
    };

    Flake.prototype.draw = function () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
      ctx.fill();
    };

    function createFlakes() {
      for (let i = 0; i < 150; i++) {
        flakes.push(new Flake());
      }
    }

    function drawFlakes() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      flakes.forEach(flake => {
        flake.update();
        flake.draw();
      });
      animationFrameId = requestAnimationFrame(drawFlakes);
    }

    createFlakes();
    drawFlakes();

    // Resize canvas when window is resized
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999, // Adjust the z-index as needed
        pointerEvents: 'none', // Make the canvas ignore pointer events
      }}
    />
  );
};

export default Snow;
