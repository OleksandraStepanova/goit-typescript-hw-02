import { useRef } from "react";
import ImageCard from "../ImageCard/ImageCard";
import css from './ImageGallery.module.css'
import { Image } from "../App.types";

type ImageGalleryProps = {
    value: Image[];
    onClickImage:(item:Image)=>void
}

export default function ImageGallery({value, onClickImage}:ImageGalleryProps) {
    const galleryRef = useRef<HTMLUListElement>(null);
   
    if (galleryRef.current!==undefined) {
        const height = galleryRef.current?.getBoundingClientRect().height;
        scrollBy({
            top: height,
            behavior: 'smooth',
        });
        }
       
    
    return (
        <ul ref={galleryRef} className={css.list}>
            {value.map((item:Image) => <li key={item.id}><ImageCard onClickImage={onClickImage} item={item}/></li>)}
        </ul>
    )
}