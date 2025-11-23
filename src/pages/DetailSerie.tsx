import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Star, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Slider from '@/components/Slider';
import Footer from '@/components/Footer';
import { getSerieById, getSerieCredits, getSerieSimilar, getSerieVideos } from '@/services/getData';
import { getImages } from '@/utils/getImages';
import { addFavorite, removeFavorite, isFavorite } from '@/utils/favorites';

function DetailSerie() {
  const { id } = useParams();
  const [serie, setSerie] = useState<any>(null);
  const [videos, setVideos] = useState<any[]>([]);
  const [credits, setCredits] = useState<any[]>([]);
  const [similar, setSimilar] = useState<any[]>([]);
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchData();
      setFavorite(isFavorite(Number(id), 'tv'));
    }
  }, [id]);

  async function fetchData() {
    try {
      const [serieData, videosData, creditsData, similarData] = await Promise.all([
        getSerieById(Number(id)),
        getSerieVideos(Number(id)),
        getSerieCredits(Number(id)),
        getSerieSimilar(Number(id)),
      ]);

      setSerie(serieData);
      setVideos(videosData || []);
      setCredits(creditsData || []);
      setSimilar(similarData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleFavorite = () => {
    if (!serie) return;

    if (favorite) {
      removeFavorite(serie.id, 'tv');
    } else {
      addFavorite({
        id: serie.id,
        name: serie.name,
        poster_path: serie.poster_path,
        media_type: 'tv',
      });
    }
    setFavorite(!favorite);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!serie) return null;

  return (
    <div className="min-h-screen pt-20 overflow-x-hidden">
      <div
        className="relative h-[60vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(${getImages(serie.backdrop_path)})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      <div className="container mx-auto px-4 -mt-40 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="w-64 shrink-0 mx-auto md:mx-0">
            <img
              src={getImages(serie.poster_path)}
              alt={serie.name}
              className="w-full rounded-xl shadow-2xl"
            />
          </div>

          <div className="flex-1 space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                {serie.name}
              </h1>

              <div className="flex flex-wrap gap-3 mb-4">
                {serie.genres?.map((genre: any) => (
                  <Badge key={genre.id} variant="secondary">
                    {genre.name}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(serie.first_air_date).getFullYear()}
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  {serie.vote_average.toFixed(1)}
                </div>
                <div>
                  {serie.number_of_seasons} {serie.number_of_seasons === 1 ? 'Temporada' : 'Temporadas'}
                </div>
              </div>

              <Button onClick={handleFavorite} variant="outline" className="gap-2 mb-6">
                <Heart className="w-4 h-4" fill={favorite ? 'currentColor' : 'none'} />
                {favorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
              </Button>
            </div>

            <div>
              <h2 className="text-xl font-display font-bold mb-3">Sinopse</h2>
              <p className="text-muted-foreground leading-relaxed">{serie.overview}</p>
            </div>

            {credits.length > 0 && (
              <div>
                <h2 className="text-xl font-display font-bold mb-4">Elenco Principal</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {credits.slice(0, 5).map((person: any) => (
                    <div key={person.id} className="text-center">
                      <img
                        src={getImages(person.profile_path, 'w500')}
                        alt={person.name}
                        className="w-full aspect-square object-cover rounded-lg mb-2"
                      />
                      <p className="font-medium text-sm">{person.name}</p>
                      <p className="text-xs text-muted-foreground">{person.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {videos.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-display font-bold mb-6">Vídeos e Trailers</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {videos.slice(0, 4).map((video: any) => (
                <div key={video.id}>
                  <h3 className="font-semibold mb-2">{video.name}</h3>
                  <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.key}`}
                      title={video.name}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {similar.length > 0 && <Slider info={similar} title="Séries Similares" />}
      </div>

      <Footer />
    </div>
  );
}

export default DetailSerie;
