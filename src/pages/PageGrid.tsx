export const PageGrid = () => {
  const boxes = [
    { id: 1, color: 'bg-red-500' },
    { id: 2, color: 'bg-blue-500' },
    { id: 3, color: 'bg-green-500' },
    { id: 4, color: 'bg-yellow-500' },
    { id: 5, color: 'bg-purple-500' },
    { id: 6, color: 'bg-pink-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {boxes.map((box) => (
          <div
            key={box.id}
            className={`${box.color} h-40 rounded-lg shadow-lg flex items-center justify-center text-white text-2xl font-bold`}
          >
            {box.id}
          </div>
        ))}
      </div>
    </div>
  );
}