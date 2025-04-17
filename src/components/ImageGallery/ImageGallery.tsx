import css from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';
import { ImageGalleryProps } from './ImageGallery.types';
import { FC } from 'react';


const ImageGallery: FC<ImageGalleryProps> = ({images, openModal}) => {
 
  return (
  <ul className={css.imageGallery}>
    {images.map((img) => (
        <li key={img.id} className={css.imageItem} onClick={() => openModal(img)}>
            <ImageCard img={img} />
        </li>
      ))}
  </ul>
  )
}

export default ImageGallery
