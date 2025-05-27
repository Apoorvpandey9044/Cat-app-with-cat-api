import React from 'react';
import ImageCard from './ImageCard';

const ImageGallery = ({ images }) => (
  <div className="image-gallery">
    {images.map(image => (
      <ImageCard key={image.id} image={image} />
    ))}
  </div>
);

export default ImageGallery;