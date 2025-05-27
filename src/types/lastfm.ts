export interface Artist {
  name: string;
  listeners: string;
  mbid: string;
  url: string;
  streamable: string;
  image: Image[];
}

export interface Track {
  name: string;
  duration?: string;
  listeners: string;
  mbid: string;
  url: string;
  streamable?: {
    '#text': string;
    fulltrack: string;
  };
  artist: {
    name: string;
    mbid?: string;
    url?: string;
  };
  image: Image[];
}

export interface Image {
  '#text': string;
  size: 'small' | 'medium' | 'large' | 'extralarge';
}

export interface TopArtistsResponse {
  artists: {
    artist: Artist[];
    '@attr': {
      page: string;
      perPage: string;
      total: string;
      totalPages: string;
    };
  };
}

export interface TopTracksResponse {
  tracks: {
    track: Track[];
    '@attr': {
      page: string;
      perPage: string;
      total: string;
      totalPages: string;
    };
  };
}

export interface SearchResponse {
  results: {
    artistmatches: {
      artist: Artist[];
    };
    trackmatches: {
      track: Track[];
    };
    '@attr': {
      for: string;
    };
  };
} 