import { FC } from 'react';
import css from './ImageCard.module.css';
import { ImageCardprops } from './ImageCard.types';

const ImageCard: FC<ImageCardprops> = ({img}) => {
 
  return (
  <>
    <img src={img.urls.small} alt={img.alt_description} className={css.image} />
  </>
  )
}

export default ImageCard
