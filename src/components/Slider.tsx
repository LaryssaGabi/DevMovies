import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import MovieCard from './MovieCard';
import 'swiper/css';
import 'swiper/css/navigation';

interface SliderProps {
  info: any[];
  title: React.ReactNode;
}

function Slider({ info, title }: SliderProps) {
  const navigate = useNavigate();

  const getRoute = (item: any) => {
    if (item.title || item.media_type === 'movie') {
      return `/detalhe/${item.id}`;
    }
    return `/detalheSeries/${item.id}`;
  };

  return (
    <section className="py-8 px-4">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-display font-bold mb-6 flex items-center gap-3">
          {title}
        </h2>
        
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView="auto"
          navigation
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 12 },
            640: { slidesPerView: 3, spaceBetween: 16 },
            768: { slidesPerView: 4, spaceBetween: 16 },
            1024: { slidesPerView: 5, spaceBetween: 20 },
            1280: { slidesPerView: 6, spaceBetween: 20 },
          }}
          className="!overflow-visible"
        >
          {info.map((item, index) => (
            <SwiperSlide key={`${item.id}-${index}`} className="!w-auto">
              <div className="w-[160px] md:w-[200px]">
                <MovieCard
                  item={item}
                  onClick={() => navigate(getRoute(item))}
                  mediaType={item.media_type}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default Slider;
