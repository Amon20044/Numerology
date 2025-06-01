import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import {
  Star,
  Heart,
  TrendingUp,
  Shield,
  Users,
  Clock,
  CheckCircle,
  Award,
  BookOpen,
  Compass,
  Globe,
  Sparkles,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

export default function Landing() {
  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai",
      text: "Sameeksha's numerology reading changed my life. Her insights about my career path were incredibly accurate!",
      rating: 5,
    },
    {
      name: "Rahul Gupta",
      location: "Delhi",
      text: "The relationship guidance helped me understand my partner better. Amazing accuracy and practical advice.",
      rating: 5,
    },
    {
      name: "Anita Reddy",
      location: "Bangalore",
      text: "Her health predictions were spot-on. Following her suggestions improved my wellbeing significantly.",
      rating: 5,
    },
  ];

  const services = [
    {
      icon: <Heart className="w-8 h-8 text-rose-500" />,
      title: "Love & Relationships",
      description: "Find your perfect match, understand relationship dynamics, and timing for marriage",
      features: ["Compatibility Analysis", "Marriage Timing", "Relationship Healing"]
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-500" />,
      title: "Career & Wealth",
      description: "Discover your ideal career path, business opportunities, and wealth-building strategies",
      features: ["Career Guidance", "Business Timing", "Investment Advice"]
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      title: "Health & Wellness",
      description: "Understand your health patterns, preventive measures, and healing approaches",
      features: ["Health Predictions", "Lifestyle Guidance", "Healing Methods"]
    },
    {
      icon: <Sparkles className="w-8 h-8 text-purple-500" />,
      title: "Spiritual Growth",
      description: "Discover your life purpose, spiritual gifts, and path to enlightenment",
      features: ["Life Purpose", "Spiritual Practices", "Karma Healing"]
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Sameeksha Sharma</h1>
              <p className="text-sm text-purple-600">Master Numerologist</p>
            </div>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#services" className="text-gray-600 hover:text-purple-600 transition-colors">Services</a>
            <a href="#about" className="text-gray-600 hover:text-purple-600 transition-colors">About</a>
            <a href="#testimonials" className="text-gray-600 hover:text-purple-600 transition-colors">Testimonials</a>
            <a href="#contact" className="text-gray-600 hover:text-purple-600 transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-purple-200">
              <div className="w-full h-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center">
                <Star className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              Unlock Your Life's
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                Hidden Secrets
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Master Numerologist Sameeksha Sharma reveals your destiny through ancient Vedic numerology. 
              Get profound insights about love, career, health, and spiritual growth with 98% accuracy.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/calculator">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 text-lg rounded-full hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-xl">
                <Sparkles className="w-5 h-5 mr-2" />
                Get Your Reading Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button variant="outline" className="px-8 py-4 text-lg rounded-full border-2 hover:bg-purple-50">
              <Phone className="w-5 h-5 mr-2" />
              Book Consultation
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">15+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">10,000+</div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">98%</div>
              <div className="text-gray-600">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Comprehensive Life Guidance
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover every aspect of your life through precise numerological analysis
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="border-2 border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-200">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Meet Master Numerologist
                <span className="block text-purple-600">Sameeksha Sharma</span>
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  With over 15 years of dedicated practice in Vedic numerology, Sameeksha Sharma has transformed 
                  thousands of lives through her profound insights and accurate predictions. Trained under renowned 
                  masters in India, she combines ancient wisdom with modern understanding.
                </p>
                <p>
                  Her expertise spans across relationship counseling, career guidance, health predictions, and 
                  spiritual awakening. Sameeksha's unique approach integrates traditional numerological principles 
                  with practical life solutions.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="flex items-center space-x-3">
                  <Award className="w-6 h-6 text-purple-600" />
                  <span className="text-gray-700">Certified Master Numerologist</span>
                </div>
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                  <span className="text-gray-700">Published Author</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-6 h-6 text-purple-600" />
                  <span className="text-gray-700">10,000+ Consultations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="w-6 h-6 text-purple-600" />
                  <span className="text-gray-700">International Practice</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-purple-200 to-blue-200 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <Star className="w-24 h-24 text-purple-600 mx-auto mb-4" />
                  <p className="text-purple-700 font-medium">Sameeksha Sharma</p>
                  <p className="text-purple-600">Master Numerologist</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from people whose lives were transformed
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-2 border-gray-100 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <div className="font-semibold text-gray-800">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.location}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Discover Your Destiny?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands who have transformed their lives through numerology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/calculator">
              <Button className="bg-white text-purple-600 px-8 py-4 text-lg rounded-full hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-xl">
                <Sparkles className="w-5 h-5 mr-2" />
                Start Your Reading
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button variant="outline" className="border-2 border-white text-white px-8 py-4 text-lg rounded-full hover:bg-white hover:text-purple-600">
              <Phone className="w-5 h-5 mr-2" />
              Call +91 98765 43210
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-600">
              Ready to transform your life? Reach out to us today
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8">
              <Phone className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-gray-600 mb-2">+91 98765 43210</p>
              <p className="text-gray-600">Available 24/7</p>
            </Card>
            
            <Card className="text-center p-8">
              <Mail className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="text-gray-600 mb-2">info@sameeksha-numerology.com</p>
              <p className="text-gray-600">Quick response guaranteed</p>
            </Card>
            
            <Card className="text-center p-8">
              <MapPin className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
              <p className="text-gray-600 mb-2">Mumbai, India</p>
              <p className="text-gray-600">By appointment only</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Star className="w-6 h-6 text-purple-400" />
                <span className="text-xl font-bold">Sameeksha Sharma</span>
              </div>
              <p className="text-gray-400">
                Transforming lives through authentic Vedic numerology
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Personal Readings</li>
                <li>Relationship Guidance</li>
                <li>Career Consultation</li>
                <li>Health Predictions</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Free Calculator</li>
                <li>Blog Articles</li>
                <li>Success Stories</li>
                <li>FAQ</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>+91 98765 43210</li>
                <li>info@sameeksha-numerology.com</li>
                <li>Mumbai, India</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Sameeksha Sharma Numerology. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}