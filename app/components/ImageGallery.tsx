"use client";
import React, { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';

interface ImageData {
  id: number;
  webformatURL: string;
}
const ImageGallery  = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [page, setPage] = useState(1);

    useEffect(() => {
      fetchImages();
    }, [page]); 
    
    const fetchImages = async () => {
      const apiKey = '43003817-5333e0e4f3c66f6765e525f97';
      const perPage = 15;
      const apiURL = `https://pixabay.com/api/?key=${apiKey}&orientation=vetical&per_page=${perPage}`;

      try {
        const response = await fetch(apiURL);
        const data = await response.json();
        setImages(prevImages => [...prevImages, ...data.hits]);
      } catch (error) {
        console.error('Error al obtener las imágenes:', error);
      }
    };

  const lastImage = useMemo(() => images[images.length - 1], [images]);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <div className="columns-4 gap-5 w-[1200px] mx-auto space-y-3 pb-28">
        {images.map(image => (
          <div key={image.id} className='rounded-lg overflow-hidden hover:opacity-50 transition-opacity duration-300'>
            <Image
              src={image.webformatURL}
              alt={`Image ${image.id}`} 
              width={400}
              height={400}
            />
          </div>
        ))}
      </div>
    </div>
  );
}  
export default ImageGallery;