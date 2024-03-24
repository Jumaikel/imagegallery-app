import React, { createContext, useContext, useState, ReactNode } from 'react';

type GalleryContextType = {
    images: string[];
    addImage: (image: string) => void;
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
    const [images, setImages] = useState<string[]>([]);

    const addImage = (image: string) => {
        setImages([...images, image]);
    };

    return (
        <GalleryContext.Provider value={{ images, addImage }}>
            {children}
        </GalleryContext.Provider>
    );
};