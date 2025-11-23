import { useState, useEffect } from 'react';
import { Search as SearchIcon, Film, Tv, SlidersHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import MovieCard from '@/components/MovieCard';
import Footer from '@/components/Footer';
import { searchMulti, getGenres, discoverByGenre } from '@/services/getData';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [mediaType, setMediaType] = useState<'all' | 'movie' | 'tv'>('all');
  const [genres, setGenres] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchGenres() {
      try {
        const [movieGenres, tvGenres] = await Promise.all([
          getGenres('movie'),
          getGenres('tv'),
        ]);
        const combined = [...movieGenres, ...tvGenres];
        const unique = combined.filter(
          (genre, index, self) => index === self.findIndex((g) => g.id === genre.id)
        );
        setGenres(unique);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    }

    fetchGenres();
  }, []);

  const handleSearch = async () => {
    if (!query.trim() && !selectedGenre) return;

    setLoading(true);
    try {
      if (selectedGenre) {
        const type = mediaType === 'all' ? 'movie' : mediaType;
        const data = await discoverByGenre(selectedGenre, type);
        setResults(data.results || []);
      } else {
        const data = await searchMulti(query);
        let filtered = data.results || [];
        
        if (mediaType !== 'all') {
          filtered = filtered.filter((item: any) => item.media_type === mediaType);
        }
        
        setResults(filtered);
      }
    } catch (error) {
      console.error('Error searching:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query || selectedGenre) {
      const timer = setTimeout(() => {
        handleSearch();
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setResults([]);
    }
  }, [query, selectedGenre, mediaType]);

  const getRoute = (item: any) => {
    const type = item.media_type || mediaType;
    if (type === 'movie' || item.title) {
      return `/detalhe/${item.id}`;
    }
    return `/detalheSeries/${item.id}`;
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-display font-bold">
              Buscar Conteúdo
            </h1>
            <p className="text-muted-foreground">
              Encontre seus filmes e séries favoritos
            </p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar por título..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-12 h-14 text-lg bg-card border-2"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant={mediaType === 'all' ? 'default' : 'outline'}
                onClick={() => setMediaType('all')}
                className="gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Todos
              </Button>
              <Button
                variant={mediaType === 'movie' ? 'default' : 'outline'}
                onClick={() => setMediaType('movie')}
                className="gap-2"
              >
                <Film className="w-4 h-4" />
                Filmes
              </Button>
              <Button
                variant={mediaType === 'tv' ? 'default' : 'outline'}
                onClick={() => setMediaType('tv')}
                className="gap-2"
              >
                <Tv className="w-4 h-4" />
                Séries
              </Button>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                Filtrar por Gênero
              </h3>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={selectedGenre === null ? 'default' : 'outline'}
                  className="cursor-pointer hover:bg-primary/20 transition-colors"
                  onClick={() => setSelectedGenre(null)}
                >
                  Todos
                </Badge>
                {genres.map((genre) => (
                  <Badge
                    key={genre.id}
                    variant={selectedGenre === genre.id ? 'default' : 'outline'}
                    className="cursor-pointer hover:bg-primary/20 transition-colors"
                    onClick={() => setSelectedGenre(genre.id)}
                  >
                    {genre.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
            </div>
          ) : results.length > 0 ? (
            <div>
              <p className="text-muted-foreground mb-4">
                {results.length} resultado{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {results.map((item) => (
                  <MovieCard
                    key={item.id}
                    item={item}
                    onClick={() => navigate(getRoute(item))}
                    mediaType={item.media_type}
                  />
                ))}
              </div>
            </div>
          ) : query || selectedGenre ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nenhum resultado encontrado</p>
            </div>
          ) : null}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Search;
