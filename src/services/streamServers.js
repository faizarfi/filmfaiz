// Streaming Embed Server Providers (MultiEmbed, VidSrc, SmashyStream, AutoEmbed, 2Embed)
// Menempatkan server paling stabil & working (MultiEmbed) sebagai Server 1 Utama tanpa embel-embel berbayar

export const STREAM_SERVERS = [
  {
    id: 'multiembed',
    name: 'Server 1: MultiEmbed (Utama)',
    tag: 'Paling Stabil • 1080p HD',
    brand: 'MultiEmbed',
    quality: '1080p Full HD',
    speed: 'Sangat Cepat & Pasti Jalan',
    subtitles: 'Subtitle Indonesia Lengkap',
    brandColor: '#e50914', // Faiz Red
    badgeBg: 'rgba(229, 9, 20, 0.15)',
    badgeBorder: 'rgba(229, 9, 20, 0.4)',
    hasSyncSettings: false,
    getUrl: ({ mediaType, id, season = 1, episode = 1 }) => {
      // MultiEmbed: Terbukti paling stabil dan langsung play
      if (mediaType === 'tv') {
        return `https://multiembed.mov/?video_id=${id}&tmdb=1&s=${season}&e=${episode}`;
      }
      return `https://multiembed.mov/?video_id=${id}&tmdb=1`;
    },
  },
  {
    id: 'multiembed_direct',
    name: 'Server 2: MultiEmbed Direct',
    tag: 'Mirror Cepat • Bebas Buffering',
    brand: 'MultiEmbed',
    quality: '1080p Full HD Murni',
    speed: 'Ultra Cepat Direct Stream',
    subtitles: 'Auto Subtitle Indonesia',
    brandColor: '#10b981', // Emerald
    badgeBg: 'rgba(16, 185, 129, 0.15)',
    badgeBorder: 'rgba(16, 185, 129, 0.4)',
    hasSyncSettings: false,
    getUrl: ({ mediaType, id, season = 1, episode = 1 }) => {
      // Jalur direct MultiEmbed
      if (mediaType === 'tv') {
        return `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1&s=${season}&e=${episode}`;
      }
      return `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1`;
    },
  },
  {
    id: 'smashystream',
    name: 'Server 3: Smashy 5-in-1',
    tag: 'Bisa Ganti Sumber di Dalam Player',
    brand: 'Smashy',
    quality: '720p / 1080p HD',
    speed: 'Banyak Sumber Cadangan',
    subtitles: 'Pilihan Sub Indo Lengkap',
    brandColor: '#8b5cf6', // Violet
    badgeBg: 'rgba(139, 92, 246, 0.15)',
    badgeBorder: 'rgba(139, 92, 246, 0.4)',
    hasSyncSettings: false,
    getUrl: ({ mediaType, id, season = 1, episode = 1 }) => {
      // SmashyStream: Memiliki 5 server internal (F4, F5, dll) di dalam controllernya
      if (mediaType === 'tv') {
        return `https://player.smashy.stream/tv/${id}?s=${season}&e=${episode}`;
      }
      return `https://player.smashy.stream/movie/${id}`;
    },
  },
  {
    id: 'vidsrc',
    name: 'Server 4: VidSrc (LK21 / Idlix)',
    tag: 'Server Populer Film & Series',
    brand: 'VidSrc',
    quality: '1080p HD',
    speed: 'Stabil',
    subtitles: 'Subtitle Indonesia',
    brandColor: '#f59e0b', // Amber
    badgeBg: 'rgba(245, 158, 11, 0.15)',
    badgeBorder: 'rgba(245, 158, 11, 0.4)',
    hasSyncSettings: false,
    getUrl: ({ mediaType, id, season = 1, episode = 1 }) => {
      if (mediaType === 'tv') {
        return `https://vidsrc.me/embed/tv?tmdb=${id}&season=${season}&episode=${episode}`;
      }
      return `https://vidsrc.me/embed/movie?tmdb=${id}`;
    },
  },
  {
    id: 'autoembed',
    name: 'Server 5: AutoEmbed Cloud',
    tag: 'Cadangan Cepat',
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
    id: 'twoembed',
    name: 'Server 6: 2Embed VIP',
    tag: 'Alternatif Cadangan',
    brand: '2Embed',
    quality: '1080p HD',
    speed: 'Stabil',
    subtitles: 'Auto Subtitle',
    brandColor: '#6366f1', // Indigo
    badgeBg: 'rgba(99, 102, 241, 0.15)',
    badgeBorder: 'rgba(99, 102, 241, 0.4)',
    hasSyncSettings: false,
    getUrl: ({ mediaType, id, season = 1, episode = 1 }) => {
      if (mediaType === 'tv') {
        return `https://www.2embed.cc/embedtv/${id}&s=${season}&e=${episode}`;
      }
      return `https://www.2embed.cc/embed/${id}`;
    },
  },
  {
    id: 'vidlink',
    name: 'Server 7: VidLink Fast',
    tag: '4K / 1080p High Bitrate',
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
