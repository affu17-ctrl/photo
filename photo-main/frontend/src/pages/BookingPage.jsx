import React, { useState } from 'react';
import { Calendar, Clock, Check, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { Calendar as CalendarComponent } from '../components/ui/calendar';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useToast } from '../hooks/use-toast';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { services, bookingSlots } from '../data/mock';

const BookingPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [step, setStep] = useState(1);
  const { toast } = useToast();

  const availableSlots = bookingSlots.filter(slot => slot.available);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock booking submission
    toast({
      title: "Booking Request Sent!",
      description: "I'll get back to you within 24 hours to confirm your session.",
    });
    
    // Reset form
    setStep(1);
    setSelectedDate(null);
    setSelectedTime('');
    setSelectedService('');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
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
                Book Your Session
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Ready to capture your special moments? Let's schedule a photography session that brings your vision to life.
              </p>
            </div>
          </div>
        </section>

        {/* Booking Process */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              {/* Progress Steps */}
              <div className="flex items-center justify-center mb-12">
                <div className="flex items-center space-x-8">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                        step >= num ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'
                      }`}>
                        {step > num ? <Check className="w-5 h-5" /> : num}
                      </div>
                      <span className={`ml-2 ${step >= num ? 'text-black' : 'text-gray-500'}`}>
                        {num === 1 ? 'Service' : num === 2 ? 'Date & Time' : 'Details'}
                      </span>
                      {num < 3 && (
                        <div className={`w-20 h-px mx-4 ${
                          step > num ? 'bg-black' : 'bg-gray-200'
                        }`}></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 1: Select Service */}
              {step === 1 && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-serif font-bold mb-4">Choose Your Service</h2>
                    <p className="text-gray-600">Click on any service to select it and continue</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {services.map((service) => (
                      <Card 
                        key={service.id} 
                        className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                          selectedService === service.id.toString() ? 'ring-2 ring-gray-900 bg-gray-50' : ''
                        }`}
                        onClick={() => {
                          setSelectedService(service.id.toString());
                          // Auto-advance to next step after selecting service
                          setTimeout(() => {
                            setStep(2);
                          }, 300);
                        }}
                      >
                        <CardHeader>
                          <CardTitle className="text-xl flex items-center justify-between">
                            {service.name}
                            {selectedService === service.id.toString() && (
                              <Check className="w-6 h-6 text-green-500" />
                            )}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 mb-4">{service.description}</p>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="font-semibold">Price:</span>
                              <span className="text-lg font-bold text-gray-900">{service.price}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-semibold">Duration:</span>
                              <span>{service.duration}</span>
                            </div>
                          </div>
                          <div className="mt-4">
                            <p className="text-sm font-semibold mb-2">Includes:</p>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {service.includes.map((item, index) => (
                                <li key={index} className="flex items-center">
                                  <Check className="w-4 h-4 text-green-500 mr-2" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div className="flex justify-center">
                    <Button 
                      onClick={nextStep}
                      disabled={!selectedService}
                      className="btn-continue px-8 py-3 text-lg cursor-not-allowed"
                      style={{ display: selectedService ? 'none' : 'inline-flex' }}
                    >
                      Select a Service Above
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Select Date & Time */}
              {step === 2 && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-serif font-bold mb-4">Select Date & Time</h2>
                    <p className="text-gray-600">Choose your preferred date and time - we'll automatically continue once both are selected</p>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Calendar */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Calendar className="w-5 h-5 mr-2" />
                          Choose Date
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CalendarComponent
                          mode="single"
                          selected={selectedDate}
                          onSelect={(date) => {
                            setSelectedDate(date);
                            // Clear selected time when date changes
                            setSelectedTime('');
                          }}
                          className="rounded-md border"
                          disabled={(date) => {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            return date < today;
                          }}
                        />
                      </CardContent>
                    </Card>

                    {/* Time Slots */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Clock className="w-5 h-5 mr-2" />
                          Available Times
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {selectedDate ? (
                          <div>
                            <p className="text-sm text-gray-600 mb-4">Available times for {formatDate(selectedDate)}:</p>
                            <div className="grid grid-cols-2 gap-3">
                              {['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'].map((time) => (
                                <button
                                  key={time}
                                  onClick={() => {
                                    setSelectedTime(time);
                                    // Auto-advance to next step after selecting both date and time
                                    if (selectedDate) {
                                      setTimeout(() => {
                                        setStep(3);
                                      }, 500);
                                    }
                                  }}
                                  className={`p-3 rounded-lg border transition-all duration-200 ${
                                    selectedTime === time
                                      ? 'bg-gray-900 text-white border-gray-900 shadow-lg'
                                      : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
                                  }`}
                                >
                                  {time}
                                </button>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <p className="text-gray-500 text-center py-8">Please select a date first</p>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Selected Summary */}
                  {selectedDate && selectedTime && (
                    <Card className="bg-green-50 border-green-200">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold mb-2 text-green-800">✓ Perfect! Your appointment is set:</h3>
                            <p className="text-green-700">
                              {formatDate(selectedDate)} at {selectedTime}
                            </p>
                          </div>
                          <div className="text-sm text-green-600">
                            Moving to details...
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={prevStep} className="px-6 py-3 text-base border-2 border-gray-300 hover:bg-gray-100">
                      Back
                    </Button>
                    <div className="flex items-center space-x-4">
                      {selectedDate && selectedTime && (
                        <div className="text-sm text-gray-600">
                          Auto-advancing in 3 seconds...
                        </div>
                      )}
                      <Button 
                        onClick={nextStep}
                        disabled={!selectedDate || !selectedTime}
                        className="btn-continue px-8 py-3 text-lg"
                      >
                        Continue to Details
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Contact Details */}
              {step === 3 && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-serif font-bold text-center mb-8">Your Details</h2>
                  
                  <Card>
                    <CardContent className="p-6">
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              <User className="w-4 h-4 inline mr-2" />
                              Full Name *
                            </label>
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
                            <label className="block text-sm font-medium mb-2">
                              <Mail className="w-4 h-4 inline mr-2" />
                              Email *
                            </label>
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
                          <label className="block text-sm font-medium mb-2">
                            <Phone className="w-4 h-4 inline mr-2" />
                            Phone Number *
                          </label>
                          <Input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            <MessageSquare className="w-4 h-4 inline mr-2" />
                            Special Requests or Notes
                          </label>
                          <Textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Tell me about your vision for the session, preferred style, specific shots you want, or any other details..."
                            rows={4}
                          />
                        </div>

                        {/* Booking Summary */}
                        <Card className="bg-gray-50">
                          <CardContent className="p-6">
                            <h3 className="font-semibold mb-4">Booking Summary</h3>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span>Service:</span>
                                <span>{services.find(s => s.id.toString() === selectedService)?.name}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Date:</span>
                                <span>{formatDate(selectedDate)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Time:</span>
                                <span>{selectedTime}</span>
                              </div>
                              <div className="flex justify-between font-semibold">
                                <span>Price:</span>
                                <span>{services.find(s => s.id.toString() === selectedService)?.price}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <div className="flex justify-between">
                          <Button variant="outline" onClick={prevStep} className="px-6 py-3 text-base border-2 border-gray-300 hover:bg-gray-100">
                            Back
                          </Button>
                          <Button 
                            type="submit" 
                            className="btn-continue px-8 py-3 text-lg"
                          >
                            Send Booking Request
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default BookingPage;