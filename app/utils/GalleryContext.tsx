"use client"
import { createContext, useContext, Dispatch, SetStateAction, useState } from "react";

interface ImageData {
  id: number;
  webformatURL: string;
}

interface ContextProps {
  imageData: ImageData[];
  setImageData: Dispatch<SetStateAction<ImageData[]>>;
}

const GlobalContext = createContext<ContextProps>({
  imageData: [],
  setImageData: () => {}
});

type GlobalContextProviderProps = {

    children: React.ReactNode;
}

export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({ children }) => {
  const [imageData, setImageData] = useState<ImageData[]>([]);

  return (
    <GlobalContext.Provider value={{ imageData, setImageData }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGallery = () => useContext(GlobalContext);