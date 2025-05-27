import React from 'react';

const ImageCard = ({ image }) => (
  <div className="image-card">
    <img src={image.url} alt={image.breeds && image.breeds.length > 0 ? image.breeds[0].name : 'A cute cat'} />
    {image.breeds && image.breeds.length > 0 && (
      <div className="image-info">
        <p><strong>Breed:</strong> {image.breeds[0].name}</p>
        {image.breeds[0].temperament && <p><strong>Temperament:</strong> {image.breeds[0].temperament}</p>}
      </div>
    )}
  </div>
);

export default ImageCard;