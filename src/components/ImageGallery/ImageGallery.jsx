import { useRef } from "react";
import ImageCard from "../ImageCard/ImageCard";
import css from './ImageGallery.module.css'

export default function ImageGallery({value, onClickImage}) {
    const galleryRef = useRef();
   
    if (galleryRef.current!==undefined) {
        const height = galleryRef.current.getBoundingClientRect().height;
        scrollBy({
            top: height,
            behavior: 'smooth',
        });
        }
       
    
    return (
        <ul ref={galleryRef} className={css.list}>
            {value.map((item) => <li key={item.id}><ImageCard onClickImage={onClickImage} item={item}/></li>)}
        </ul>
    )
}