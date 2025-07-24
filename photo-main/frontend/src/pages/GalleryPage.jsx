import React, { useState, useEffect } from 'react';
import { Search, Filter, Grid, Grid3X3, Layout } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { portfolioImages, categories } from '../data/mock';

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredImages, setFilteredImages] = useState(portfolioImages);
  const [searchTerm, setSearchTerm] = useState('');
  const [layoutType, setLayoutType] = useState('masonry');
  const [selectedImage, setSelectedImage] = useState(null);

  // Filter images based on category and search
  useEffect(() => {
    let filtered = portfolioImages;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(img => img.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(img => 
        img.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        img.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        img.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredImages(filtered);
  }, [selectedCategory, searchTerm]);

  // Masonry layout calculation
  const getMasonryStyle = (index) => {
    const heights = [300, 400, 350, 450, 320, 380, 420, 360, 340, 390];
    return {
      height: `${heights[index % heights.length]}px`
    };
  };

  const ImageModal = ({ image, onClose }) => {
    if (!image) return null;

    return (
      <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="relative max-w-4xl max-h-full">
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 text-white hover:text-gray-300 text-2xl"
          >
            ×
          </button>
          <img
            src={image.url}
            alt={image.title}
            className="max-w-full max-h-full object-contain rounded-lg"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
            <h3 className="text-2xl font-bold mb-2">{image.title}</h3>
            <p className="text-gray-300 mb-2">{image.description}</p>
            <div className="flex flex-wrap gap-2">
              {image.tags.map((tag, index) => (
                <span key={index} className="bg-white/20 px-2 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-soft-gray">
      <Header />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-warm-beige">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-black mb-6">
                Portfolio Gallery
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Explore my collection of photography work spanning portraits, landscapes, street photography, and more
              </p>
            </div>
          </div>
        </section>

        {/* Filters and Search */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search images..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>

              {/* Layout Toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLayoutType('masonry')}
                  className={`p-2 rounded ${layoutType === 'masonry' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  <Layout className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setLayoutType('grid')}
                  className={`p-2 rounded ${layoutType === 'grid' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700'}`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-12 bg-soft-gray">
          <div className="container mx-auto px-6">
            {filteredImages.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">No images found matching your criteria.</p>
              </div>
            ) : (
              <div className={`${
                layoutType === 'masonry' 
                  ? 'columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6' 
                  : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              }`}>
                {filteredImages.map((image, index) => (
                  <div
                    key={image.id}
                    className={`relative group cursor-pointer overflow-hidden rounded-lg mb-6 ${
                      layoutType === 'grid' ? 'aspect-square' : ''
                    }`}
                    style={layoutType === 'masonry' ? getMasonryStyle(index) : {}}
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-center text-white p-4">
                        <h3 className="text-lg font-semibold mb-2">{image.title}</h3>
                        <p className="text-sm text-white/80 mb-2">{image.description}</p>
                        <div className="flex flex-wrap gap-1 justify-center">
                          {image.tags.slice(0, 3).map((tag, i) => (
                            <span key={i} className="bg-white/20 px-2 py-1 rounded-full text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Image Modal */}
      <ImageModal 
        image={selectedImage} 
        onClose={() => setSelectedImage(null)} 
      />

      <Footer />
    </div>
  );
};

export default GalleryPage;