import Image from "next/image";
import NavBar from "./components/NavBar";
import ImageGallery from "./components/ImageGallery";


export default function Home() {
  return (
    <main>
    <header>
    <NavBar/>
    </header>
    <div>
    <ImageGallery/>
    </div>
    </main>
  );
}
