export interface FavoriteItem {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  media_type: 'movie' | 'tv';
}

const FAVORITES_KEY = 'cinema_favorites';

export function getFavorites(): FavoriteItem[] {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function addFavorite(item: FavoriteItem): void {
  const favorites = getFavorites();
  const exists = favorites.some((fav) => fav.id === item.id && fav.media_type === item.media_type);
  
  if (!exists) {
    favorites.push(item);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

export function removeFavorite(id: number, mediaType: 'movie' | 'tv'): void {
  const favorites = getFavorites();
  const filtered = favorites.filter(
    (fav) => !(fav.id === id && fav.media_type === mediaType)
  );
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
}

export function isFavorite(id: number, mediaType: 'movie' | 'tv'): boolean {
  const favorites = getFavorites();
  return favorites.some((fav) => fav.id === id && fav.media_type === mediaType);
}
