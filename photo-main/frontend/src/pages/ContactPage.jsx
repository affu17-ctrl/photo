import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, Instagram, Facebook, Twitter } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useToast } from '../hooks/use-toast';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { photographerInfo } from '../data/mock';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (value) => {
    setFormData({
      ...formData,
      subject: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. I'll get back to you within 24 hours.",
      });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: photographerInfo.email,
      link: `mailto:${photographerInfo.email}`,
      description: 'Send me an email anytime'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: photographerInfo.phone,
      link: `tel:${photographerInfo.phone}`,
      description: 'Call or text for immediate response'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'New York City, NY',
      link: 'https://maps.google.com',
      description: 'Available for worldwide travel'
    },
    {
      icon: Clock,
      title: 'Hours',
      value: 'Mon-Sat 9AM-6PM',
      link: null,
      description: 'Emergency bookings available'
    }
  ];

  const socialLinks = [
    {
      icon: Instagram,
      name: 'Instagram',
      value: photographerInfo.social.instagram,
      link: '#'
    },
    {
      icon: Facebook,
      name: 'Facebook',
      value: photographerInfo.social.facebook,
      link: '#'
    },
    {
      icon: Twitter,
      name: 'Twitter',
      value: photographerInfo.social.twitter,
      link: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-soft-gray">
      <Header />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-warm-beige">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-black mb-6">
                Get in Touch
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Have a project in mind or just want to say hello? I'd love to hear from you. 
                Let's discuss how we can bring your vision to life.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-serif">Send Me a Message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Name *</label>
                          <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Email *</label>
                          <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Phone</label>
                        <Input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Subject *</label>
                        <Select value={formData.subject} onValueChange={handleSelectChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="booking">Booking Inquiry</SelectItem>
                            <SelectItem value="portfolio">Portfolio Question</SelectItem>
                            <SelectItem value="pricing">Pricing Information</SelectItem>
                            <SelectItem value="collaboration">Collaboration</SelectItem>
                            <SelectItem value="general">General Inquiry</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Message *</label>
                        <Textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          placeholder="Tell me about your project, vision, or any questions you have..."
                          rows={5}
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 text-lg"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-serif font-bold text-black mb-6">
                    Contact Information
                  </h2>
                  <p className="text-gray-600 mb-8">
                    I'm always excited to discuss new projects and creative opportunities. 
                    Feel free to reach out through any of these channels.
                  </p>
                </div>

                {/* Contact Methods */}
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-black">{info.title}</h3>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-gray-600 hover:text-black transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-gray-600">{info.value}</p>
                        )}
                        <p className="text-sm text-gray-500">{info.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Media */}
                <div>
                  <h3 className="text-xl font-semibold text-black mb-4">Follow Me</h3>
                  <div className="space-y-3">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.link}
                        className="flex items-center space-x-3 text-gray-600 hover:text-black transition-colors"
                      >
                        <social.icon className="w-5 h-5" />
                        <span>{social.value}</span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Quick Response */}
                <Card className="bg-gray-50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-black mb-2">Quick Response</h3>
                    <p className="text-gray-600 text-sm">
                      I typically respond to all inquiries within 24 hours. For urgent requests, 
                      please call or text me directly.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-soft-pink">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-serif font-bold text-black text-center mb-12">
                Frequently Asked Questions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    question: "What's your booking process?",
                    answer: "I start with a consultation to understand your vision, then we schedule the session and discuss all details beforehand."
                  },
                  {
                    question: "How far in advance should I book?",
                    answer: "I recommend booking 2-4 weeks in advance, especially for weddings and events. However, I can accommodate last-minute requests when possible."
                  },
                  {
                    question: "Do you travel for shoots?",
                    answer: "Yes! I'm available for travel worldwide. Travel fees may apply depending on location and duration."
                  },
                  {
                    question: "What's included in your sessions?",
                    answer: "All sessions include professional editing, high-resolution images, and an online gallery. Specific inclusions vary by package."
                  },
                  {
                    question: "How long until I receive my photos?",
                    answer: "You'll receive your edited photos within 2-3 weeks for regular sessions, and 4-6 weeks for weddings and large events."
                  },
                  {
                    question: "Can I request specific editing styles?",
                    answer: "Absolutely! I work with you to achieve the look and feel you want while maintaining my artistic vision."
                  }
                ].map((faq, index) => (
                  <Card key={index} className="bg-white">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-black mb-3">{faq.question}</h3>
                      <p className="text-gray-600 text-sm">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;