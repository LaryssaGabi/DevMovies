import { useState, useRef, useEffect } from 'react';
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

let globalId = 0;

function Slider({ info, title }: SliderProps) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const uniqueIdRef = useRef(++globalId);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const getRoute = (item: any) => {
    if (item.title || item.media_type === 'movie') {
      return `/detalhe/${item.id}`;
    }
    return `/detalheSeries/${item.id}`;
  };

  return (
    <section 
      className="py-8 px-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Título com padding alinhado */}
      <div className="px-4 md:px-12 lg:px-16 mb-6">
        <h2 className="text-2xl md:text-3xl font-display font-bold flex items-center gap-3">
          {title}
        </h2>
      </div>
      
      {/* Container do Swiper */}
      <div className="relative">
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView="auto"
          autoplay={false}
          loop={false}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            if (typeof swiper.params.navigation !== 'boolean') {
              const navigation = swiper.params.navigation;
              if (navigation) {
                navigation.prevEl = prevRef.current;
                navigation.nextEl = nextRef.current;
              }
            }
          }}
          breakpoints={{
            320: { 
              slidesPerView: 2.2, 
              spaceBetween: 12,
              slidesOffsetBefore: 16,
              slidesOffsetAfter: 16,
            },
            640: { 
              slidesPerView: 3.2, 
              spaceBetween: 16,
              slidesOffsetBefore: 48,
              slidesOffsetAfter: 48,
            },
            768: { 
              slidesPerView: 4.2, 
              spaceBetween: 16,
              slidesOffsetBefore: 48,
              slidesOffsetAfter: 48,
            },
            1024: { 
              slidesPerView: 5.2, 
              spaceBetween: 20,
              slidesOffsetBefore: 64,
              slidesOffsetAfter: 64,
            },
            1280: { 
              slidesPerView: 6.2, 
              spaceBetween: 20,
              slidesOffsetBefore: 64,
              slidesOffsetAfter: 64,
            },
          }}
          className="!overflow-visible"
        >
          {info.map((item, index) => (
            <SwiperSlide key={`${item.id}-${index}`} className="!w-auto">
              <div className="w-[160px] md:w-[200px] transition-transform duration-300 ease-in-out hover:scale-105 hover:z-10 relative">
                <MovieCard
                  item={item}
                  onClick={() => navigate(getRoute(item))}
                  mediaType={item.media_type}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Botão Anterior - Posicionado no canto esquerdo */}
        <button 
          ref={prevRef}
          className={`absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          aria-label="Slide anterior"
        >
          <svg 
            className="w-5 h-5 md:w-6 md:h-6 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Botão Próximo - Posicionado no canto direito */}
        <button 
          ref={nextRef}
          className={`absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          aria-label="Próximo slide"
        >
          <svg 
            className="w-5 h-5 md:w-6 md:h-6 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}

export default Slider;