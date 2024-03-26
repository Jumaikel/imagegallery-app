import React from 'react';

interface ModalButtonsProps {
    onDownload: () => void;
    onClose: () => void;
}

const ModalButtons: React.FC<ModalButtonsProps> = ({ onDownload, onClose }) => {
    return (
        <>
            <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full mt-3 mr-3" onClick={onDownload}>Download</button>
            <button className="bg-white hover:bg-gray-500 hover:text-white text-indigo-500 font-bold py-2 px-4 rounded-full mt-3" onClick={onClose}>Close</button>
        </>
    );
}

export default ModalButtons;
