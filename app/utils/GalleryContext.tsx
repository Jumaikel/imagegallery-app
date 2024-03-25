import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ImageData {
    id: number;
    webformatURL: string;
}

type GalleryContextType = {
    sharedImages: ImageData[];
    addImage: (image: ImageData) => void;
};

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export const useGallery = () => {
    const context = useContext(GalleryContext);
    if (!context) {
        throw new Error('useGallery must be used within a GalleryProvider');
    }
    return context;
};

type GalleryProviderProps = {
    children: React.ReactNode;
};

export const GalleryProvider: React.FC<GalleryProviderProps> = ({ children }) => {
    const [sharedImages, setImages] = useState<ImageData[]>([]);

    const addImage = (image: ImageData) => {
        setImages([...sharedImages, image]);
    };

    return (
        <GalleryContext.Provider value={{ sharedImages, addImage }}>
            {children}
        </GalleryContext.Provider>
    );
};