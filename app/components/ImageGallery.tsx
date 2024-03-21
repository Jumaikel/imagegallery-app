"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface ImageData {
  id: number;
  webformatURL: string;
 
}

const ImageGallery  = () => {
  const [images, setImages] = useState<ImageData[]>([]);

  useEffect(() => {
    const apiKey = '43003817-5333e0e4f3c66f6765e525f97'; // Reemplaza con tu clave de API de Pixabay
    const perPage = 20;
    const apiURL = `https://pixabay.com/api/?key=${apiKey}&orientation=vetical&per_page=${perPage}`;

    const fetchImages = async () => {
      try {
        const response = await fetch(apiURL);
        const data = await response.json();
        setImages(data.hits);
      } catch (error) {
        console.error('Error al obtener las imágenes:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      
      <div className="container">
        {images.map(image => (
          <div key={image.id} className='grid-cols-4'>
            {/* Usa la etiqueta <Image> de Next.js */}
            <Image
              src={image.webformatURL}
              alt={`Image ${image.id}`}
              width={400} // Establece el ancho de la imagen
              height={400} // Establece el alto de la imagen
              className='p-5'
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
