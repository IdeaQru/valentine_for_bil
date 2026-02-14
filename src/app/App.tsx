import { Heart, Sparkles, Star, Volume2, VolumeX } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

// Import images dari public folder (tidak perlu import, langsung pakai path)
// const img1 = "/images/1cf36f3f44954ca5542baf9f8294553c3f0306b4.png";
// const img2 = "/images/e5a14ab602541adc68bf128b575c3d728e6e2606.png";
// const img3 = "/images/dd8fd8af77360834cc08f9c882809d32e9fd9e79.png";

// Type definitions
interface ConfettiItem {
  id: number;
  x: number;
  y: number;
  rotation: number;
  delay: number;
}

interface FloatingEmoji {
  id: number;
  x: number;
  y: number;
  emoji: string;
  delay: number;
}

interface Message {
  text: string;
  icon: 'flower' | 'rose' | 'teddy' | 'gift' | 'heart';
  color: 'rose' | 'pink' | 'red';
  emoji: string;
}

export default function App() {
  const [isCelebrating, setIsCelebrating] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [confetti, setConfetti] = useState<ConfettiItem[]>([]);
  const [photosAnimated, setPhotosAnimated] = useState<boolean>(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState<number>(0);
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  // Gambar dari public/images/
  const images = [
    "/images/1cf36f3f44954ca5542baf9f8294553c3f0306b4.png",
    "/images/e5a14ab602541adc68bf128b575c3d728e6e2606.png",
    "/images/dd8fd8af77360834cc08f9c882809d32e9fd9e79.png"
  ];

  const messages: Message[] = [
    {
      text: "Semoga kamu bisa melewati setiap hal dengan tegar dan jangan biarkan dunia mengubah senyum indahmu ✨",
      icon: "flower",
      color: "rose",
      emoji: "🌸"
    },
    {
      text: "Kamu menerangi duniaku dengan kehadiranmu, dan setiap momen bersamamu terasa seperti mimpi indah 🌹",
      icon: "rose",
      color: "pink",
      emoji: "🌹"
    },
    {
      text: "Senyummu adalah hadiah paling berharga yang pernah aku terima. Tetaplah bersinar, sayangku! 🧸",
      icon: "teddy",
      color: "red",
      emoji: "🧸"
    },
    {
      text: "Di tengah hiruk pikuk dunia, kamu adalah kedamaianku, kegembiraanku, dan Valentine selamanya 🎁",
      icon: "gift",
      color: "rose",
      emoji: "🎁"
    },
    {
      text: "Setiap hari bersamamu adalah perayaan cinta, tawa, dan kebahagiaan tanpa akhir. Aku mencintaimu! 💝",
      icon: "heart",
      color: "pink",
      emoji: "💝"
    }
  ];

  // Efek untuk floating emojis background
  useEffect(() => {
    if (showMessage) {
      const currentEmoji = messages[currentMessageIndex].emoji;
      const newFloatingEmojis: FloatingEmoji[] = Array.from({ length: 25 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: -20 + Math.random() * 40,
        emoji: currentEmoji,
        delay: Math.random() * 3,
      }));
      setFloatingEmojis(newFloatingEmojis);
    }
  }, [showMessage, currentMessageIndex, messages]);

  // Handle music playback
  const toggleMusic = () => {

  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Auto play music when component mounts (with user interaction)
  // ✅ AUTOPLAY MUSIK - SUPER AGRESIF
  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            console.log('🎵 Music started playing!');
          })
          .catch(error => {
            console.log('⚠️ Autoplay prevented by browser:', error);
          });
      }
    };

    // Coba play setelah 500ms (delay untuk load audio)
    const timer = setTimeout(playAudio, 500);

    // Play on ANY user interaction
    document.addEventListener('click', playAudio, { once: true });
    document.addEventListener('touchstart', playAudio, { once: true });
    document.addEventListener('keydown', playAudio, { once: true });
    document.addEventListener('scroll', playAudio, { once: true });
    document.addEventListener('mousemove', playAudio, { once: true });

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', playAudio);
      document.removeEventListener('touchstart', playAudio);
      document.removeEventListener('keydown', playAudio);
      document.removeEventListener('scroll', playAudio);
      document.removeEventListener('mousemove', playAudio);
    };
  }, []); // ← PENTING: Dependency array KOSONG!

  const handleCelebrate = () => {
    setIsCelebrating(true);
    setPhotosAnimated(true);

    const newConfetti: ConfettiItem[] = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 50,
      rotation: Math.random() * 360,
      delay: Math.random() * 0.8,
    }));
    setConfetti(newConfetti);

    setTimeout(() => {
      setShowMessage(true);
    }, 1000);

    setTimeout(() => {
      setConfetti([]);
      setIsCelebrating(false);
      setPhotosAnimated(false);
    }, 3500);
  };


  const handleNext = () => {
    setShowMessage(false);

    setTimeout(() => {
      setCurrentMessageIndex((prev: number) => (prev + 1) % messages.length);
      handleCelebrate();
    }, 300);
  };

  const handleClose = () => {
    setShowMessage(false);
    setIsCelebrating(false);
    setPhotosAnimated(false);
    setConfetti([]);
    setFloatingEmojis([]);
  };

  const currentMessage = messages[currentMessageIndex];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200">
      {/* Background Music dari public/music/ */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        className="hidden"
      >
        <source src="/music/valentine-song.mp3" type="audio/mpeg" />
      </audio>

      {/* Music Control Button - Fixed Position */}
      <div className="fixed top-6 right-6 z-50 flex gap-3">
        {/* Mute/Unmute Button */}
        <button
          onClick={toggleMute}
          className="group relative p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-rose-200/50"
          title={isMuted ? "Nyalakan Suara" : "Matikan Suara"}
        >
          {isMuted ? (
            <VolumeX className="text-rose-500" size={24} />
          ) : (
            <Volume2 className="text-rose-500 animate-pulse" size={24} />
          )}

          {/* Tooltip */}
          <div className="absolute right-0 top-full mt-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {isMuted ? "Nyalakan Suara" : "Matikan Suara"}
          </div>
        </button>

        {/* Play/Pause Button */}
        <button
          onClick={toggleMusic}
          className="group relative p-3 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
          title={isPlaying ? "Jeda Musik" : "Putar Musik"}
        >
          {isPlaying ? (
            <div className="flex gap-1">
              <div className="w-1 h-5 bg-white rounded-full animate-pulse" />
              <div className="w-1 h-5 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
            </div>
          ) : (
            <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1" />
          )}

          {/* Tooltip */}
          <div className="absolute right-0 top-full mt-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {isPlaying ? "Jeda Musik" : "Putar Musik"}
          </div>
        </button>

        {/* Music Wave Animation (only when playing) */}
        {isPlaying && !isMuted && (
          <div className="absolute -left-16 top-1/2 -translate-y-1/2 flex gap-1 items-center">
            {[...Array(3)].map((_, i) => (
              <div
                key={`wave-${i}`}
                className="w-1 bg-rose-400 rounded-full animate-musicWave"
                style={{
                  height: '20px',
                  animationDelay: `${i * 0.15}s`
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Premium Paper Texture Overlay */}
      <div className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`
        }}
      />

      {/* Floating Hearts Bokeh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={`heart-${i}`}
            className="absolute animate-floatComplex"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          >
            <Heart
              className="text-pink-300/20"
              size={Math.random() * 40 + 15}
              fill="currentColor"
            />
          </div>
        ))}

        {[...Array(15)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            <Star
              className="text-yellow-300/30"
              size={Math.random() * 20 + 10}
              fill="currentColor"
            />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">

          {/* Decorative Icons */}
          <div className="flex justify-center mb-6 md:mb-8 gap-3">
            <Sparkles className="text-rose-400 animate-pulse" size={18} style={{ animationDelay: '0s' }} />
            <Heart className="text-pink-400 animate-heartbeat" size={18} fill="currentColor" />
            <Sparkles className="text-rose-400 animate-pulse" size={18} style={{ animationDelay: '0.5s' }} />
          </div>

          {/* Photos Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-8 md:mb-12 max-w-5xl mx-auto">
            {images.map((img, index) => (
              <div
                key={`photo-${index}`}
                className={`relative group animate-fadeIn ${photosAnimated
                    ? index === 0
                      ? 'animate-photoSwingLarge'
                      : index === 1
                        ? 'animate-photoFloatBounce'
                        : 'animate-photoRotateScale'
                    : ''
                  }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`relative overflow-hidden rounded-3xl shadow-2xl shadow-pink-300/30 transition-all duration-700 ${photosAnimated ? 'scale-110 shadow-pink-400/60' : ''
                  }`}>
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={img}
                      alt={`Momen cinta ${index + 1}`}
                      className={`w-full h-full object-cover transition-all duration-700 ${photosAnimated ? 'scale-110 brightness-110' : 'group-hover:scale-105'
                        }`}
                      loading="lazy"
                    />
                  </div>

                  <div className={`absolute inset-0 bg-gradient-to-t from-pink-200/40 via-transparent to-pink-100/20 backdrop-blur-[2px] transition-opacity duration-500 ${photosAnimated ? 'opacity-20' : 'opacity-60 group-hover:opacity-40'
                    }`} />

                  <div className={`absolute inset-0 rounded-3xl border transition-all duration-500 ${photosAnimated ? 'border-rose-400/60 border-2 animate-borderGlow' : 'border-rose-300/30'
                    }`} />

                  {photosAnimated && (
                    <>
                      <div className="absolute top-4 right-4 animate-heartPopBounce" style={{ animationDelay: '0.2s' }}>
                        <Heart className="text-rose-400" size={24} fill="currentColor" />
                      </div>
                      <div className="absolute bottom-4 left-4 animate-heartPopBounce" style={{ animationDelay: '0.4s' }}>
                        <Heart className="text-pink-400" size={20} fill="currentColor" />
                      </div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-heartPulseGlow" style={{ animationDelay: '0.6s' }}>
                        <Heart className="text-rose-300" size={32} fill="currentColor" />
                      </div>
                    </>
                  )}
                </div>

                <div className="absolute -top-4 -right-4 w-16 h-16 md:w-24 md:h-24 pointer-events-none">
                  <svg viewBox="0 0 100 100" className="w-full h-full opacity-40">
                    <path d="M 20 80 Q 50 20 80 80" fill="none" stroke="url(#roseGold)" strokeWidth="1.5" />
                    <defs>
                      <linearGradient id="roseGold" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#E8B4B8', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#D4AF37', stopOpacity: 1 }} />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {index === 1 && (
                  <div className="absolute -bottom-3 -left-3 w-12 h-12 md:w-16 md:h-16 pointer-events-none">
                    <Heart className="w-full h-full text-rose-300/40 animate-pulse" strokeWidth={1.5} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Text Content */}
          <div className="text-center space-y-6 md:space-y-8 max-w-3xl mx-auto px-4">
            <h1
              className="animate-fadeInUp"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                background: 'linear-gradient(135deg, #E8B4B8 0%, #D4AF37 50%, #C9A7AF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 1.2,
                animationDelay: '0.6s'
              }}
            >
              My Visual Valentine for<br />
              Bilqis Luvena Danendra
            </h1>

            <div className="flex items-center justify-center gap-4 animate-fadeIn" style={{ animationDelay: '0.8s' }}>
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-rose-300 to-transparent animate-expandWidth" />
              <Heart className="text-pink-400 animate-heartbeat" size={16} fill="currentColor" />
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-rose-300 to-transparent animate-expandWidth" />
            </div>

            <p
              className="text-rose-800/70 max-w-2xl mx-auto leading-relaxed animate-fadeIn"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 'clamp(1rem, 2vw, 1.125rem)',
                animationDelay: '1s'
              }}
            >
              Perjalanan indah penuh cinta, tawa, dan momen tanpa akhir bersama.
              Merayakan Valentine spesial kita dengan kenangan indah yang membuat hati kita mekar seperti bunga mawar.
            </p>

            <div className="animate-fadeInScale" style={{ animationDelay: '1.2s' }}>
              <button
                className="group relative px-8 md:px-10 py-3 md:py-4 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-full shadow-lg shadow-pink-300/50 hover:shadow-xl hover:shadow-pink-400/60 transition-all duration-300 hover:scale-105 active:scale-95 animate-buttonPulse"
                onClick={handleCelebrate}
              >
                <span
                  className="relative z-10 flex items-center gap-2"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 500,
                    letterSpacing: '0.5px',
                    fontSize: 'clamp(0.9rem, 2vw, 1rem)'
                  }}
                >
                  Rayakan Valentine Kita
                  <Heart size={18} fill="currentColor" className="animate-heartbeat" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>

            <div className="flex justify-center gap-4 md:gap-6 pt-4 md:pt-8 animate-fadeIn" style={{ animationDelay: '1.4s' }}>
              <Heart className="text-rose-300 animate-bounce" size={16} style={{ animationDelay: '0s' }} />
              <Sparkles className="text-pink-300 animate-spin" size={16} style={{ animationDuration: '3s', animationDelay: '0.1s' }} />
              <Heart className="text-rose-300 animate-bounce" size={16} fill="currentColor" style={{ animationDelay: '0.2s' }} />
              <Sparkles className="text-pink-300 animate-spin" size={16} style={{ animationDuration: '3s', animationDelay: '0.3s' }} />
              <Heart className="text-rose-300 animate-bounce" size={16} style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Confetti Hearts */}
      {isCelebrating && (
        <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
          {confetti.map((heart: ConfettiItem) => (
            <div
              key={`confetti-${heart.id}`}
              className={`absolute ${heart.id % 4 === 0 ? 'animate-heartBurstSpin' :
                  heart.id % 4 === 1 ? 'animate-heartBurstWave' :
                    heart.id % 4 === 2 ? 'animate-heartBurstZigzag' :
                      'animate-heartBurst'
                }`}
              style={{
                left: `${heart.x}%`,
                top: `${heart.y}%`,
                animationDelay: `${heart.delay}s`,
              }}
            >
              <Heart
                className={`${heart.id % 5 === 0 ? 'text-pink-400' :
                    heart.id % 5 === 1 ? 'text-rose-400' :
                      heart.id % 5 === 2 ? 'text-red-300' :
                        heart.id % 5 === 3 ? 'text-pink-300' :
                          'text-rose-300'
                  }`}
                size={Math.random() * 40 + 15}
                fill="currentColor"
              />
            </div>
          ))}

          {[...Array(30)].map((_, i) => (
            <div
              key={`sparkle-celebrate-${i}`}
              className={`absolute ${i % 2 === 0 ? 'animate-sparkleRotate' : 'animate-sparkle'
                }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 1.2}s`,
              }}
            >
              <Sparkles className="text-yellow-300" size={Math.random() * 35 + 10} />
            </div>
          ))}
        </div>
      )}

      {/* Message Overlay */}
      {showMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none p-4">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm animate-fadeIn" />

          <div className="absolute inset-0 overflow-hidden">
            {floatingEmojis.map((item: FloatingEmoji) => (
              <div
                key={`emoji-float-${item.id}`}
                className={`absolute ${currentMessage.icon === 'flower' ? 'animate-floatFlowerComplex' :
                    currentMessage.icon === 'rose' ? 'animate-roseFloatSpin' :
                      currentMessage.icon === 'teddy' ? 'animate-teddyBounceRotate' :
                        currentMessage.icon === 'gift' ? 'animate-giftDropBounce' :
                          'animate-heartRainWave'
                  }`}
                style={{
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                  animationDelay: `${item.delay}s`,
                  animationDuration: `${4 + Math.random() * 3}s`,
                }}
              >
                <div className="text-4xl md:text-6xl opacity-80">{item.emoji}</div>
              </div>
            ))}
          </div>

          <div className="animate-messageRevealBounce w-full relative z-10">
            <div className={`relative bg-gradient-to-br from-white/95 via-pink-50/95 to-rose-50/95 backdrop-blur-xl px-6 md:px-12 py-8 md:py-10 rounded-3xl shadow-2xl border max-w-2xl mx-auto ${currentMessage.color === 'rose' ? 'shadow-rose-400/50 border-rose-200/50 animate-borderGlowPulse' :
                currentMessage.color === 'pink' ? 'shadow-pink-400/50 border-pink-200/50 animate-borderGlowPulse' :
                  'shadow-red-400/50 border-red-200/50 animate-borderGlowPulse'
              }`}>
              {[
                { position: '-top-3 -left-3 md:-top-4 md:-left-4', size: 24, delay: '0s' },
                { position: '-top-3 -right-3 md:-top-4 md:-right-4', size: 20, delay: '0.3s' },
                { position: '-bottom-3 -left-3 md:-bottom-4 md:-left-4', size: 18, delay: '0.6s' },
                { position: '-bottom-3 -right-3 md:-bottom-4 md:-right-4', size: 22, delay: '0.9s' }
              ].map((corner, idx) => (
                <div key={`corner-${idx}`} className={`absolute ${corner.position} animate-heartOrbit`} style={{ animationDelay: corner.delay }}>
                  <Heart className={`${currentMessage.color === 'rose' ? idx < 2 ? 'text-rose-400' : 'text-rose-300' :
                      currentMessage.color === 'pink' ? idx < 2 ? 'text-pink-400' : 'text-pink-300' :
                        idx < 2 ? 'text-red-400' : 'text-red-300'
                    }`} size={corner.size} fill="currentColor" />
                </div>
              ))}

              <div className="text-center space-y-4 md:space-y-6">
                <div className="flex justify-center gap-3">
                  <Sparkles className={`animate-spin ${currentMessage.color === 'rose' ? 'text-rose-400' :
                      currentMessage.color === 'pink' ? 'text-pink-400' :
                        'text-red-400'
                    }`} size={20} style={{ animationDuration: '3s' }} />
                  <div className="text-5xl md:text-6xl animate-iconPulseBounce">{currentMessage.emoji}</div>
                  <Sparkles className={`animate-spin ${currentMessage.color === 'rose' ? 'text-rose-400' :
                      currentMessage.color === 'pink' ? 'text-pink-400' :
                        'text-red-400'
                    }`} size={20} style={{ animationDuration: '3s' }} />
                </div>

                <h2
                  className={`px-2 md:px-4 animate-textGradient ${currentMessage.color === 'rose' ? 'text-rose-600' :
                      currentMessage.color === 'pink' ? 'text-pink-600' :
                        'text-red-600'
                    }`}
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                    lineHeight: 1.3
                  }}
                >
                  Untuk Bilqis Luvena Danendra
                </h2>

                <p
                  className={`max-w-md mx-auto leading-relaxed px-2 md:px-4 animate-fadeInUp ${currentMessage.color === 'rose' ? 'text-rose-800/90' :
                      currentMessage.color === 'pink' ? 'text-pink-800/90' :
                        'text-red-800/90'
                    }`}
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: 'clamp(0.9rem, 2vw, 1.125rem)',
                    animationDelay: '0.3s'
                  }}
                >
                  {currentMessage.text}
                </p>

                <div className="flex justify-center gap-3 md:gap-4 pt-2">
                  {[14, 18, 14].map((size, idx) => (
                    <Heart
                      key={`heart-${idx}`}
                      className={`animate-bounceDelay ${currentMessage.color === 'rose' ? idx === 1 ? 'text-rose-400' : 'text-rose-300' :
                          currentMessage.color === 'pink' ? idx === 1 ? 'text-pink-400' : 'text-pink-300' :
                            idx === 1 ? 'text-red-400' : 'text-red-300'
                        }`}
                      size={size}
                      fill="currentColor"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    />
                  ))}
                </div>

                <div className="flex justify-center gap-3 md:gap-4 pt-4 pointer-events-auto">
                  <button
                    onClick={handleNext}
                    className={`group relative px-6 md:px-8 py-2.5 md:py-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg overflow-hidden ${currentMessage.color === 'rose'
                        ? 'bg-gradient-to-r from-rose-400 to-pink-400 shadow-rose-300/50 hover:shadow-rose-400/60' :
                        currentMessage.color === 'pink'
                          ? 'bg-gradient-to-r from-pink-400 to-rose-400 shadow-pink-300/50 hover:shadow-pink-400/60' :
                          'bg-gradient-to-r from-red-400 to-rose-400 shadow-red-300/50 hover:shadow-red-400/60'
                      }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />

                    <span
                      className="relative z-10 text-white flex items-center gap-2"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 500,
                        letterSpacing: '0.5px',
                        fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                      }}
                    >
                      Pesan Selanjutnya
                      <Heart size={16} fill="currentColor" className="animate-heartbeat" />
                    </span>
                  </button>

                  <button
                    onClick={handleClose}
                    className="group relative px-6 md:px-8 py-2.5 md:py-3 bg-white/80 backdrop-blur-sm text-rose-600 rounded-full border-2 border-rose-200/60 transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-rose-50/80 shadow-lg shadow-rose-200/30 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-rose-200/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />

                    <span
                      className="relative z-10"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 500,
                        letterSpacing: '0.5px',
                        fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                      }}
                    >
                      Tutup
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* Animasi tambahan untuk music wave */
        @keyframes musicWave {
          0%, 100% {
            height: 10px;
          }
          50% {
            height: 25px;
          }
        }

        .animate-musicWave {
          animation: musicWave 0.6s ease-in-out infinite;
        }

        /* Semua animasi lainnya */
        @keyframes floatComplex {
          0%, 100% {
            transform: translateY(0) translateX(0) rotate(0deg) scale(1);
            opacity: 0.1;
          }
          25% {
            transform: translateY(-20px) translateX(10px) rotate(5deg) scale(1.1);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-30px) translateX(-5px) rotate(-5deg) scale(1);
            opacity: 0.2;
          }
          75% {
            transform: translateY(-15px) translateX(5px) rotate(3deg) scale(1.05);
            opacity: 0.25;
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.2;
            transform: scale(0.8) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1.2) rotate(180deg);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes expandWidth {
          0% {
            width: 0;
          }
          100% {
            width: 4rem;
          }
        }

        @keyframes buttonPulse {
          0%, 100% {
            box-shadow: 0 10px 15px -3px rgba(244, 114, 182, 0.5);
          }
          50% {
            box-shadow: 0 20px 25px -5px rgba(244, 114, 182, 0.7);
          }
        }

        @keyframes photoSwingLarge {
          0%, 100% {
            transform: rotate(0deg) scale(1);
          }
          25% {
            transform: rotate(15deg) scale(1.05);
          }
          50% {
            transform: rotate(0deg) scale(1.1);
          }
          75% {
            transform: rotate(-15deg) scale(1.05);
          }
        }

        @keyframes photoFloatBounce {
          0%, 100% {
            transform: translateY(0) rotate(0deg) scale(1);
          }
          25% {
            transform: translateY(-15px) rotate(5deg) scale(1.05);
          }
          50% {
            transform: translateY(-20px) rotate(0deg) scale(1.1);
          }
          75% {
            transform: translateY(-10px) rotate(-5deg) scale(1.05);
          }
        }

        @keyframes photoRotateScale {
          0%, 100% {
            transform: rotate(0deg) scale(1);
          }
          25% {
            transform: rotate(8deg) scale(1.05);
          }
          50% {
            transform: rotate(-8deg) scale(1.1);
          }
          75% {
            transform: rotate(5deg) scale(1.05);
          }
        }

        @keyframes borderGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(244, 114, 182, 0.5);
          }
          50% {
            box-shadow: 0 0 40px rgba(244, 114, 182, 0.8);
          }
        }

        @keyframes heartPopBounce {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.3) rotate(10deg);
            opacity: 1;
          }
          70% {
            transform: scale(0.9) rotate(-5deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 0.9;
          }
        }

        @keyframes heartPulseGlow {
          0%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 0 5px rgba(244, 114, 182, 0.5));
          }
          50% {
            transform: scale(1.2);
            filter: drop-shadow(0 0 15px rgba(244, 114, 182, 0.9));
          }
        }

        @keyframes heartBurstSpin {
          0% {
            transform: translate(0, 0) scale(0) rotate(0deg);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translate(var(--tx), var(--ty)) scale(1) rotate(1080deg);
            opacity: 0;
          }
        }

        @keyframes heartBurstWave {
          0% {
            transform: translate(0, 0) scale(0);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translate(var(--tx), var(--ty)) scale(1);
            opacity: 0;
          }
        }

        @keyframes heartBurstZigzag {
          0% {
            transform: translate(0, 0) scale(0) rotate(0deg);
            opacity: 0;
          }
          20% {
            opacity: 1;
            transform: translate(20px, -20px) scale(0.5) rotate(180deg);
          }
          40% {
            transform: translate(-20px, -40px) scale(0.7) rotate(360deg);
          }
          60% {
            transform: translate(30px, -60px) scale(0.9) rotate(540deg);
          }
          100% {
            transform: translate(var(--tx), var(--ty)) scale(1) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes heartBurst {
          0% {
            transform: translate(0, 0) scale(0) rotate(0deg);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translate(var(--tx), var(--ty)) scale(1) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes sparkleRotate {
          0%, 100% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(2) rotate(360deg);
            opacity: 1;
          }
        }

        @keyframes sparkle {
          0%, 100% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 1;
          }
        }

        @keyframes floatFlowerComplex {
          0% {
            transform: translateY(120vh) translateX(0) rotate(0deg) scale(0.8);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          50% {
            transform: translateY(50vh) translateX(30px) rotate(180deg) scale(1);
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-20vh) translateX(-20px) rotate(360deg) scale(0.8);
            opacity: 0;
          }
        }

        @keyframes roseFloatSpin {
          0% {
            transform: translateY(120vh) rotate(0deg) scale(0.8);
            opacity: 0;
          }
          10% {
            opacity: 0.9;
          }
          90% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(-20vh) rotate(720deg) scale(1.2);
            opacity: 0;
          }
        }

        @keyframes teddyBounceRotate {
          0% {
            transform: translateY(120vh) rotate(0deg) scale(0.5);
            opacity: 0;
          }
          10% {
            opacity: 0.9;
          }
          30% {
            transform: translateY(80vh) rotate(15deg) scale(1);
          }
          50% {
            transform: translateY(50vh) rotate(-15deg) scale(1.1);
          }
          70% {
            transform: translateY(30vh) rotate(10deg) scale(1);
          }
          90% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(-20vh) rotate(0deg) scale(0.5);
            opacity: 0;
          }
        }

        @keyframes giftDropBounce {
          0% {
            transform: translateY(-20vh) rotate(0deg) scale(0.5);
            opacity: 0;
          }
          10% {
            opacity: 0.9;
          }
          40% {
            transform: translateY(30vh) rotate(180deg) scale(1.2);
          }
          50% {
            transform: translateY(40vh) rotate(200deg) scale(1);
          }
          60% {
            transform: translateY(35vh) rotate(220deg) scale(1.1);
          }
          90% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(120vh) rotate(360deg) scale(0.8);
            opacity: 0;
          }
        }

        @keyframes heartRainWave {
          0% {
            transform: translateY(-20vh) translateX(0) rotate(0deg) scale(0.5);
            opacity: 0;
          }
          10% {
            opacity: 0.9;
          }
          25% {
            transform: translateY(20vh) translateX(20px) rotate(90deg) scale(1);
          }
          50% {
            transform: translateY(50vh) translateX(-10px) rotate(180deg) scale(1.1);
          }
          75% {
            transform: translateY(80vh) translateX(15px) rotate(270deg) scale(1);
          }
          90% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(120vh) translateX(0) rotate(360deg) scale(0.5);
            opacity: 0;
          }
        }

        @keyframes messageRevealBounce {
          0% {
            transform: scale(0.3) translateY(50px) rotate(-10deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.1) translateY(-10px) rotate(2deg);
          }
          70% {
            transform: scale(0.95) translateY(5px) rotate(-1deg);
          }
          100% {
            transform: scale(1) translateY(0) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes borderGlowPulse {
          0%, 100% {
            box-shadow: 0 0 30px rgba(244, 114, 182, 0.4);
          }
          50% {
            box-shadow: 0 0 60px rgba(244, 114, 182, 0.8);
          }
        }

        @keyframes heartOrbit {
          0%, 100% {
            transform: scale(1) rotate(0deg);
          }
          25% {
            transform: scale(1.2) rotate(90deg);
          }
          50% {
            transform: scale(1) rotate(180deg);
          }
          75% {
            transform: scale(1.2) rotate(270deg);
          }
        }

        @keyframes iconPulseBounce {
          0%, 100% {
            transform: scale(1) translateY(0);
          }
          25% {
            transform: scale(1.15) translateY(-10px);
          }
          50% {
            transform: scale(1) translateY(0);
          }
          75% {
            transform: scale(1.1) translateY(-5px);
          }
        }

        @keyframes textGradient {
          0% {
            filter: hue-rotate(0deg) brightness(1);
          }
          50% {
            filter: hue-rotate(10deg) brightness(1.2);
          }
          100% {
            filter: hue-rotate(0deg) brightness(1);
          }
        }

        @keyframes bounceDelay {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.2);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes heartbeat {
          0%, 100% {
            transform: scale(1);
          }
          25% {
            transform: scale(1.2);
          }
          50% {
            transform: scale(1);
          }
          75% {
            transform: scale(1.1);
          }
        }

        .animate-floatComplex {
          animation: floatComplex linear infinite;
        }

        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }

        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out forwards;
          opacity: 0;
        }

        .animate-fadeInScale {
          animation: fadeInScale 1s ease-out forwards;
          opacity: 0;
        }

        .animate-expandWidth {
          animation: expandWidth 1s ease-out forwards;
        }

        .animate-buttonPulse {
          animation: buttonPulse 2s ease-in-out infinite;
        }

        .animate-photoSwingLarge {
          animation: photoSwingLarge 2s ease-in-out infinite;
        }

        .animate-photoFloatBounce {
          animation: photoFloatBounce 2s ease-in-out infinite;
        }

        .animate-photoRotateScale {
          animation: photoRotateScale 2s ease-in-out infinite;
        }

        .animate-borderGlow {
          animation: borderGlow 2s ease-in-out infinite;
        }

        .animate-heartPopBounce {
          animation: heartPopBounce 2s ease-in-out infinite;
        }

        .animate-heartPulseGlow {
          animation: heartPulseGlow 2s ease-in-out infinite;
        }

        .animate-heartBurstSpin {
          --tx: calc((var(--random-x, 0.5) - 0.5) * 200vw);
          --ty: calc((var(--random-y, 0.5) - 0.5) * 200vh);
          animation: heartBurstSpin 3.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .animate-heartBurstWave {
          --tx: calc((var(--random-x, 0.5) - 0.5) * 200vw);
          --ty: calc((var(--random-y, 0.5) - 0.5) * 200vh);
          animation: heartBurstWave 3.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .animate-heartBurstZigzag {
          --tx: calc((var(--random-x, 0.5) - 0.5) * 200vw);
          --ty: calc((var(--random-y, 0.5) - 0.5) * 200vh);
          animation: heartBurstZigzag 3.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .animate-heartBurst {
          --tx: calc((var(--random-x, 0.5) - 0.5) * 200vw);
          --ty: calc((var(--random-y, 0.5) - 0.5) * 200vh);
          animation: heartBurst 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .animate-sparkleRotate {
          animation: sparkleRotate 1.8s ease-in-out infinite;
        }

        .animate-sparkle {
          animation: sparkle 1.5s ease-in-out infinite;
        }

        .animate-floatFlowerComplex {
          animation: floatFlowerComplex linear forwards;
        }

        .animate-roseFloatSpin {
          animation: roseFloatSpin linear forwards;
        }

        .animate-teddyBounceRotate {
          animation: teddyBounceRotate linear forwards;
        }

        .animate-giftDropBounce {
          animation: giftDropBounce linear forwards;
        }

        .animate-heartRainWave {
          animation: heartRainWave linear forwards;
        }

        .animate-messageRevealBounce {
          animation: messageRevealBounce 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .animate-borderGlowPulse {
          animation: borderGlowPulse 2s ease-in-out infinite;
        }

        .animate-heartOrbit {
          animation: heartOrbit 3s ease-in-out infinite;
        }

        .animate-iconPulseBounce {
          animation: iconPulseBounce 2s ease-in-out infinite;
        }

        .animate-textGradient {
          animation: textGradient 3s ease-in-out infinite;
        }

        .animate-bounceDelay {
          animation: bounceDelay 1.5s ease-in-out infinite;
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
          opacity: 0;
        }

        .animate-heartbeat {
          animation: heartbeat 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
