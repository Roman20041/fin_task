import React, { useEffect, useState } from 'react';
import { getTopTracks } from '../services/lastfm';
import { Track } from '../types/lastfm';
import TrackCard from '../components/TrackCard';

/**
 * Страница отображения топ треков
 * @returns {JSX.Element} Страница со списком популярных треков
 */
const TopTracks: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setLoading(true);
        const data = await getTopTracks();
        setTracks(data.track);
        setError(null);
      } catch (err) {
        setError('Failed to load top tracks');
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, []);

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (error) {
    return <div className="container">Error: {error}</div>;
  }

  return (
    <div className="container">
      <h2>Top Tracks</h2>
      <div className="grid">
        {tracks.map((track) => (
          <TrackCard key={track.mbid || track.url} track={track} />
        ))}
      </div>
    </div>
  );
};

export default TopTracks; 