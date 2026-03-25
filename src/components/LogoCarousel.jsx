import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import './LogoCarousel.css'

const logos = [
  { src: '/assets/images/logo-dourado-1.png', alt: 'Logo Rafaella e Johnatan Dourado' },
  { src: '/assets/images/logo-prata-1.png', alt: 'Logo Rafaella e Johnatan' },
  { src: '/assets/images/logo-dourado-2.png', alt: 'Logo Rafaella e Johnatan Dourado' },
  { src: '/assets/images/logo-prata-2.png', alt: 'Logo Rafaella e Johnatan' },
  { src: '/assets/images/logo-dourado-3.png', alt: 'Logo Rafaella e Johnatan Dourado' },
  { src: '/assets/images/logo-prata-3.png', alt: 'Logo Rafaella e Johnatan' },
]

export default function LogoCarousel() {
  return (
    <section className="logo-carousel-section" aria-label="Logos do casal">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={8}
        spaceBetween={100}
        loop={true}
        speed={3000}
        autoplay={{ delay: 0, disableOnInteraction: false }}
        allowTouchMove={false}
        breakpoints={{
          0: { slidesPerView: 3, spaceBetween: 30 },
          768: { slidesPerView: 5, spaceBetween: 60 },
          1024: { slidesPerView: 8, spaceBetween: 100 },
        }}
        className="logo-swiper"
      >
        {[...logos, ...logos].map((logo, i) => (
          <SwiperSlide key={i}>
            <img src={logo.src} alt={logo.alt} className="logo-carousel-img" />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
