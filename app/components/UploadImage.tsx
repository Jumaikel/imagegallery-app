import { useGallery } from "../utils/GalleryContext";
import React, { useState, useRef } from "react";
import { supabaseUrl, supabase } from "../utils/supabaseClient";
import Image from "next/image";

const UploadImage: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    try {
      const fileData = selectedFile;
      const { data, error } = await supabase.storage
        .from("sharedimages")
        .upload(`image-${Date.now()}`, fileData);

      if (error) {
        throw new Error(error.message);
      }

      if (data) {
        const fileUrl = `${supabaseUrl}/storage/v1/object/public/sharedimages/${data.path}`;
        setImageUrl(fileUrl);
        setSelectedFile(null);
        setUploadMessage("Image uploaded successfully!");
      }
    } catch (error: any) {
      console.error("Error uploading image:", error.message);
      setUploadMessage("Failed to upload image");
    }
  };
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImageUrl("");
      setUploadMessage(null);
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="text-center">
      <input
        ref={fileInputRef}
        className="hidden"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      <button
        onClick={handleButtonClick}
        className="bg-blue-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto"
      >
        Select Image
      </button>
      {selectedFile && (
        <div className="flex justify-center">
          <button
            onClick={handleFileUpload}
            className="bg-amber-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto mt-4"
          >
            Upload
          </button>
        </div>
      )}
      {selectedFile && (
        <div className="my-3">
          <p className="text-sm md:text-base lg:text-lg text-gray-700">
            Selected file: {selectedFile.name}
          </p>
        </div>
      )}
      {!imageUrl && (
        <div className="flex justify-center my-5">
          <iframe
            className="rounded-lg w-full max-w-4xl"
            height="400"
            src="https://www.youtube.com/embed/l5OaRxsobqI?autoplay=1&loop=1&playlist=l5OaRxsobqI"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {imageUrl && (
        <div className="flex justify-center">
          <div className="rounded-lg overflow-hidden m-2" onClick={openModal}>
            <Image
              src={imageUrl}
              alt="Uploaded"
              width={600}
              height={400}
              layout="responsive"
              priority
            />
          </div>
        </div>
      )}

      {uploadMessage && (
        <div className="toast toast-end">
          <div
            className={`alert ${
              uploadMessage.includes("successfully")
                ? "alert-success"
                : "alert-info"
            }`}
          >
            <span>{uploadMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
