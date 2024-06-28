import { useEffect, useState } from "react";
import SearchBar from "./SearchBar/SearchBar";
import toast, { Toaster } from 'react-hot-toast';
import { getPhotos } from "../apiService/photos";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import ErorrMessage from "./ErorrMessage/ErorrMessage";
import ImageModal from "./ImageModal/ImageModal";

export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [isLoader, setLoader] = useState(false);
  const [total, setTotal] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const[currentImage,setCurrentImage]=useState();

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
      } catch(error) {
        toast.error(error.message);
      } finally {
        setLoader(false);
      }      
    }
    handleGallery();
  },[page, query])
  
  const handleSubmit = (value) => {
    setData([]);
    setQuery(value);
    setPage(1);
  }
  
  
  const handleLoadMore = () => {    
    setPage(page + 1);   
  }

  const openModal = (image) => {
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
