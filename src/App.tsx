import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import AboutTeaser from './sections/AboutTeaser';
import ServicesGrid from './sections/ServicesGrid';
import StatisticsBanner from './sections/StatisticsBanner';
import CTASection from './sections/CTASection';
import Footer from './sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <Navigation />
      <main>
        <HeroSection />
        <AboutTeaser />
        <ServicesGrid />
        <StatisticsBanner />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
