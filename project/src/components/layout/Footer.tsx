import React from 'react';
import { Link } from 'react-router-dom';
import { Droplets, Instagram, Twitter, Facebook, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <Droplets className="h-8 w-8 text-primary-400" />
              <span className="ml-2 text-xl font-bold text-white">Dignity Hub</span>
            </div>
            <p className="text-sm text-gray-400">
              Empowering San Jose through Cleanliness, Dignity, and Hygiene. Join our mission to make the city cleaner and more dignified for everyone.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="mailto:contact@dignityhubsj.org" className="text-gray-400 hover:text-white transition-colors duration-200">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/education" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Hygiene Education
                </Link>
              </li>
              <li>
                <Link to="/map" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Resource Map
                </Link>
              </li>
              <li>
                <Link to="/alerts" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Health Alerts
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Report Issues
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Get Involved</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/volunteer" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Volunteer Opportunities
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <address className="not-italic text-gray-400 space-y-2">
              <p>Dignity Hub San Jose</p>
              <p>200 E Santa Clara St</p>
              <p>San Jose, CA 95113</p>
              <p>
                <a href="tel:+14081234567" className="hover:text-white transition-colors duration-200">
                  (408) 123-4567
                </a>
              </p>
              <p>
                <a href="mailto:contact@dignityhubsj.org" className="hover:text-white transition-colors duration-200">
                  contact@dignityhubsj.org
                </a>
              </p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2025 Dignity Hub San Jose. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Accessibility
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;