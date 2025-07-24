import React, { useEffect } from 'react';
import { Camera, Award, MapPin, Calendar, Star, Quote } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { photographerInfo, awards, testimonials } from '../data/mock';

const AboutPage = () => {
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
      
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-warm-beige">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-black mb-6">
                About Alexandra
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {photographerInfo.bio}
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Profile Image */}
              <div className="scroll-animate">
                <img
                  src="https://images.unsplash.com/photo-1494790108755-2616b57c0bb1?w=600&h=800&fit=crop&crop=face"
                  alt="Alexandra Chen"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>

              {/* Content */}
              <div className="space-y-8 scroll-animate">
                <div>
                  <h2 className="text-3xl font-serif font-bold text-black mb-6">
                    My Story
                  </h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      Photography has been my passion for over 8 years, starting as a hobby during college 
                      and evolving into a profession that allows me to capture life's most precious moments. 
                      I believe that every photograph tells a story, and my goal is to help you tell yours.
                    </p>
                    <p>
                      Based in New York City, I specialize in portrait photography, landscapes, and street 
                      photography. My approach combines technical expertise with creative vision to create 
                      images that are both visually stunning and emotionally resonant.
                    </p>
                    <p>
                      I'm passionate about working with people from all walks of life, whether it's capturing 
                      the joy of a wedding day, the professional confidence of a corporate headshot, or the 
                      raw beauty of everyday moments on the street.
                    </p>
                  </div>
                </div>

                {/* Quick Facts */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Calendar className="w-8 h-8 text-black mx-auto mb-2" />
                    <p className="font-semibold">8+ Years</p>
                    <p className="text-sm text-gray-600">Experience</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Camera className="w-8 h-8 text-black mx-auto mb-2" />
                    <p className="font-semibold">500+ Projects</p>
                    <p className="text-sm text-gray-600">Completed</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Star className="w-8 h-8 text-black mx-auto mb-2" />
                    <p className="font-semibold">4.9/5 Rating</p>
                    <p className="text-sm text-gray-600">Client Reviews</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <MapPin className="w-8 h-8 text-black mx-auto mb-2" />
                    <p className="font-semibold">NYC Based</p>
                    <p className="text-sm text-gray-600">Worldwide Travel</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-16 bg-soft-pink">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center scroll-animate">
              <h2 className="text-4xl font-serif font-bold text-black mb-8">
                My Philosophy
              </h2>
              <div className="text-lg text-gray-700 leading-relaxed space-y-6">
                <p>
                  "Photography is not just about capturing what you see, but about revealing what you feel. 
                  Every click of the shutter is an opportunity to freeze a moment in time, to preserve an 
                  emotion, to tell a story that words cannot express."
                </p>
                <p>
                  I believe in the power of authentic moments over posed perfection. The best photographs 
                  happen when people feel comfortable, confident, and free to be themselves. My role is to 
                  create that environment and capture the magic that naturally unfolds.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Awards & Recognition */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-serif font-bold text-black text-center mb-12 scroll-animate">
                Awards & Recognition
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {awards.map((award, index) => (
                  <div 
                    key={award.id}
                    className="text-center p-6 bg-gray-50 rounded-lg scroll-animate"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <Award className="w-12 h-12 text-black mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-black mb-2">{award.title}</h3>
                    <p className="text-gray-600 mb-2">{award.organization}</p>
                    <p className="text-sm text-gray-500 mb-3">{award.year}</p>
                    <p className="text-sm text-gray-700">{award.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Testimonial */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center scroll-animate">
              <Quote className="w-16 h-16 text-white/20 mx-auto mb-8" />
              <blockquote className="text-2xl md:text-3xl font-light leading-relaxed mb-8">
                "Alexandra has an incredible eye for capturing emotion and beauty in every shot. 
                Her professionalism and artistic vision made our wedding photos absolutely perfect."
              </blockquote>
              <div className="flex items-center justify-center space-x-4">
                <img
                  src={testimonials[0].image}
                  alt={testimonials[0].name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold">{testimonials[0].name}</p>
                  <p className="text-gray-400 text-sm">{testimonials[0].role}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills & Specialties */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-serif font-bold text-black text-center mb-12 scroll-animate">
                Skills & Specialties
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="scroll-animate">
                  <h3 className="text-2xl font-semibold text-black mb-6">Photography Styles</h3>
                  <div className="space-y-3">
                    {['Portrait Photography', 'Wedding Photography', 'Street Photography', 'Landscape Photography', 'Commercial Photography', 'Event Photography'].map((skill, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Camera className="w-5 h-5 text-black" />
                        <span className="text-gray-700">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="scroll-animate">
                  <h3 className="text-2xl font-semibold text-black mb-6">Technical Skills</h3>
                  <div className="space-y-3">
                    {['Adobe Photoshop', 'Adobe Lightroom', 'Studio Lighting', 'Natural Light Photography', 'Color Grading', 'Digital Retouching'].map((skill, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Star className="w-5 h-5 text-black" />
                        <span className="text-gray-700">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-accent">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center scroll-animate">
              <h2 className="text-4xl font-serif font-bold text-black mb-6">
                Let's Create Something Beautiful Together
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Ready to capture your story? I'd love to hear about your vision and bring it to life through photography.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/booking"
                  className="btn-primary inline-flex items-center px-8 py-4 text-lg font-semibold hover:transform hover:scale-105 transition-all duration-200"
                >
                  Book a Session
                </a>
                <a
                  href="/contact"
                  className="btn-secondary inline-flex items-center px-8 py-4 text-lg font-semibold hover:transform hover:scale-105 transition-all duration-200"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;