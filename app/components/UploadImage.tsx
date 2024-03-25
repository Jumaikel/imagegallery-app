import React, { useState } from 'react';
import { useGallery } from './GalleryContext';
import { supabaseUrl, supabase } from '../utils/supabaseClient';
import Image from 'next/image';

const UploadImage: React.FC = () => {
    const { addImage } = useGallery();
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadMessage, setUploadMessage] = useState<string | null>(null);

    const handleFileUpload = async () => {
        if (!selectedFile) return;

        try {
            const fileData = selectedFile;
            const { data, error } = await supabase.storage
                .from('sharedimages')
                .upload(`image-${Date.now()}`, fileData);

            if (error) {
                throw new Error(error.message);
            }

            if (data) {
                addImage(data.path);
                const fileUrl = `${supabaseUrl}/storage/v1/object/public/sharedimages/${data.path}`;
                setImageUrl(fileUrl);
                setSelectedFile(null);
                setUploadMessage('Image uploaded successfully!');
            }
        } catch (error: any) {
            console.error('Error uploading image:', error.message);
            setUploadMessage('Failed to upload image');
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    return (
        <div className="text-center" >
            <input className='file-input w-full max-w-xs mb-3 mt-3'
                type="file"
                accept="image/*"
                onChange={handleFileChange} />
            {selectedFile && (
                <div className="flex justify-center">
                    <button onClick={handleFileUpload} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Upload</button>
                </div>
            )}
            {uploadMessage && <p className="text-green-500">{uploadMessage}</p>}
            {imageUrl && (
                <div className="flex justify-center ">
                    <Image src={imageUrl} alt="Uploaded" className="max-w-96 h-auto rounded-lg m-3" width={600} height={400} />
                </div>
            )}
        </div>
    );
};

export default UploadImage;