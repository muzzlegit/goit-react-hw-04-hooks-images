import PropTypes from 'prop-types';

import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Button from "../Button/Button";

import { Gallery } from './ImageGallery.styled';


export default function ImageGallery({ images, handleLoadMoreClick, onImageClick }) {
        return (    
            <>
                <Gallery>
                    <ImageGalleryItem images = { images } onImageClick = {onImageClick}/>
                </Gallery>
                <Button onClick = {handleLoadMoreClick}/>
            </>  
        )
}

ImageGallery.propTypes = {
    images: PropTypes.array.isRequired,
    onImageClick: PropTypes.func.isRequired,
    handleLoadMoreClick: PropTypes.func.isRequired,
}


