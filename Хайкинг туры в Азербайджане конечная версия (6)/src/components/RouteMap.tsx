import { useEffect, useRef } from 'react';

interface Coordinate {
  lat: number;
  lng: number;
}

interface RouteMapProps {
  coordinates: Coordinate[];
}

export function RouteMap({ coordinates }: RouteMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || coordinates.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate bounds
    const lats = coordinates.map(c => c.lat);
    const lngs = coordinates.map(c => c.lng);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    const padding = 40;
    const width = canvas.width - padding * 2;
    const height = canvas.height - padding * 2;

    // Convert coordinates to canvas positions
    const toCanvasPos = (coord: Coordinate) => {
      const x = padding + ((coord.lng - minLng) / (maxLng - minLng)) * width;
      const y = padding + height - ((coord.lat - minLat) / (maxLat - minLat)) * height;
      return { x, y };
    };

    const points = coordinates.map(toCanvasPos);

    // Draw background terrain effect
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#f0fdf4');
    gradient.addColorStop(1, '#dcfce7');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
      const x = padding + (width / 10) * i;
      const y = padding + (height / 10) * i;
      
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, canvas.height - padding);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(canvas.width - padding, y);
      ctx.stroke();
    }

    // Draw route path
    ctx.strokeStyle = '#059669';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    points.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });
    ctx.stroke();

    // Draw dashed line to show elevation
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 1;
    points.forEach((point, index) => {
      if (index > 0) {
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(point.x, canvas.height - padding);
        ctx.stroke();
      }
    });
    ctx.setLineDash([]);

    // Draw waypoints
    points.forEach((point, index) => {
      const isStart = index === 0;
      const isEnd = index === points.length - 1;
      
      // Outer circle
      ctx.fillStyle = isStart ? '#10b981' : isEnd ? '#ef4444' : '#3b82f6';
      ctx.beginPath();
      ctx.arc(point.x, point.y, 8, 0, Math.PI * 2);
      ctx.fill();
      
      // Inner circle
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
      ctx.fill();
      
      // Label
      ctx.fillStyle = '#1f2937';
      ctx.font = '12px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      
      if (isStart) {
        ctx.fillText('Старт', point.x, point.y - 12);
      } else if (isEnd) {
        ctx.fillText('Финиш', point.x, point.y - 12);
      } else {
        ctx.fillText(`${index}`, point.x, point.y - 12);
      }
    });

    // Draw compass
    const compassX = canvas.width - 50;
    const compassY = 50;
    
    ctx.strokeStyle = '#64748b';
    ctx.fillStyle = '#64748b';
    ctx.lineWidth = 2;
    
    // Circle
    ctx.beginPath();
    ctx.arc(compassX, compassY, 25, 0, Math.PI * 2);
    ctx.stroke();
    
    // North arrow
    ctx.beginPath();
    ctx.moveTo(compassX, compassY - 20);
    ctx.lineTo(compassX - 5, compassY);
    ctx.lineTo(compassX + 5, compassY);
    ctx.closePath();
    ctx.fill();
    
    // N label
    ctx.font = 'bold 12px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('N', compassX, compassY - 28);

  }, [coordinates]);

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={400}
      className="w-full h-auto rounded-lg border border-slate-200"
    />
  );
}
