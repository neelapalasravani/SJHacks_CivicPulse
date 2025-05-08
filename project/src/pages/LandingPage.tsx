import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Droplet, ShieldPlus, Users, ArrowRight, Heart, MapIcon, BookOpen } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 lg:pt-32 pb-16 lg:pb-24 bg-gradient-to-b from-primary-50 to-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Empowering San Jose through{' '}
                <span className="text-primary-600">Cleanliness, Dignity, and Hygiene</span>
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Join our community-driven initiative to create a cleaner, healthier, and more dignified San Jose for everyone.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/map" className="btn btn-primary">
                  Explore Resources
                </Link>
                <Link to="/volunteer" className="btn btn-outline">
                  Get Involved
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:pl-10"
            >
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src="https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="People cleaning up a park"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="bg-success-500 text-white p-2 rounded-full">
                      <Heart className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Join 500+ volunteers</p>
                      <p className="text-xs text-gray-500">Making a difference</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="hidden lg:block absolute top-1/4 left-10 w-16 h-16 bg-accent-100 rounded-full"></div>
        <div className="hidden lg:block absolute bottom-1/4 right-10 w-8 h-8 bg-secondary-100 rounded-full"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Making San Jose Cleaner & Healthier</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dignity Hub provides essential resources to promote cleanliness, prevent disease, and support the dignity of all citizens.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <MapIcon className="h-8 w-8 text-primary-600" />,
                title: 'Interactive Resource Map',
                description: 'Locate public restrooms, trash bins, and menstrual product vending stations across San Jose.'
              },
              {
                icon: <ShieldPlus className="h-8 w-8 text-primary-600" />,
                title: 'Disease Prevention',
                description: 'Get alerts and education about hygiene practices to prevent the spread of disease.'
              },
              {
                icon: <BookOpen className="h-8 w-8 text-primary-600" />,
                title: 'Hygiene Education',
                description: 'Access educational resources about proper hygiene practices for all ages.'
              },
              {
                icon: <MapPin className="h-8 w-8 text-primary-600" />,
                title: 'Issue Reporting',
                description: 'Report cleanliness issues around the city for quick resolution.'
              },
              {
                icon: <Users className="h-8 w-8 text-primary-600" />,
                title: 'Volunteer Opportunities',
                description: 'Join community clean-up efforts and earn points for your contributions.'
              },
              {
                icon: <Droplet className="h-8 w-8 text-primary-600" />,
                title: 'Clean Management',
                description: 'Track and manage trash reports and cleanliness ratings across the city.'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 hover:translate-y-[-8px]"
              >
                <div className="bg-primary-50 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <Link
                  to={index === 0 ? '/map' : index === 1 ? '/alerts' : index === 2 ? '/education' : index === 3 ? '/support' : index === 4 ? '/volunteer' : '/dashboard'}
                  className="text-primary-600 font-medium flex items-center hover:text-primary-700 transition-colors"
                >
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Impact on San Jose</h2>
              <p className="text-lg text-gray-700 mb-8">
                Since launching Dignity Hub, we've made significant progress in improving the cleanliness, hygiene, and dignity of San Jose.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: '500+', label: 'Volunteers' },
                  { number: '75+', label: 'Clean-up Events' },
                  { number: '150+', label: 'Public Restrooms Mapped' },
                  { number: '300+', label: 'Issues Resolved' }
                ].map((stat, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                    <p className="text-3xl font-bold text-primary-600">{stat.number}</p>
                    <p className="text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Volunteer cleaning event"
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Mission Today</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Whether you want to volunteer, report issues, or learn more about hygiene practices, we welcome you to the Dignity Hub community.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <Link
              to="/signup"
              className="btn bg-white text-primary-600 hover:bg-gray-100"
            >
              Sign Up Now
            </Link>
            <Link
              to="/map"
              className="btn bg-primary-700 text-white hover:bg-primary-800"
            >
              Explore Resources
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default LandingPage;