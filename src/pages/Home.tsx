import { useEffect, useState } from 'react';
import { Clapperboard, Film, Popcorn, TrendingUp } from 'lucide-react';
import Hero from '@/components/Hero';
import Slider from '@/components/Slider';
import Footer from '@/components/Footer';
import {
  getMovies,
  getTopMovies,
  getTopSeries,
  getPopularSeries,
  getTopPeople,
} from '@/services/getData';

function Home() {
  const [movie, setMovie] = useState<any>(null);
  const [topMovies, setTopMovies] = useState([]);
  const [topSeries, setTopSeries] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);
  const [topPeople, setTopPeople] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [movieData, topMoviesData, topSeriesData, popularSeriesData, topPeopleData] =
          await Promise.all([
            getMovies(),
            getTopMovies(),
            getTopSeries(),
            getPopularSeries(),
            getTopPeople(),
          ]);

        setMovie(movieData);
        setTopMovies(topMoviesData);
        setTopSeries(topSeriesData);
        setPopularSeries(popularSeriesData);
        setTopPeople(topPeopleData);
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
        {topMovies.length > 0 && (
          <Slider
            info={topMovies}
            title={
              <>
                <Clapperboard className="w-6 h-6 text-primary" />
                Top Filmes
              </>
            }
          />
        )}

        {topSeries.length > 0 && (
          <Slider
            info={topSeries}
            title={
              <>
                <Popcorn className="w-6 h-6 text-primary" />
                Top Séries
              </>
            }
          />
        )}

        {popularSeries.length > 0 && (
          <Slider
            info={popularSeries}
            title={
              <>
                <Film className="w-6 h-6 text-primary" />
                Séries Populares
              </>
            }
          />
        )}

        {topPeople.length > 0 && (
          <Slider
            info={topPeople}
            title={
              <>
                <TrendingUp className="w-6 h-6 text-primary" />
                Em Breve
              </>
            }
          />
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Home;