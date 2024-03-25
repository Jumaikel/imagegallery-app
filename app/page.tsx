"use client"

import NavBar from "./components/NavBar";
import SharedImages from "./components/SharedImages";
import ImageGallery from "./components/ImageGallery";
import { GalleryProvider } from './utils/GalleryContext';

const Home = () => {
  return (
    <GalleryProvider>
      <main>
        <header>
          <NavBar />
        </header>
        <div className="flex-container mx-6">
          <ImageGallery />
        </div>
      </main>
    </GalleryProvider>
  );
};

export default Home;