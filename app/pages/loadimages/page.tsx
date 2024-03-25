"use client"
import React from 'react';
import UploadImage from '../../components/UploadImage';
import { GalleryProvider } from '../../components/GalleryContext';
import NavBar from "../../components/NavBar";

const LoadImages: React.FC = () => {
    return (
        <GalleryProvider>
            <header>
                <NavBar />
            </header>
            <div className="flex-container mx-6 pb-6 text-center" >
                <h1>Load Image</h1>
                <UploadImage />
            </div>
        </GalleryProvider>
    );
};

export default LoadImages;
