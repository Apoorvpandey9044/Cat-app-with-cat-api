import React from 'react';

const LoadMoreButton = ({ onClick, isLoading, hasMore }) => {
  if (!hasMore) {
    return <p>No more cats to load for this selection!</p>;
  }

  return (
    <button onClick={onClick} disabled={isLoading} className="load-more-button">
      {isLoading ? 'Loading...' : 'Load More Cats'}
    </button>
  );
};

export default LoadMoreButton;