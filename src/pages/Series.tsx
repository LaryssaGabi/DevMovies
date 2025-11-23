import { useEffect, useState } from 'react';
import { Clapperboard, Film, MonitorPlay } from 'lucide-react';
import Hero from '@/components/Hero';
import Slider from '@/components/Slider';
import Footer from '@/components/Footer';
import {
  getSeries,
  getSerieAir,
  getTopSerie,
  getAring,
} from '@/services/getData';

function Series() {
  const [serie, setSerie] = useState<any>(null);
  const [serieAir, setSerieAir] = useState([]);
  const [topSerie, setTopSerie] = useState([]);
  const [arings, setArings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [serieData, serieAirData, topSerieData, aringsData] = await Promise.all([
          getSeries(),
          getSerieAir(),
          getTopSerie(),
          getAring(),
        ]);

        setSerie(serieData);
        setSerieAir(serieAirData);
        setTopSerie(topSerieData);
        setArings(aringsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading || !serie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Hero item={serie} mediaType="tv" />

      <div className="space-y-4">
        {serieAir.length > 0 && (
          <Slider
            info={serieAir}
            title={
              <>
                <Clapperboard className="w-6 h-6 text-primary" />
                No Ar
              </>
            }
          />
        )}

        {topSerie.length > 0 && (
          <Slider
            info={topSerie}
            title={
              <>
                <Film className="w-6 h-6 text-primary" />
                Top Séries
              </>
            }
          />
        )}

        {arings.length > 0 && (
          <Slider
            info={arings}
            title={
              <>
                <MonitorPlay className="w-6 h-6 text-primary" />
                Exibindo Hoje
              </>
            }
          />
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Series;
