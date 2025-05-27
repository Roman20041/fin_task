import React, { useState } from 'react';
import { searchAll } from '../services/lastfm';
import { Artist, Track } from '../types/lastfm';
import ArtistCard from '../components/ArtistCard';
import TrackCard from '../components/TrackCard';

/**
 * Страница поиска исполнителей и треков
 * @returns {JSX.Element} Страница с формой поиска и результатами
 */
const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [artistResults, setArtistResults] = useState<Artist[]>([]);
  const [trackResults, setTrackResults] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Обработчик отправки формы поиска
   * @param {React.FormEvent} e - Событие отправки формы
   */
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setLoading(true);
      const data = await searchAll(query);
      setArtistResults(data.artistmatches.artist);
      setTrackResults(data.trackmatches.track);
      setError(null);
    } catch (err) {
      setError('Failed to search');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Search</h2>
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for artists and tracks..."
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <div>Error: {error}</div>}

      {artistResults.length > 0 && (
        <>
          <h3>Artists</h3>
          <div className="grid">
            {artistResults.map((artist) => (
              <ArtistCard key={artist.mbid || artist.name} artist={artist} />
            ))}
          </div>
        </>
      )}

      {trackResults.length > 0 && (
        <>
          <h3>Tracks</h3>
          <div className="grid">
            {trackResults.map((track) => (
              <TrackCard key={track.mbid || track.url} track={track} />
            ))}
          </div>
        </>
      )}

      {!loading && artistResults.length === 0 && trackResults.length === 0 && query && (
        <p>No results found</p>
      )}
    </div>
  );
};

export default Search; 