import React from 'react';
import ModalButtons from './ModalButtons';

interface ModalImageProps {
    src: string;
    alt: string;
    onDownload: () => void;
    onClose: () => void;
}

const ModalImage: React.FC<ModalImageProps> = ({ src, alt, onDownload, onClose }) => {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="max-w-3xl max-h-screen overflow-auto text-center">
                <img src={src} alt={alt} className="rounded-lg overflow-hidden" />
                <ModalButtons onDownload={onDownload} onClose={onClose} />
            </div>
        </div>
    );
}

export default ModalImage;

