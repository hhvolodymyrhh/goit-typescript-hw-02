export interface ModalImageProps {
  isOpen: boolean;
  closeModal: () => void;
  selectedImage: string | null;
}