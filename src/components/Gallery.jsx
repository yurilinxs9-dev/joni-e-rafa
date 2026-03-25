import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import './Gallery.css'

const galleryImages = [
  { src: '/assets/images/galeria-1.jpeg', alt: 'Foto do casal 1' },
  { src: '/assets/images/galeria-2.jpeg', alt: 'Foto do casal 2' },
  { src: '/assets/images/galeria-3.jpeg', alt: 'Foto do casal 3' },
  { src: '/assets/images/galeria-4.jpeg', alt: 'Foto do casal 4' },
  { src: '/assets/images/galeria-5.jpeg', alt: 'Foto do casal 5' },
  { src: '/assets/images/galeria-6.jpeg', alt: 'Foto do casal 6' },
]

const galleryImages2 = [
  { src: '/assets/images/nossa-historia.jpeg', alt: 'Foto do casal 7' },
  { src: '/assets/images/galeria-7.jpeg', alt: 'Foto do casal 8' },
  { src: '/assets/images/galeria-8.jpeg', alt: 'Foto do casal 9' },
  { src: '/assets/images/galeria-9.jpeg', alt: 'Foto do casal 10' },
  { src: '/assets/images/galeria-10.jpeg', alt: 'Foto do casal 11' },
  { src: '/assets/images/galeria-11.jpeg', alt: 'Foto do casal 12' },
]

export default function Gallery() {
  return (
    <section className="gallery-section" aria-label="Galeria de fotos">
      <div className="gallery-row">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={4}
          spaceBetween={10}
          loop={true}
          speed={5000}
          autoplay={{ delay: 0, disableOnInteraction: false }}
          breakpoints={{
            0: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
          }}
          className="gallery-swiper gallery-swiper--rtl"
          dir="rtl"
        >
          {galleryImages.map((img, i) => (
            <SwiperSlide key={i}>
              <img src={img.src} alt={img.alt} loading="lazy" className="gallery-img" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="gallery-row">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={3}
          spaceBetween={10}
          loop={true}
          speed={5000}
          autoplay={{ delay: 0, disableOnInteraction: false, reverseDirection: true }}
          breakpoints={{
            0: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
          }}
          className="gallery-swiper"
        >
          {galleryImages2.map((img, i) => (
            <SwiperSlide key={i}>
              <img src={img.src} alt={img.alt} loading="lazy" className="gallery-img" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
