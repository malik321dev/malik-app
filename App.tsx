import React, { useState, useCallback } from 'react';
import ImageGeneratorForm from './components/ImageGeneratorForm';
import ImageGrid from './components/ImageGrid';
import { generateBulkImages } from './services/geminiService';
import type { GenerationOptions } from './types';

const App: React.FC = () => {
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateImages = useCallback(async (options: GenerationOptions) => {
    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);

    try {
      const images = await generateBulkImages(options);
      setGeneratedImages(images);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`Failed to generate images: ${err.message}`);
      } else {
        setError('An unknown error occurred.');
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <div className="container mx-auto p-4 md:p-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600">
            Imagen Bulk Image Generator
          </h1>
          <p className="mt-2 text-lg text-gray-400">
            Create stunning visuals in batches with the power of Imagen 3.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 xl:col-span-3">
            <ImageGeneratorForm
              onSubmit={handleGenerateImages}
              isLoading={isLoading}
            />
          </div>
          <div className="lg:col-span-8 xl:col-span-9">
            <ImageGrid
              images={generatedImages}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
