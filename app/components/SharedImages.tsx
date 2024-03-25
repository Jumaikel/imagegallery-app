import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Masonry from 'react-masonry-css';
import { supabase, supabaseUrl } from '../utils/supabaseClient';
import { useGallery } from '../utils/GalleryContext';

interface ImageData {
    id: number;
    webformatURL: string;
}

const SharedImages = () => {
    const [images, setImages] = useState<ImageData[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<string>('');
    const { addImage, sharedImages } = useGallery();

    useEffect(() => {
        fetchImages();
    }, []);

    useEffect(() => {
        sharedImages.forEach(image => {
            console.log("Adds:", image);
        });

    }, [sharedImages]);

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
                    webformatURL: `${supabaseUrl}/storage/v1/object/public/sharedimages/${image.name}`
                }));
                setImages(imageUrls);

                imageUrls.forEach(image => {
                    addImage(image);
                    console.log("Image added:", image);
                });
            } else {
                setImages([]);
            }
        } catch (error: any) {
            console.error('Error getting images:', error.message);
        }
    };

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
            const webformatURL = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = webformatURL;
            a.download = 'image.jpg';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(webformatURL);
        } catch (error) {
            console.error('Error downloading image:', error);
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
                {images.slice(1).map(image => (
                    <div key={image.id} className='masonry-item'>
                        <Image
                            src={image.webformatURL}
                            alt={`Image ${image.id}`}
                            width={600}
                            height={400}
                            className='rounded-lg overflow-hidden hover:opacity-50 transition-opacity duration-300 m-2 cursor-pointer'
                            onClick={() => openModal(image.webformatURL)}
                            priority
                        />
                    </div>
                ))}
            </Masonry >

            {showModal && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="max-w-3xl max-h-screen overflow-auto text-center">
                        <Image
                            src={selectedImage}
                            alt="Selected Image"
                            layout="responsive"
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
}

export default SharedImages;

