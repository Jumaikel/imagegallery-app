"use client";
import React, { useEffect, useState, useMemo, useRef } from 'react';
import Image from 'next/image';
import Masonry from 'react-masonry-css';

interface ImageData {
  id: number;
  webformatURL: string;
}

const ImageGallery = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [page, setPage] = useState(1);
  const [scrollCount, setScrollCount] = useState(0);
  const [maxScrolls, setMaxScrolls] = useState(20);
  const imageGalleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchImages();
  }, [page]);

  const fetchImages = async () => {
    if (scrollCount >= maxScrolls) return;
    const apiURL = `https://pixabay.com/api/?key=43003817-5333e0e4f3c66f6765e525f97&orientation=vetical&per_page=20&page=${page}`;

    try {
      const response = await fetch(apiURL);
      const data = await response.json();
      setImages(prevImages => [...prevImages, ...data.hits]);
    } catch (error) {
      console.error('ERROR GETTING IMAGES', error);
    }
  };

  const lastImages = useMemo(() => images, [images]);

  const handleScroll = () => {
    const { current } = imageGalleryRef;
    if (
      current &&
      current.scrollHeight - current.scrollTop <= current.clientHeight + 50
    ) {
      setPage(prevPage => prevPage + 1);
      setScrollCount(prevScrollCount => prevScrollCount + 1);
    }
  };

  useEffect(() => {
    const { current } = imageGalleryRef;
    if (current) {
      current.addEventListener('scroll', handleScroll);
      return () => current.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div ref={imageGalleryRef} style={{ overflowY: 'auto', maxHeight: '1080px' }}>
      <Masonry
        breakpointCols={{default:4, 1100: 4, 800: 3, 500: 2 }}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column m-5"
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        {lastImages.map(image => (
          <div key={image.id} className='masonry-item'>
            <Image
              src={image.webformatURL}
              alt={`Image ${image.id}`}
              width={600}
              height={400}
              className='rounded-lg overflow-hidden hover:opacity-50 transition-opacity duration-300 m-2'
            />
          </div>
        ))}
      </Masonry>

    </div>
  );
};

export default ImageGallery;
