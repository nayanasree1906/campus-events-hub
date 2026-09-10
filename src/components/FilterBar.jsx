import React from 'react';
import { SearchIcon, CloseIcon } from './Icons';
import { CATEGORIES } from '../data/sampleEvents';

export function FilterBar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  totalResults,
  onResetFilters
}) {
  const isFiltered = searchQuery.trim() !== '' || selectedCategory !== 'All';

  return (
    <div className="filter-bar-wrapper">
      {/* Search Input */}
      <div className="search-container">
        <div className="search-input-wrapper">
          <SearchIcon className="search-icon w-5 h-5" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by event name, college, venue, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search events"
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearchQuery('')}
              title="Clear search"
              aria-label="Clear search"
            >
              <CloseIcon className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category Pills */}
      <div className="category-scroll-container" aria-label="Filter by category">
        <div className="category-pills">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                className={`category-pill ${isSelected ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
                aria-pressed={isSelected}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results meta bar */}
      <div className="results-meta-bar">
        <span className="results-count">
          Showing <strong>{totalResults}</strong> {totalResults === 1 ? 'event' : 'events'}
          {selectedCategory !== 'All' && <span> in <strong>{selectedCategory}</strong></span>}
          {searchQuery.trim() && <span> matching "<strong>{searchQuery}</strong>"</span>}
        </span>

        {isFiltered && (
          <button
            type="button"
            className="clear-filters-link"
            onClick={onResetFilters}
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
