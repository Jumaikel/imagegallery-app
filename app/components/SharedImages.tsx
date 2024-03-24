"use client"
import React, { useEffect, useState, useMemo } from 'react';
import { supabase, supabaseUrl } from '../utils/supabaseClient';
import Image from 'next/image';
import Masonry from 'react-masonry-css';

interface ImageData {
    id: string;
    url: string;
}

const SharedImages = () => {
    const [images, setImages] = useState<ImageData[]>([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchImages();
    }, [page]);

    const fetchImages = async () => {
        try {
            const { data, error } = await supabase.storage
                .from('sharedimages')
                .list('');

            if (error) {
                throw new Error(error.message);
            }

            if (data && data.length > 0) {
                const imageUrls = data.map((image: any) => ({
                    id: image.id,
                    url: `${supabaseUrl}/storage/v1/object/public/sharedimages/${image.name}`
                }));
                setImages(imageUrls);
            } else {
                setImages([]);
            }
        } catch (error: any) {
            console.error('Error getting images:', error.message);
        }
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 100px)'}}>
            <Masonry
                breakpointCols={{ default: 4, 1100: 4, 800: 3, 500: 2 }}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column m-5"
                style={{ display: 'flex', justifyContent: 'center' }}
            >
                {images.slice(1).map(image => (
                    <div key={image.id} className='masonry-item'>
                        <img
                            src={image.url}
                            alt={`Image ${image.id}`}
                            width={600}
                            height={400}
                            className='rounded-lg overflow-hidden hover:opacity-50 transition-opacity duration-300 m-2'
                        />
                    </div>
                ))}
            </Masonry >
        </div >
    );
}

export default SharedImages;