import React from 'react';
import { Track } from '../types/lastfm';

interface TrackCardProps {
  track: Track;
}

/**
 * Компонент для отображения карточки трека
 * @param {TrackCardProps} props - Свойства компонента
 * @param {Track} props.track - Информация о треке
 * @returns {JSX.Element} Карточка трека с изображением и информацией
 */
const TrackCard: React.FC<TrackCardProps> = ({ track }) => {
  // Try to find the best quality image
  const getImageUrl = () => {
    if (!track.image || track.image.length === 0) {
      return 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png';
    }

    // Try to find images in order of preference
    const sizes = ['extralarge', 'large', 'medium', 'small'];
    for (const size of sizes) {
      const image = track.image.find(img => img.size === size && img['#text']);
      if (image && image['#text']) {
        return image['#text'];
      }
    }

    // If no image with text found, return default
    return 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png';
  };

  return (
    <div className="card">
      <img src={getImageUrl()} alt={track.name} loading="lazy" />
      <h3>{track.name}</h3>
      <p>{track.artist.name}</p>
      <p>{parseInt(track.listeners).toLocaleString()} listeners</p>
    </div>
  );
};

export default TrackCard; 