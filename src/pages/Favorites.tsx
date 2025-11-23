import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import MovieCard from '@/components/MovieCard';
import Footer from '@/components/Footer';
import { getFavorites } from '@/utils/favorites';

function Favorites() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    const data = getFavorites();
    setFavorites(data);
  };

  const getRoute = (item: any) => {
    if (item.media_type === 'movie' || item.title) {
      return `/detalhe/${item.id}`;
    }
    return `/detalheSeries/${item.id}`;
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Heart className="w-10 h-10 text-primary" fill="currentColor" />
              <h1 className="text-4xl md:text-5xl font-display font-bold">
                Meus Favoritos
              </h1>
            </div>
            <p className="text-muted-foreground">
              {favorites.length} {favorites.length === 1 ? 'favorito' : 'favoritos'}
            </p>
          </div>

          {favorites.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {favorites.map((item) => (
                <MovieCard
                  key={`${item.id}-${item.media_type}`}
                  item={item}
                  onClick={() => {
                    navigate(getRoute(item));
                  }}
                  mediaType={item.media_type}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Heart className="w-20 h-20 text-muted-foreground/20 mx-auto mb-4" />
              <h2 className="text-2xl font-display font-bold mb-2">
                Nenhum favorito ainda
              </h2>
              <p className="text-muted-foreground mb-6">
                Comece a adicionar seus filmes e séries favoritos!
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Favorites;
