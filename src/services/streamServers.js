// Streaming Embed Server Providers (Netflix VIP, Prime Video, Disney+, LK21 & Idlix)
// Optimized for: 1080p/4K resolution, accurate TMDB/IMDb title matching, and Indonesian subtitle synchronization

export const STREAM_SERVERS = [
  {
    id: 'netflix_vip',
    name: 'Server 1: Netflix VIP',
    tag: 'Ultra HD 4K • Sub Indo Pas',
    brand: 'Netflix',
    quality: '1080p / 4K Ultra HD',
    speed: 'Super Cepat (Rekomendasi Utama)',
    subtitles: 'Sub Indo Tersinkron (Ada Offset Delay di ⚙️)',
    brandColor: '#E50914', // Netflix Red
    badgeBg: 'rgba(229, 9, 20, 0.15)',
    badgeBorder: 'rgba(229, 9, 20, 0.4)',
    hasSyncSettings: true,
    getUrl: ({ mediaType, id, imdbId, season = 1, episode = 1 }) => {
      // VidLink Pro: high-bitrate 1080p/4K, native subtitle sync selector & multi-audio
      if (mediaType === 'tv') {
        return `https://vidlink.pro/tv/${id}/${season}/${episode}?primaryColor=e50914&secondaryColor=12141a&iconColor=ffffff&autoplay=false&title=true`;
      }
      return `https://vidlink.pro/movie/${id}?primaryColor=e50914&secondaryColor=12141a&iconColor=ffffff&autoplay=false&title=true`;
    },
  },
  {
    id: 'prime_video',
    name: 'Server 2: Prime Video',
    tag: '1080p Full HD • CDN Cepat',
    brand: 'Prime',
    quality: '1080p Full HD Murni',
    speed: 'Ultra Stabil & Jernih',
    subtitles: 'Auto Sub Indo 100% Sinkron',
    brandColor: '#00A8E1', // Prime Blue
    badgeBg: 'rgba(0, 168, 225, 0.15)',
    badgeBorder: 'rgba(0, 168, 225, 0.4)',
    hasSyncSettings: false,
    getUrl: ({ mediaType, id, imdbId, season = 1, episode = 1 }) => {
      // Embed.su: Dedicated CDN for 1080p high bitrate with accurate title mapping
      const targetId = imdbId || id;
      if (mediaType === 'tv') {
        return `https://embed.su/embed/tv/${id}/${season}/${episode}`;
      }
      return `https://embed.su/embed/movie/${targetId}`;
    },
  },
  {
    id: 'disney_stream',
    name: 'Server 3: Disney+ Stream',
    tag: '1080p HD • Judul 100% Pas',
    brand: 'Disney+',
    quality: '1080p HD 60FPS',
    speed: 'Sangat Cepat',
    subtitles: 'Multi-Sub Indo & Inggris',
    brandColor: '#113CCF', // Disney Blue
    badgeBg: 'rgba(17, 60, 207, 0.18)',
    badgeBorder: 'rgba(17, 60, 207, 0.4)',
    hasSyncSettings: false,
    getUrl: ({ mediaType, id, imdbId, season = 1, episode = 1 }) => {
      // Vidsrc.cc v2: Maps directly to TMDB ID, prevents title mismatch
      if (mediaType === 'tv') {
        return `https://vidsrc.cc/v2/embed/tv/${id}/${season}/${episode}?autoPlay=false`;
      }
      return `https://vidsrc.cc/v2/embed/movie/${id}?autoPlay=false`;
    },
  },
  {
    id: 'idlix_prime',
    name: 'Server 4: Idlix Prime',
    tag: 'Sub Indo Manual • Anti Telat',
    brand: 'Idlix',
    quality: '1080p HD',
    speed: 'Stabil',
    subtitles: 'Sub Indo Terjemahan Manual Pas',
    brandColor: '#f59e0b', // Amber
    badgeBg: 'rgba(245, 158, 11, 0.15)',
    badgeBorder: 'rgba(245, 158, 11, 0.4)',
    hasSyncSettings: false,
    getUrl: ({ mediaType, id, imdbId, season = 1, episode = 1 }) => {
      // Vidsrc.xyz with explicit TMDB mapping and Indonesian subtitle flag
      if (mediaType === 'tv') {
        return `https://vidsrc.xyz/embed/tv?tmdb=${id}&season=${season}&episode=${episode}&ds_lang=id`;
      }
      return `https://vidsrc.xyz/embed/movie?tmdb=${id}&ds_lang=id`;
    },
  },
  {
    id: 'multiembed',
    name: 'Server 5: MultiEmbed Ultra',
    tag: 'VIP Server • 1080p',
    brand: 'MultiEmbed',
    quality: '1080p Full HD',
    speed: 'Cepat & Multi-Server',
    subtitles: 'Subtitle Indonesia Lengkap',
    brandColor: '#10b981', // Emerald
    badgeBg: 'rgba(16, 185, 129, 0.15)',
    badgeBorder: 'rgba(16, 185, 129, 0.4)',
    hasSyncSettings: false,
    getUrl: ({ mediaType, id, imdbId, season = 1, episode = 1 }) => {
      // MultiEmbed: Uses tmdb=1 flag to guarantee title accuracy
      if (mediaType === 'tv') {
        return `https://multiembed.mov/?video_id=${id}&tmdb=1&s=${season}&e=${episode}`;
      }
      return `https://multiembed.mov/?video_id=${id}&tmdb=1`;
    },
  },
  {
    id: 'smashystream',
    name: 'Server 6: Smashy 5-in-1',
    tag: 'Pilihan 5 Sumber • Anti Buffering',
    brand: 'Smashy',
    quality: '720p / 1080p Source',
    speed: 'Bisa Ganti Sumber di Dalam Player',
    subtitles: 'Sub Indo Pilihan Lengkap',
    brandColor: '#8b5cf6', // Violet
    badgeBg: 'rgba(139, 92, 246, 0.15)',
    badgeBorder: 'rgba(139, 92, 246, 0.4)',
    hasSyncSettings: true,
    getUrl: ({ mediaType, id, imdbId, season = 1, episode = 1 }) => {
      // SmashyStream: Has 5 internal mirror sources (F4, F5, etc.) inside the player
      if (mediaType === 'tv') {
        return `https://player.smashy.stream/tv/${id}?s=${season}&e=${episode}`;
      }
      return `https://player.smashy.stream/movie/${id}`;
    },
  },
  {
    id: 'autoembed',
    name: 'Server 7: AutoEmbed Cloud',
    tag: 'Cadangan Cepat',
    brand: 'Cloud',
    quality: '1080p Fast Buffer',
    speed: 'Stabil Tanpa Iklan Pop-up',
    subtitles: 'Default Sub Indo',
    brandColor: '#6b7280', // Slate
    badgeBg: 'rgba(107, 114, 128, 0.15)',
    badgeBorder: 'rgba(107, 114, 128, 0.4)',
    hasSyncSettings: false,
    getUrl: ({ mediaType, id, imdbId, season = 1, episode = 1 }) => {
      if (mediaType === 'tv') {
        return `https://player.autoembed.cc/embed/tv/${id}/${season}/${episode}`;
      }
      return `https://player.autoembed.cc/embed/movie/${id}`;
    },
  },
];

export const getEmbedUrl = (serverId, { mediaType, id, imdbId, season = 1, episode = 1 }) => {
  const server = STREAM_SERVERS.find((s) => s.id === serverId) || STREAM_SERVERS[0];
  return server.getUrl({ mediaType, id, imdbId, season, episode });
};
