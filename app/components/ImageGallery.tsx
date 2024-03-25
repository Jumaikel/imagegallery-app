"use client"

import React, { useEffect, useState, useMemo, useRef } from 'react';
import Image from 'next/image';
import Masonry from 'react-masonry-css';
import { useGallery } from '../utils/GalleryContext';

interface ImageData {
  id: number;
  webformatURL: string;
}

const ImageGallery = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [page, setPage] = useState(1);
  const [scrollCount, setScrollCount] = useState(0);
  const [maxScrolls, setMaxScrolls] = useState(20);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const imageGalleryRef = useRef<HTMLDivElement>(null);

  const { sharedImages } = useGallery();

  useEffect(() => {
    console.log("Shared Images:", sharedImages);
  }, [sharedImages]);

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

  const allImages = useMemo(() => [...sharedImages, ...images], [sharedImages, images]);

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

  const openModal = (imageUrl: string) => {
    setShowModal(true);
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage('');
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(selectedImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'image.jpg';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  return (
    <div ref={imageGalleryRef} style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 100px)' }}>
      <Masonry
        breakpointCols={{ default: 4, 1100: 4, 800: 3, 500: 2 }}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column m-5"
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        {allImages.map(image => (
          <div key={image.id} className='masonry-item'>
            <Image
              src={image.webformatURL}
              alt={`Image ${image.id}`}
              width={600}
              height={400}
              className='rounded-lg overflow-hidden hover:opacity-50 transition-opacity duration-300 m-2 cursor-pointer'
              onClick={() => openModal(image.webformatURL)}
            />
          </div>
        ))}
      </Masonry>

      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="max-w-3xl max-h-screen overflow-auto text-center">
            <Image
              src={selectedImage}
              alt="Selected Image"
              width={600}
              height={400}
              className="rounded-lg overflow-hidden"
            />
            <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full mt-3 mr-3" onClick={handleDownload}>Download</button>
            <button className="bg-white hover:bg-gray-500 hover:text-white text-indigo-500 font-bold py-2 px-4 rounded-full mt-3" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
