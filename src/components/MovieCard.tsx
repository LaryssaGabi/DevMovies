import { useState } from 'react';
import { Heart, Play, Info } from 'lucide-react';
import { getImages } from '@/utils/getImages';
import { cn } from '@/lib/utils';
import { addFavorite, removeFavorite, isFavorite } from '@/utils/favorites';

interface MovieCardProps {
  item: any;
  onClick: () => void;
  mediaType?: 'movie' | 'tv';
}

function MovieCard({ item, onClick, mediaType = 'movie' }: MovieCardProps) {
  const [favorite, setFavorite] = useState(
    isFavorite(item.id, item.media_type || mediaType)
  );
  const [imageLoaded, setImageLoaded] = useState(false);

  const title = item.title || item.name;
  const year = item.release_date || item.first_air_date;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const type = item.media_type || mediaType;
    
    if (favorite) {
      removeFavorite(item.id, type);
    } else {
      addFavorite({
        id: item.id,
        title: item.title,
        name: item.name,
        poster_path: item.poster_path,
        media_type: type,
      });
    }
    setFavorite(!favorite);
  };

  return (
    <div
      className="group relative cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-muted">
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-muted" />
        )}
        <img
          src={getImages(item.poster_path || item.profile_path || '', 'w500')}
          alt={title}
          className={cn(
            'w-full h-full object-cover transition-all duration-500',
            'group-hover:scale-110',
            imageLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setImageLoaded(true)}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <button
          onClick={handleFavoriteClick}
          className={cn(
            'absolute top-2 right-2 p-2 rounded-full backdrop-blur-md transition-all duration-300',
            'opacity-0 group-hover:opacity-100 hover:scale-110',
            favorite
              ? 'bg-primary/90 text-white'
              : 'bg-background/50 text-foreground hover:bg-primary/20'
          )}
        >
          <Heart
            className="w-4 h-4"
            fill={favorite ? 'currentColor' : 'none'}
          />
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex gap-2">
            <button
              onClick={onClick}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-primary hover:bg-primary/90 rounded-lg text-sm font-medium transition-colors"
            >
              <Play className="w-4 h-4" fill="currentColor" />
              Ver Detalhes
            </button>
          </div>
        </div>
      </div>

      <div className="mt-3 space-y-1">
        <h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">
          {title}
        </h3>
        {year && (
          <p className="text-sm text-muted-foreground">
            {new Date(year).getFullYear()}
          </p>
        )}
      </div>
    </div>
  );
}

export default MovieCard;
