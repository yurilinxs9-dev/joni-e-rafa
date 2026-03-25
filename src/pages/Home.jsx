import Hero from '../components/Hero'
import Countdown from '../components/Countdown'
import OurStory from '../components/OurStory'
import Gallery from '../components/Gallery'
import GiftList from '../components/GiftList'
import Footer from '../components/Footer'
import LogoCarousel from '../components/LogoCarousel'

export default function Home() {
  return (
    <>
      <Hero />
      <Countdown />
      <OurStory />
      <Gallery />
      <GiftList />
      <Footer />
      <LogoCarousel />
    </>
  )
}
