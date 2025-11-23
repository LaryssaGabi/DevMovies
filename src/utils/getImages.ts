export function getImages(path: string, size: 'original' | 'w500' = 'original') {
  if (!path) return '/placeholder.svg';
  return `https://image.tmdb.org/t/p/${size}${path}`;
}
