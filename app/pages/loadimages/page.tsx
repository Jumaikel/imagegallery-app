"use client"
import React from 'react';
import UploadImage from '../../components/UploadImage';
import NavBar from "../../components/NavBar";

const LoadImages: React.FC = () => {
    return (
        <div>
            <header>
                <NavBar />
            </header>
            <div className="mx-6 pb-6 text-center">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-950 dark:text-amber-600 my-4">
                    Load Image
                </h1>
                <UploadImage />
                </div>
        </div>
    );
};

export default LoadImages;
