"use client"
import React from 'react';
import { GalleryProvider } from '../../components/GalleryContext';
import NavBar from "../../components/NavBar";
import SharedImages from "../../components/SharedImages";

const SharedImagesView: React.FC = () => {
    return (
        <GalleryProvider>
            <header>
                <NavBar />
            </header>
            <div className="flex-container mx-6" >
                <SharedImages/>
            </div>
        </GalleryProvider>
    );
};

export default SharedImagesView;
