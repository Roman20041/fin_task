import axios from 'axios';

const API_KEY = '31919feb49079bcb9b4f70054cf10b9b';
const BASE_URL = 'https://ws.audioscrobbler.com/2.0/';

/**
 * Получает список популярных исполнителей
 * @param {number} page - Номер страницы для пагинации
 * @returns {Promise<{ artist: Array }>} Массив исполнителей с информацией
 */
export const getTopArtists = async (page = 1) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        method: 'chart.gettopartists',
        api_key: API_KEY,
        format: 'json',
        page,
        limit: 50
      }
    });

    // Get detailed info for each artist to get their images
    const artists = await Promise.all(
      response.data.artists.artist.map(async (artist: any) => {
        try {
          const detailResponse = await axios.get(BASE_URL, {
            params: {
              method: 'artist.gettopalbums',
              artist: artist.name,
              api_key: API_KEY,
              format: 'json',
              limit: 1
            }
          });

          // If artist has albums, use the first album's image
          if (detailResponse.data.topalbums?.album?.[0]?.image) {
            return {
              ...artist,
              image: detailResponse.data.topalbums.album[0].image
            };
          }
          return artist;
        } catch (error) {
          return artist;
        }
      })
    );

    return { artist: artists };
  } catch (error) {
    console.error('Error fetching top artists:', error);
    throw error;
  }
};

/**
 * Получает список популярных треков
 * @param {number} page - Номер страницы для пагинации
 * @returns {Promise<{ track: Array }>} Массив треков с информацией
 */
export const getTopTracks = async (page = 1) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        method: 'chart.gettoptracks',
        api_key: API_KEY,
        format: 'json',
        page,
        limit: 50
      }
    });

    // Get detailed info for each track to get their images
    const tracks = await Promise.all(
      response.data.tracks.track.map(async (track: any) => {
        try {
          // First try to get track info
          const trackResponse = await axios.get(BASE_URL, {
            params: {
              method: 'track.getInfo',
              artist: track.artist.name,
              track: track.name,
              api_key: API_KEY,
              format: 'json',
              autocorrect: 1
            }
          });

          // If we got album image from track info, use it
          if (trackResponse.data.track?.album?.image) {
            return {
              ...track,
              image: trackResponse.data.track.album.image
            };
          }

          // If not, try to get artist's top album
          const artistResponse = await axios.get(BASE_URL, {
            params: {
              method: 'artist.gettopalbums',
              artist: track.artist.name,
              api_key: API_KEY,
              format: 'json',
              limit: 1
            }
          });

          if (artistResponse.data.topalbums?.album?.[0]?.image) {
            return {
              ...track,
              image: artistResponse.data.topalbums.album[0].image
            };
          }

          return track;
        } catch (error) {
          // If all else fails, try to get any album by the artist
          try {
            const searchResponse = await axios.get(BASE_URL, {
              params: {
                method: 'artist.gettopalbums',
                artist: track.artist.name,
                api_key: API_KEY,
                format: 'json',
                limit: 1
              }
            });

            if (searchResponse.data.topalbums?.album?.[0]?.image) {
              return {
                ...track,
                image: searchResponse.data.topalbums.album[0].image
              };
            }
          } catch (e) {
            console.error('Error getting fallback image:', e);
          }
          return track;
        }
      })
    );

    return { track: tracks };
  } catch (error) {
    console.error('Error fetching top tracks:', error);
    throw error;
  }
};

/**
 * Выполняет поиск по исполнителям и трекам
 * @param {string} query - Поисковый запрос
 * @returns {Promise<{ artistmatches: { artist: Array }, trackmatches: { track: Array } }>} Результаты поиска
 */
export const searchAll = async (query: string) => {
  try {
    // Search for artists
    const artistResponse = await axios.get(BASE_URL, {
      params: {
        method: 'artist.search',
        artist: query,
        api_key: API_KEY,
        format: 'json',
        limit: 25
      }
    });

    // Search for tracks with extended info
    const trackResponse = await axios.get(BASE_URL, {
      params: {
        method: 'track.search',
        track: query,
        api_key: API_KEY,
        format: 'json',
        limit: 25,
        extended: 1
      }
    });

    // Get detailed info for each artist to get their images
    const artists = await Promise.all(
      artistResponse.data.results.artistmatches.artist.map(async (artist: any) => {
        try {
          const detailResponse = await axios.get(BASE_URL, {
            params: {
              method: 'artist.gettopalbums',
              artist: artist.name,
              api_key: API_KEY,
              format: 'json',
              limit: 1
            }
          });

          if (detailResponse.data.topalbums?.album?.[0]?.image) {
            return {
              ...artist,
              image: detailResponse.data.topalbums.album[0].image
            };
          }
          return artist;
        } catch (error) {
          return artist;
        }
      })
    );

    // Process tracks in sequence to avoid rate limiting
    const tracks = [];
    for (const track of trackResponse.data.results.trackmatches.track) {
      try {
        // Get album info for the track
        const albumInfoResponse = await axios.get(BASE_URL, {
          params: {
            method: 'track.getInfo',
            track: track.name,
            artist: track.artist,
            api_key: API_KEY,
            format: 'json',
            autocorrect: 1
          }
        });

        if (albumInfoResponse.data.track?.album?.image) {
          tracks.push({
            ...track,
            image: albumInfoResponse.data.track.album.image
          });
          continue;
        }

        // If no album image, try to get artist's top album
        const artistTopAlbumResponse = await axios.get(BASE_URL, {
          params: {
            method: 'artist.gettopalbums',
            artist: track.artist,
            api_key: API_KEY,
            format: 'json',
            limit: 1
          }
        });

        if (artistTopAlbumResponse.data.topalbums?.album?.[0]?.image) {
          tracks.push({
            ...track,
            image: artistTopAlbumResponse.data.topalbums.album[0].image
          });
          continue;
        }

        // If still no image, add track without image
        tracks.push(track);
      } catch (error) {
        // If error occurs, try one last time with artist's top album
        try {
          const lastResortResponse = await axios.get(BASE_URL, {
            params: {
              method: 'artist.gettopalbums',
              artist: track.artist,
              api_key: API_KEY,
              format: 'json',
              limit: 1
            }
          });

          if (lastResortResponse.data.topalbums?.album?.[0]?.image) {
            tracks.push({
              ...track,
              image: lastResortResponse.data.topalbums.album[0].image
            });
          } else {
            tracks.push(track);
          }
        } catch (e) {
          tracks.push(track);
        }
      }

      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    return {
      artistmatches: {
        artist: artists
      },
      trackmatches: {
        track: tracks
      }
    };
  } catch (error) {
    console.error('Error searching:', error);
    throw error;
  }
}; 