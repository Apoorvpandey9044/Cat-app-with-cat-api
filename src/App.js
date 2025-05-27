import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import ImageGallery from './components/ImageGallery';
import Filter from './components/Filter';
import LoadMoreButton from './components/LoadMoreButton';
// ImageCard is imported by ImageGallery, so no direct import needed here unless used separately.


function App() {
  const [images, setImages] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1); // For pagination/load more
  const [hasMore, setHasMore] = useState(true);

  const API_BASE_URL = 'http://localhost:3001/api'; // Backend URL

  // Fetch breeds
  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/breeds`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBreeds(data);
      } catch (error) {
        console.error("Failed to fetch breeds:", error);
      }
    };
    fetchBreeds();
  }, [API_BASE_URL]);

  // Fetch images
  const fetchImages = useCallback(async (breedId = '', pageNum = 1, loadMore = false) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      let url = `${API_BASE_URL}/cats?limit=10&page=${pageNum}`;
      if (breedId) {
        url += `&breed_ids=${breedId}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

      setImages(prevImages => loadMore ? [...prevImages, ...data] : data);

    } catch (error) {
      console.error("Failed to fetch cat images:", error);
      setHasMore(false); // Stop trying to load more if there's an error
    } finally {
      setIsLoading(false);
    }
  }, [API_BASE_URL]);

  // Initial image load and when breed changes
  useEffect(() => {
    setImages([]); // Clear images when breed changes
    setPage(1); // Reset page
    setHasMore(true); // Reset hasMore
    fetchImages(selectedBreed, 1, false);
  }, [selectedBreed, fetchImages]);


  const handleBreedChange = (event) => {
    setSelectedBreed(event.target.value);
  };

  const handleLoadMore = () => {
    if (hasMore && !isLoading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchImages(selectedBreed, nextPage, true);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Random Cat Images</h1>
        <Filter breeds={breeds} selectedBreed={selectedBreed} onBreedChange={handleBreedChange} />
      </header>
      <main>
        <ImageGallery images={images} />
        {isLoading && <p>Loading images...</p>}
        {!isLoading && images.length === 0 && !hasMore && <p>No cats found for this selection! Try another breed.</p>}
        {hasMore && !isLoading && images.length > 0 && (
          <LoadMoreButton onClick={handleLoadMore} isLoading={isLoading} hasMore={hasMore} />
        )}
      </main>
      <footer>
        <p>Powered by <a href="https://thecatapi.com/" target="_blank" rel="noopener noreferrer">TheCatAPI.com</a></p>
      </footer>
    </div>
  );
}

export default App;
