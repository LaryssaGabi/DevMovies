import { useEffect, useState } from 'react';
import { Drama, Film, Video } from 'lucide-react';
import Hero from '@/components/Hero';
import Slider from '@/components/Slider';
import Footer from '@/components/Footer';
import {
  getMovie,
  getPopularMovie,
  getMovieViewNow,
  getMovieView,
} from '@/services/getData';

function Movies() {
  const [movie, setMovie] = useState<any>(null);
  const [popularMovies, setPopularMovies] = useState([]);
  const [movieViewNow, setMovieViewNow] = useState([]);
  const [movieView, setMovieView] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [movieData, popularMoviesData, movieViewNowData, movieViewData] =
          await Promise.all([
            getMovie(),
            getPopularMovie(),
            getMovieViewNow(),
            getMovieView(),
          ]);

        setMovie(movieData);
        setPopularMovies(popularMoviesData);
        setMovieViewNow(movieViewNowData);
        setMovieView(movieViewData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading || !movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Hero item={movie} mediaType="movie" />

      <div className="space-y-4">
        {popularMovies.length > 0 && (
          <Slider
            info={popularMovies}
            title={
              <>
                <Film className="w-6 h-6 text-primary" />
                Filmes Populares
              </>
            }
          />
        )}

        {movieViewNow.length > 0 && (
          <Slider
            info={movieViewNow}
            title={
              <>
                <Video className="w-6 h-6 text-primary" />
                Em Breve
              </>
            }
          />
        )}

        {movieView.length > 0 && (
          <Slider
            info={movieView}
            title={
              <>
                <Drama className="w-6 h-6 text-primary" />
                Melhor Avaliados
              </>
            }
          />
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Movies;
