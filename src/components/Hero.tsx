import { useState } from 'react';
import { Play, Info, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getImages } from '@/utils/getImages';
import { Button } from '@/components/ui/button';
import { addFavorite, removeFavorite, isFavorite } from '@/utils/favorites';
import Modal from './Modal';

interface HeroProps {
  item: any;
  mediaType?: 'movie' | 'tv';
}

function Hero({ item, mediaType = 'movie' }: HeroProps) {
  const [showModal, setShowModal] = useState(false);
  const [favorite, setFavorite] = useState(isFavorite(item.id, mediaType));
  const navigate = useNavigate();

  const title = item.title || item.name;
  const route = mediaType === 'movie' ? `/detalhe/${item.id}` : `/detalheSeries/${item.id}`;

  const handleFavorite = () => {
    if (favorite) {
      removeFavorite(item.id, mediaType);
    } else {
      addFavorite({
        id: item.id,
        title: item.title,
        name: item.name,
        poster_path: item.poster_path,
        media_type: mediaType,
      });
    }
    setFavorite(!favorite);
  };

  return (
    <>
      <div className="relative h-[80vh] md:h-[90vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={getImages(item.backdrop_path)}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
        </div>

        <div className="relative h-full container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between h-full gap-8 pt-20">
            <div className="flex-1 space-y-6 text-center md:text-left max-w-2xl">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight">
                {title}
              </h1>
              
              <p className="text-base md:text-lg text-muted-foreground line-clamp-3 md:line-clamp-4">
                {item.overview}
              </p>

              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <Button
                  size="lg"
                  className="gap-2 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/50 transition-all"
                  onClick={() => navigate(route)}
                >
                  <Play className="w-5 h-5" fill="currentColor" />
                  Assistir Agora
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-2 hover:bg-muted/50"
                  onClick={() => setShowModal(true)}
                >
                  <Info className="w-5 h-5" />
                  Trailer
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-2 hover:bg-muted/50"
                  onClick={handleFavorite}
                >
                  <Heart
                    className="w-5 h-5"
                    fill={favorite ? 'currentColor' : 'none'}
                  />
                  {favorite ? 'Remover' : 'Favoritar'}
                </Button>
              </div>
            </div>

            <div className="w-64 md:w-80 lg:w-96 shrink-0">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity" />
                <img
                  src={getImages(item.poster_path)}
                  alt={title}
                  className="relative w-full rounded-xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <Modal
          movieId={item.id}
          setShowModal={setShowModal}
          mediaType={mediaType}
        />
      )}
    </>
  );
}

export default Hero;
