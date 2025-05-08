import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Droplet, Recycle, Heart, ArrowRight } from 'lucide-react';
import { getAllEducationContent, getEducationContentByCategory, getEducationContentById } from '../data/mockEducation';
import { EducationContent } from '../data/mockEducation';

const EducationPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'hygiene' | 'waste' | 'menstrual'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContent, setSelectedContent] = useState<EducationContent | null>(null);
  
  const allContent = getAllEducationContent();
  
  // Filter content based on category and search query
  const filteredContent = selectedCategory === 'all'
    ? allContent
    : getEducationContentByCategory(selectedCategory);
    
  const searchFilteredContent = searchQuery
    ? filteredContent.filter(content => 
        content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.description.toLowerCase().includes(searchQuery.toLowerCase()))
    : filteredContent;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">Hygiene Education</h1>
          <p className="text-gray-600 mt-2">Learn essential practices for better health and dignity</p>
        </motion.div>

        {selectedContent ? (
          <DetailView 
            content={selectedContent} 
            onBack={() => setSelectedContent(null)} 
          />
        ) : (
          <ListView 
            content={searchFilteredContent}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setSelectedContent={setSelectedContent}
          />
        )}
      </div>
    </div>
  );
};

interface ListViewProps {
  content: EducationContent[];
  selectedCategory: 'all' | 'hygiene' | 'waste' | 'menstrual';
  setSelectedCategory: (category: 'all' | 'hygiene' | 'waste' | 'menstrual') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setSelectedContent: (content: EducationContent) => void;
}

const ListView: React.FC<ListViewProps> = ({
  content,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  setSelectedContent
}) => {
  return (
    <>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 mb-8">
        <div className="relative flex-1 md:mr-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="input pl-10"
            placeholder="Search for resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap space-x-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl ${
              selectedCategory === 'all'
                ? 'bg-primary-100 text-primary-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            } transition-colors duration-200`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedCategory('hygiene')}
            className={`flex items-center px-4 py-2 rounded-xl ${
              selectedCategory === 'hygiene'
                ? 'bg-primary-100 text-primary-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            } transition-colors duration-200`}
          >
            <Droplet className="h-4 w-4 mr-2" />
            Hygiene
          </button>
          <button
            onClick={() => setSelectedCategory('waste')}
            className={`flex items-center px-4 py-2 rounded-xl ${
              selectedCategory === 'waste'
                ? 'bg-primary-100 text-primary-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            } transition-colors duration-200`}
          >
            <Recycle className="h-4 w-4 mr-2" />
            Waste Management
          </button>
          <button
            onClick={() => setSelectedCategory('menstrual')}
            className={`flex items-center px-4 py-2 rounded-xl ${
              selectedCategory === 'menstrual'
                ? 'bg-primary-100 text-primary-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            } transition-colors duration-200`}
          >
            <Heart className="h-4 w-4 mr-2" />
            Menstrual Hygiene
          </button>
        </div>
      </div>
      
      {content.length === 0 ? (
        <div className="text-center py-16">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No results found</h3>
          <p className="text-gray-600">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="card group hover:cursor-pointer overflow-hidden"
              onClick={() => setSelectedContent(item)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.category === 'hygiene' ? 'bg-primary-100 text-primary-800' :
                    item.category === 'waste' ? 'bg-green-100 text-green-800' :
                    'bg-pink-100 text-pink-800'
                  }`}>
                    {item.category === 'hygiene' ? 'Hygiene' :
                     item.category === 'waste' ? 'Waste Management' :
                     'Menstrual Hygiene'}
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary-600 transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {item.description}
                </p>
                <div className="flex justify-end">
                  <button className="text-primary-600 group-hover:text-primary-800 transition-colors duration-200 flex items-center text-sm font-medium">
                    Read More <ArrowRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
};

interface DetailViewProps {
  content: EducationContent;
  onBack: () => void;
}

const DetailView: React.FC<DetailViewProps> = ({ content, onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white rounded-2xl shadow-md overflow-hidden"
    >
      <div className="relative h-64 md:h-80">
        <img
          src={content.imageUrl}
          alt={content.title}
          className="w-full h-full object-cover"
        />
        <button
          onClick={onBack}
          className="absolute top-4 left-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors duration-200"
        >
          <ArrowRight className="h-5 w-5 transform rotate-180" />
        </button>
        <div className="absolute top-4 right-4">
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            content.category === 'hygiene' ? 'bg-primary-100 text-primary-800' :
            content.category === 'waste' ? 'bg-green-100 text-green-800' :
            'bg-pink-100 text-pink-800'
          }`}>
            {content.category === 'hygiene' ? 'Hygiene' :
             content.category === 'waste' ? 'Waste Management' :
             'Menstrual Hygiene'}
          </div>
        </div>
      </div>
      
      <div className="p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">{content.title}</h2>
        <p className="text-gray-700 text-lg mb-6">{content.description}</p>
        
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: content.content }}
        />
        
        {content.videoUrl && (
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Watch Educational Video</h3>
            <div className="relative pt-[56.25%] rounded-xl overflow-hidden">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={content.videoUrl}
                title={`${content.title} Video`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
        
        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={onBack}
            className="btn btn-outline"
          >
            Back to All Resources
          </button>
          
          <button className="btn btn-primary">
            Download PDF
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default EducationPage;