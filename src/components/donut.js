import React, { useEffect, useRef } from 'react';

const Donut = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const { sin, cos, sqrt, pow, round, ceil, PI } = Math;
    
    const rotatePoint = (x, y, z, angleX, angleY, angleZ) => {
      const cosY = cos(angleY), cosZ = cos(angleZ), cosX = cos(angleX);
      const sinZ = sin(angleZ), sinX = sin(angleX), sinY = sin(angleY);
      const sinXsinY = sinX * sinY, cosXsinY = cosX * sinY;
      
      return [
        x * cosY * cosZ + y * (-sinXsinY * cosZ + cosX * sinZ) + z * (cosXsinY * cosZ + sinX * sinZ),
        -x * cosY * sinZ + y * (sinXsinY * sinZ + cosX * cosZ) + z * (-cosXsinY * sinZ + sinX * cosZ),
        -x * sinY - y * sinX * cosY + z * cosX * cosY
      ];
    };
    
    const createMatrix = (w, h) => {
      const matrix = [];
      while(h--) {
        matrix.push(new Array(w).fill(0));
      }
      return matrix;
    };
    
    const width = 450, height = 410;
    canvas.width = width;
    canvas.height = height;
    
    const PI2 = PI/2;
    const charSize = 15;
    const charSpacing = charSize * 0.55;
    let angleX = 0, angleY = 0, angleZ = PI/3;
    
    const zBuffer = createMatrix(ceil(width/charSpacing), ceil(height/charSize));
    const output = createMatrix(ceil(width/charSpacing), ceil(height/charSize));
    
    const draw = () => {
      // Clear buffers
      for(let y = 0; y < zBuffer.length; y++) {
        for(let x = 0; x < zBuffer[0].length; x++) {
          zBuffer[y][x] = 0;
          output[y][x] = 0;
        }
      }
      
      // Render the donut
      let phi = 2 * PI;
      while(phi > 0) {
        let theta = 2 * PI;
        while(theta > 0) {
          // Donut coordinates
          const r1 = 80; // Donut radius
          const r2 = 40;  // Tube radius
          
          // Calculate 3D coordinates of the donut
          const [x, y, z] = rotatePoint(
            (r1 + r2 * cos(phi)) * cos(theta) / 2,
            (r1 + r2 * cos(phi)) * sin(theta) / 2,
            r2 * sin(phi) / 2,
            angleX, angleY, angleZ
          );
          
          // Calculate normal vector for lighting
          const [nx, ny, nz] = rotatePoint(
            cos(phi) * cos(theta),
            cos(phi) * sin(theta),
            sin(phi),
            angleX, angleY, angleZ
          );
          
          // Calculate distance and luminance
          const dist = 1 / sqrt(pow(120 - x, 2) + pow(0 - y, 2) + pow(0 - z, 2));
          const luminance = nx * cos(PI2/2) * cos(PI/3) + ny * cos(PI2/2) * sin(PI/3) + nz * sin(PI2/2);
          
          // Project 3D to 2D
          const screenX = round((220 + (y * 350) / (120 - x)) / charSpacing);
          const screenY = round((210 - (z * 350) / (120 - x)) / charSize);
          
          // Z-buffer check
          if (screenY >= 0 && screenY < zBuffer.length && screenX >= 0 && screenX < zBuffer[0].length) {
            if (zBuffer[screenY][screenX] < dist) {
              zBuffer[screenY][screenX] = dist;
              output[screenY][screenX] = (luminance + 1) / 2;
            }
          }
          
          theta -= PI * 2 / 60;
        }
        phi -= PI * 2 / 150;
      }
      
      // Update angles for animation
      angleX += 0.01;
      angleY += 0;
      angleZ += 0.01;
      
      // Render to canvas
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, width, height);
      
      for(let y = 0; y < output.length; y++) {
        for(let x = 0; x < output[0].length; x++) {
          const luminance = output[y][x];
          if (luminance > 0) {
            ctx.font = `bold ${charSize}px Consolas`;
            ctx.fillStyle = 'white';
            const chars = ".,~;=*$%#@";
            ctx.fillText(chars[round(luminance * (chars.length - 1))], x * charSpacing, y * charSize);
          }
        }
      }
    };
    
    const intervalId = setInterval(draw, 50/3);
    
    return () => clearInterval(intervalId);
  }, []);

  return <canvas ref={canvasRef} className="donut-canvas" style={{ width: '100%', maxHeight: '100%', display: 'block', margin: '0 auto 0', overflow: 'hidden' }} />;
};

export default Donut;
