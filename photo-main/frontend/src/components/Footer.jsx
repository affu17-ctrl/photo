import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Instagram, Facebook, Twitter, Mail, Phone, MapPin, Heart } from 'lucide-react';
import { photographerInfo } from '../data/mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <Camera className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold">{photographerInfo.name}</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {photographerInfo.tagline}
            </p>
            <p className="text-gray-400 text-sm">
              {photographerInfo.bio}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <nav className="space-y-2">
              <Link to="/" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Home
              </Link>
              <Link to="/gallery" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Gallery
              </Link>
              <Link to="/about" className="block text-gray-400 hover:text-white transition-colors text-sm">
                About
              </Link>
              <Link to="/booking" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Booking
              </Link>
              <Link to="/contact" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <a href={`mailto:${photographerInfo.email}`} className="text-gray-400 hover:text-white transition-colors text-sm">
                  {photographerInfo.email}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <a href={`tel:${photographerInfo.phone}`} className="text-gray-400 hover:text-white transition-colors text-sm">
                  {photographerInfo.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 text-sm">New York City, NY</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow</h3>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors group"
              >
                <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors group"
              >
                <Facebook className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors group"
              >
                <Twitter className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
            </div>
            <div className="mt-4 space-y-1 text-sm text-gray-400">
              <p>{photographerInfo.social.instagram}</p>
              <p>{photographerInfo.social.facebook}</p>
              <p>{photographerInfo.social.twitter}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} {photographerInfo.name}. All rights reserved.
          </p>
          <div className="flex items-center space-x-1 text-gray-400 text-sm mt-2 md:mt-0">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500" />
            <span>by Alexandra Chen Photography</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;