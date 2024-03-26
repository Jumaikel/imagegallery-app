"use client"

import NavBar from "./components/NavBar";
import SharedImages from "./components/SharedImages";
import ImageGallery from "./components/ImageGallery";


const Home = () => {
  return (
   
      <main>
        <header>
          <NavBar />
        </header>
        <div className="flex-container mx-6">
          <ImageGallery />
        </div>
      </main>
    
  );
};

export default Home;