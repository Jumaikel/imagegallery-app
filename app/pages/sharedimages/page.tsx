"use client"
import NavBar from "../../components/NavBar";
import SharedImages from "../../components/SharedImages";
import ImageGallery from "../../components/ImageGallery";
import { GalleryProvider } from '../../utils/GalleryContext';

const SharedImagesView: React.FC = () => {
    return (
        <GalleryProvider>
            <header>
                <NavBar />
            </header>
            <div className="flex-container mx-6 font-mono" >
                <SharedImages />
            </div>
        </GalleryProvider>
    );
};

export default SharedImagesView;

