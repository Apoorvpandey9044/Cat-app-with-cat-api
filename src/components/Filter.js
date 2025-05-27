import React from 'react';

const Filter = ({ breeds, selectedBreed, onBreedChange }) => (
  <div className="filter-container">
    <label htmlFor="breed-select">Filter by Breed: </label>
    <select id="breed-select" value={selectedBreed} onChange={onBreedChange}>
      <option value="">All Breeds (Random)</option>
      {breeds.map(breed => (
        <option key={breed.id} value={breed.id}>{breed.name}</option>
      ))}
    </select>
  </div>
);

export default Filter;