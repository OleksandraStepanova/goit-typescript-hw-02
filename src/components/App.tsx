import { useEffect, useState } from "react";
import SearchBar from "./SearchBar/SearchBar";
import toast, { Toaster } from 'react-hot-toast';
import { getPhotos } from "../apiService/photos";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import ErorrMessage from "./ErorrMessage/ErorrMessage";
import ImageModal from "./ImageModal/ImageModal";
import { ApiResponse, Image } from "./App.types";



export default function App() {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<Image[]>([]);
  const [isLoader, setLoader] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const[currentImage,setCurrentImage]=useState<Image>(null);

  useEffect(() => {
    if (!query) return;
    const handleGallery = async () => {
      try {
        setLoader(true);
        const value = await getPhotos(query, page);
        setData(prevState => {
          return [...prevState, ...value.results];
        });             
        setTotal(value.total_pages);
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message);
        }        
      } finally {
        setLoader(false);
      }      
    }
    handleGallery();
  },[page, query])
  
  const handleSubmit = (value:string) => {
    setData([]);
    setQuery(value);
    setPage(1);
  }
  
  
  const handleLoadMore = () => {    
    setPage(page + 1);   
  }

  const openModal = (image:Image) => {
    setCurrentImage(image);    
    setModalIsOpen(true);
  }

  const closeModal = () => {     
    setModalIsOpen(false);
  }

  return (
    <>
      <SearchBar onSubmit={handleSubmit}/>
      <Toaster />
      {query !== '' && <ImageGallery value={data} onClickImage={openModal}/>}
      {query && total===0 && <ErorrMessage/>}
      {isLoader && <Loader />}      
      {data.length > 0 && total > page && <LoadMoreBtn onClick={handleLoadMore} />}
      <ImageModal isOpen={modalIsOpen} isClose={closeModal} value={currentImage}/>
    </>
  )
}
