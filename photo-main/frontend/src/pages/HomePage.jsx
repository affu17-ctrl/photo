import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star, ArrowRight, Play, Pause } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { portfolioImages, testimonials, photographerInfo } from '../data/mock';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [visibleImages, setVisibleImages] = useState([]);
  
  const featuredImages = portfolioImages.filter(img => img.featured);

  // Auto-slide functionality
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredImages.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, featuredImages.length]);

  // Scroll animation effect
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const rate = scrolled * -0.5;
      const heroImage = document.querySelector('.hero-image');
      if (heroImage) {
        heroImage.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-soft-gray">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent z-10"></div>
        
        {/* Hero Image Slider */}
        <div className="absolute inset-0">
          {featuredImages.map((image, index) => (
            <div
              key={image.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image.url}
                alt={image.title}
                className="hero-image w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-20 text-center text-white px-6 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="block font-serif">{photographerInfo.name}</span>
            <span className="block text-2xl md:text-3xl font-normal mt-2 text-white/90">
              {photographerInfo.tagline}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/80 max-w-2xl mx-auto leading-relaxed">
            Creating timeless memories through the art of photography. 
            Every moment tells a story worth preserving.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/gallery"
              className="btn-primary inline-flex items-center px-8 py-4 text-lg font-semibold hover:transform hover:scale-105 transition-all duration-200"
            >
              View Gallery
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/booking"
              className="btn-secondary inline-flex items-center px-8 py-4 text-lg font-semibold hover:transform hover:scale-105 transition-all duration-200"
            >
              Book Session
              <ChevronRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Slide Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex items-center space-x-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
          </button>
          
          <div className="flex space-x-2">
            {featuredImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-white' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="py-20 bg-soft-pink">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-black mb-6">
              Featured Work
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A curated selection of recent projects showcasing different styles and techniques
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredImages.slice(0, 6).map((image, index) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer scroll-animate"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-center text-white">
                    <h3 className="text-xl font-semibold mb-2">{image.title}</h3>
                    <p className="text-sm text-white/80">{image.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 scroll-animate">
            <Link
              to="/gallery"
              className="btn-primary inline-flex items-center px-8 py-4 text-lg font-semibold hover:transform hover:scale-105 transition-all duration-200"
            >
              View Full Gallery
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 scroll-animate">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-black mb-6">
              What Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from clients who trusted me to capture their most important moments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-gray-50 rounded-lg p-8 relative scroll-animate"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-gray-700 text-lg mb-6 leading-relaxed">
                  "{testimonial.text}"
                </blockquote>
                
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-black">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto scroll-animate">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Ready to Create Something Beautiful?
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Let's work together to capture your story. Whether it's a personal portrait, 
              special event, or commercial project, I'm here to bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/booking"
                className="bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
              >
                Book a Session
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;