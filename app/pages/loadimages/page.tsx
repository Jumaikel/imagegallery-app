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
            <div className="flex-container mx-6 pb-6 text-center font-mono" >
                <h1>Load Image</h1>
                <UploadImage />
            </div>
        </div>
    );
};

export default LoadImages;
