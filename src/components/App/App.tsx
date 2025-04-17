import { useState, useEffect, FC} from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import Loader from '../Loader/Loader';
import ImageGallery from '../ImageGallery/ImageGallery';
import ModalImage from '../ImageModal/ImageModal';
import axios from 'axios';
import toast from 'react-hot-toast';
import Modal from 'react-modal';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { Image } from '../ImageGallery/ImageGallery.types';

const API_KEY = "tp34Odr_3BAAPDxyfW_uOW2KXWVVcYSieVmGJimjlhk";
const API_URL = "https://api.unsplash.com/search/photos";

Modal.setAppElement('#root');

const App: FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<null | string>(null);
  const [isError, setIsError] = useState<boolean>(false);

  const openModal = (image: Image): void => {
    setSelectedImage(image.urls.regular);
  };

  const closeModal = (): void => {
    setSelectedImage(null);
  };

  const handleSearchFormSubmit = (newQuery: string): void => {
    setQuery(newQuery)
    setImages([]);
    setPage(1);   
    setHasMore(true); 
  }

  useEffect(() => {
    if (!query) return; 
    const fetchImages = async (): Promise<void> => {

    setIsLoading(true);

    try {
      setIsError(false);
      const response = await axios.get<{ results: Image[] }>(API_URL, {
        params: {
          query,
          client_id: API_KEY,
          per_page: 10,
          page,
        },
      });

      if (response.data.results.length === 0) {
        setHasMore(false);
        setIsError(true);
        toast.error("Відсутні зображення.");
      }

      setImages((prevImages: Image[]): Image[] =>  [...prevImages, ...response.data.results]);

    } catch (error: unknown) {
      setIsError(true);
      toast.error("Помилка при завантаженні зображень.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
    fetchImages();
  }, [query, page, ]);

  const handleLoadMore = (): void => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <SearchBar setQuery={handleSearchFormSubmit} />
      <ImageGallery images={images} openModal={openModal} /> 
      {isError && <ErrorMessage />}
      {isLoading && <Loader />} 
      {hasMore && images.length > 0 && !isLoading && (
        <LoadMoreBtn onLoadMore={handleLoadMore} />
      )}
      <ModalImage isOpen={Boolean(selectedImage)} closeModal={closeModal} selectedImage={selectedImage} />
    </>
  );
}

export default App;