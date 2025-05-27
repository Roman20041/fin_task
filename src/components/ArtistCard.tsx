import React from 'react';
import { Artist } from '../types/lastfm';

interface ArtistCardProps {
  artist: Artist;
}

/**
 * Компонент для отображения карточки исполнителя
 * @param {ArtistCardProps} props - Свойства компонента
 * @param {Artist} props.artist - Информация об исполнителе
 * @returns {JSX.Element} Карточка исполнителя с изображением и информацией
 */
const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
  const getImageUrl = () => {
    if (!artist.image || artist.image.length === 0) {
      return 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png';
    }

    const sizes = ['extralarge', 'large', 'medium', 'small'];
    for (const size of sizes) {
      const image = artist.image.find(img => img.size === size && img['#text']);
      if (image && image['#text']) {
        return image['#text'];
      }
    }

    return 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png';
  };

  return (
    <div className="card">
      <img src={getImageUrl()} alt={artist.name} loading="lazy" />
      <h3>{artist.name}</h3>
      <p>{parseInt(artist.listeners).toLocaleString()} listeners</p>
    </div>
  );
};

export default ArtistCard; 