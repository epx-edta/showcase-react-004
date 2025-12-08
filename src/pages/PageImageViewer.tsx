import { ImageViewer } from '../components/ImageViewer';

export const PageImageViewer = () => {
  const images = [
    '/images/pageImageStack/image001.png',
    '/images/pageImageStack/image002.png',
    '/images/pageImageStack/image003.png',
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
        <ImageViewer pathAndFileNames={images} />
      </div>
    </div>
  );
};