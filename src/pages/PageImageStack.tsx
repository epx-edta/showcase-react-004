import { ImageStack } from '../components/ImageStack';

export const PageImageStack = () => {
  const images = [
    '/images/sunset_mountains.png',
    '/images/forest_path.png',
    '/images/ocean_waves.png',
  ];

  return (
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
          <ImageStack pathAndFileNames={images} />
        </div>
    </div>
  );
};