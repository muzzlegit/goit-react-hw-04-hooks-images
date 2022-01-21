import { useEffect, useLayoutEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { errorToast } from "../../services/notify";

import imagesAPI from '../../services/images-api';

import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from "../ImageGallery/ImageGallery";
import Modal from "../Modal/Modal";
import Image from "../Image/Image";

import { Container } from './App.styled';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function App () {

  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [page, setPage] = useState(1);
  const [firstRecivedImage, setFirstRecivedImage] = useState(null);

  const [ query, setQuery] = useState('');
  const [ showModal, setShowModal] = useState(false);
  const [ modalImage, setModalImage] = useState({});

  useEffect(() => {
    if(!query){
        return;
    }
    setStatus(Status.PENDING);
        imagesAPI(query, page)
        .then(res => {
            if(res.total !== 0) {
                if(!res.hits.length){
                    setImages(prevState =>  {
                        return [...prevState,...res.hits];
                    })
                    setStatus(Status.RESOLVED);
                    errorToast('Images on your query over');
                    return;
                }
                setImages(prevState => 
                    (page === 1 ? res.hits : [...prevState,...res.hits])
                );
                setStatus(Status.RESOLVED);
                setFirstRecivedImage(res.hits[0].id);
            } else {
                setStatus(Status.IDLE);
                errorToast('Nothing found. Try enother query');
            }
        })
        .catch((error) => {
            setStatus(Status.IDLE);
            errorToast(error);
        });
  }, [ page, query ]);

  useLayoutEffect(()=> {
    document.getElementById(firstRecivedImage)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });              
  }, [firstRecivedImage]);

  const handleFormSubmit = (query) => {
    setQuery(query);
    setImages([]);
    setPage(1);
  }
  const toggleModal = ( )=> {
    setShowModal(!showModal)
  }
  const onImageClick = (largeImageURL, tags) => {
    setModalImage({url: largeImageURL, alt: tags});
    toggleModal();
  }
  const handleLoadMoreClick = () => {
      setPage(prevState =>  prevState + 1);
  }

  return (
    <Container>
      {showModal && <Modal onClose = {toggleModal}> <Image modalImageData = { modalImage }/></Modal>}
      <Searchbar onSubmit = {handleFormSubmit}/>
      {status === Status.PENDING && <Loader type="Watch" color="#00BFFF" height={ 50 } width={ 50 }/>}
      {status === Status.RESOLVED && <ImageGallery images = {images} onImageClick = { onImageClick } handleLoadMoreClick = {handleLoadMoreClick}/>}
      <ToastContainer />
    </Container>
  );
}
