export function Cube({ size, x, y }: { size: number; x: number; y: number }) {
    return (
      <div 
        className="absolute border border-gray-700"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${x}px`,
          top: `${y}px`,
        }}
      />
    )
  }
  