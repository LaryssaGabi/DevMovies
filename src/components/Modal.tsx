import { useEffect, useState } from 'react';
import { X, VideoOff } from 'lucide-react';
import { getMovieVideos, getSerieVideos } from '@/services/getData';

interface ModalProps {
  movieId: number;
  setShowModal: (show: boolean) => void;
  mediaType?: 'movie' | 'tv';
}

function Modal({ movieId, setShowModal, mediaType = 'movie' }: ModalProps) {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const data = mediaType === 'movie' 
          ? await getMovieVideos(movieId)
          : await getSerieVideos(movieId);
        setVideos(data || []);
      } catch (error) {
        console.error('Error fetching videos:', error);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, [movieId, mediaType]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm p-4"
      onClick={() => setShowModal(false)}
    >
      <div
        className="relative w-full max-w-4xl bg-card rounded-xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 z-10 p-2 bg-background/80 hover:bg-background rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {loading ? (
          <div className="aspect-video flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
          </div>
        ) : videos.length > 0 && videos[0]?.key ? (
          <div className="aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${videos[0].key}?autoplay=1`}
              title="Trailer"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="aspect-video flex flex-col items-center justify-center gap-4 p-8 text-center">
            <VideoOff className="w-16 h-16 text-muted-foreground" />
            <p className="text-lg text-muted-foreground">
              Trailer não disponível para este conteúdo.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
