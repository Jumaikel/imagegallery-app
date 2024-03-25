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
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchImages();
    }, [page]);

    const fetchImages = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase.storage
                .from('sharedimages')
                .list('', {
                    limit: 12,
                    offset: (page - 1) * 12,
                });

            if (error) {
                throw new Error(error.message);
            }

            if (data && data.length > 0) {
                const imageUrls = data.map((image: any) => ({
                    id: image.id,
                    url: `${supabaseUrl}/storage/v1/object/public/sharedimages/${image.name}`
                }));
                setImages(prevImages => [...prevImages, ...imageUrls]);
                setPage(prevPage => prevPage + 1);
            } else {
                setHasMore(false);
            }
        } catch (error: any) {
            console.error('Error getting images:', error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleLoadMore = () => {
        if (!loading && hasMore) {
            fetchImages();
        }
    };

    return (
        <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 100px)' }}>
            <Masonry
                breakpointCols={{ default: 4, 1100: 4, 800: 3, 500: 2 }}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column m-5"
                style={{ display: 'flex', justifyContent: 'center' }}
            >
                {images.map(image => (
                    <div key={image.id} className='masonry-item'>
                        <Image
                            src={image.url}
                            alt={`Image ${image.id}`}
                            width={600}
                            height={400}
                            className='rounded-lg overflow-hidden hover:opacity-50 transition-opacity duration-300 m-2'
                        />
                    </div>
                ))}
            </Masonry>
            {!hasMore && (
                <div className="text-center mt-4 text-gray-500">
                    No more images available.
                </div>
            )}
        </div>
    );
}

export default SharedImages;
