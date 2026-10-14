// Streaming Embed Server Providers (LK21, IDLIX, Moviebox & Bstation Style)
// Mendukung penuh: Film Barat, Film Indonesia, Drakor, dan Anime Sub Indo gratis tanpa langganan

export const STREAM_SERVERS = [
  {
    id: 'multiembed',
    name: 'Server 1: LK21 (MultiEmbed Utama)',
    tag: 'Barat, Indo, Drakor & Anime • Paling Lancar',
    brand: 'LK21',
    quality: '1080p Full HD',
    speed: 'Sangat Cepat & Pasti Jalan',
    subtitles: 'Subtitle Indonesia Lengkap',
    brandColor: '#e50914', // LK21 / Faiz Red
    badgeBg: 'rgba(229, 9, 20, 0.15)',
    badgeBorder: 'rgba(229, 9, 20, 0.4)',
    hasSyncSettings: false,
    getUrl: ({ mediaType, id, season = 1, episode = 1 }) => {
      // MultiEmbed: Mendukung Movie (Barat/Indo) & TV (Drakor/Anime) dengan parameter tmdb=1
      if (mediaType === 'tv') {
        return `https://multiembed.mov/?video_id=${id}&tmdb=1&s=${season}&e=${episode}`;
      }
      return `https://multiembed.mov/?video_id=${id}&tmdb=1`;
    },
  },
  {
    id: 'vidsrc',
    name: 'Server 2: IDLIX (VidSrc Alpha)',
    tag: 'Populer IDLIX • Sub Indo Pas',
    brand: 'IDLIX',
    quality: '1080p HD',
    speed: 'Stabil & Bebas Buffering',
    subtitles: 'Auto Subtitle Indonesia',
    brandColor: '#6366f1', // Indigo
    badgeBg: 'rgba(99, 102, 241, 0.15)',
    badgeBorder: 'rgba(99, 102, 241, 0.4)',
    hasSyncSettings: false,
    getUrl: ({ mediaType, id, season = 1, episode = 1 }) => {
      // VidSrc: Server andalan IDLIX & LK21 untuk film bioskop dan series
      if (mediaType === 'tv') {
        return `https://vidsrc.me/embed/tv?tmdb=${id}&season=${season}&episode=${episode}`;
      }
      return `https://vidsrc.me/embed/movie?tmdb=${id}`;
    },
  },
  {
    id: 'multiembed_direct',
    name: 'Server 3: Moviebox (Direct Stream)',
    tag: 'Film Barat & Indo • Mirror Cepat',
    brand: 'Moviebox',
    quality: '1080p Full HD Murni',
    speed: 'Direct Fast CDN',
    subtitles: 'Auto Sub Indo',
    brandColor: '#10b981', // Emerald
    badgeBg: 'rgba(16, 185, 129, 0.15)',
    badgeBorder: 'rgba(16, 185, 129, 0.4)',
    hasSyncSettings: false,
    getUrl: ({ mediaType, id, season = 1, episode = 1 }) => {
      // Jalur direct mirror Moviebox
      if (mediaType === 'tv') {
        return `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1&s=${season}&e=${episode}`;
      }
      return `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1`;
    },
  },
  {
    id: 'smashystream',
    name: 'Server 4: Bstation (Anime & Drakor)',
    tag: 'Khusus Anime & Drakor • 5 Server di Player',
    brand: 'Bstation',
    quality: '720p / 1080p HD',
    speed: 'Banyak Sumber Cadangan',
    subtitles: 'Pilihan Sub Indo',
    brandColor: '#8b5cf6', // Violet
    badgeBg: 'rgba(139, 92, 246, 0.15)',
    badgeBorder: 'rgba(139, 92, 246, 0.4)',
    hasSyncSettings: false,
    getUrl: ({ mediaType, id, season = 1, episode = 1 }) => {
      // SmashyStream: Sangat bagus untuk Anime & K-Drama dengan 5 mirror internal (F4, F5, dll)
      if (mediaType === 'tv') {
        return `https://player.smashy.stream/tv/${id}?s=${season}&e=${episode}`;
      }
      return `https://player.smashy.stream/movie/${id}`;
    },
  },
  {
    id: 'twoembed',
    name: 'Server 5: 2Embed VIP (Cadangan LK21)',
    tag: 'Alternatif Cadangan Film & Serial',
    brand: 'LK21',
    quality: '1080p HD',
    speed: 'Stabil',
    subtitles: 'Auto Subtitle',
    brandColor: '#f59e0b', // Amber
    badgeBg: 'rgba(245, 158, 11, 0.15)',
    badgeBorder: 'rgba(245, 158, 11, 0.4)',
    hasSyncSettings: false,
    getUrl: ({ mediaType, id, season = 1, episode = 1 }) => {
      if (mediaType === 'tv') {
        return `https://www.2embed.cc/embedtv/${id}&s=${season}&e=${episode}`;
      }
      return `https://www.2embed.cc/embed/${id}`;
    },
  },
  {
    id: 'autoembed',
    name: 'Server 6: AutoEmbed Cloud',
    tag: 'Cadangan Bebas Pop-up',
    brand: 'AutoEmbed',
    quality: '1080p Fast Buffer',
    speed: 'Stabil',
    subtitles: 'Default Sub Indo',
    brandColor: '#3b82f6', // Blue
    badgeBg: 'rgba(59, 130, 246, 0.15)',
    badgeBorder: 'rgba(59, 130, 246, 0.4)',
    hasSyncSettings: false,
    getUrl: ({ mediaType, id, season = 1, episode = 1 }) => {
      if (mediaType === 'tv') {
        return `https://player.autoembed.cc/embed/tv/${id}/${season}/${episode}`;
      }
      return `https://player.autoembed.cc/embed/movie/${id}`;
    },
  },
  {
    id: 'vidlink',
    name: 'Server 7: VidLink Pro HD',
    tag: '1080p / 4K UHD High Bitrate',
    brand: 'VidLink',
    quality: '1080p / 4K UHD',
    speed: 'High Bitrate',
    subtitles: 'Multi-Sub Indo',
    brandColor: '#6b7280', // Slate
    badgeBg: 'rgba(107, 114, 128, 0.15)',
    badgeBorder: 'rgba(107, 114, 128, 0.4)',
    hasSyncSettings: false,
    getUrl: ({ mediaType, id, season = 1, episode = 1 }) => {
      if (mediaType === 'tv') {
        return `https://vidlink.pro/tv/${id}/${season}/${episode}?primaryColor=e50914&autoplay=false`;
      }
      return `https://vidlink.pro/movie/${id}?primaryColor=e50914&autoplay=false`;
    },
  },
];

export const getEmbedUrl = (serverId, { mediaType, id, imdbId, season = 1, episode = 1 }) => {
  const server = STREAM_SERVERS.find((s) => s.id === serverId) || STREAM_SERVERS[0];
  return server.getUrl({ mediaType, id, imdbId, season, episode });
};
