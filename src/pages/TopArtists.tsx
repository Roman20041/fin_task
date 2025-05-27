import React, { useEffect, useState } from 'react';
import { getTopArtists } from '../services/lastfm';
import { Artist } from '../types/lastfm';
import ArtistCard from '../components/ArtistCard';

/**
 * Страница отображения топ исполнителей
 * @returns {JSX.Element} Страница со списком популярных исполнителей
 */
const TopArtists: React.FC = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setLoading(true);
        const data = await getTopArtists();
        setArtists(data.artist);
        setError(null);
      } catch (err) {
        setError('Failed to load top artists');
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (error) {
    return <div className="container">Error: {error}</div>;
  }

  return (
    <div className="container">
      <h2>Top Artists</h2>
      <div className="grid">
        {artists.map((artist) => (
          <ArtistCard key={artist.mbid || artist.name} artist={artist} />
        ))}
      </div>
    </div>
  );
};

export default TopArtists; 