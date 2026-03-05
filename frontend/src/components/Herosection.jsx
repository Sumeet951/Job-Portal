import { useEffect, useState } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getAllJobs } from '../Redux/Slices/JobSlice';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const categories = [
    'Frontend Developer',
    'Backend Developer',
    'Data Science',
    'Graphic Designer',
    'Full Stack Developer',
    'UI/UX Designer'
  ];

  const handleSearch =async (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    await dispatch(getAllJobs());
    navigate("/browser",{state:{searchQuery:searchQuery}});
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(categories.length / 2));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(categories.length / 2)) % Math.ceil(categories.length / 2));
  };

  const visibleCategories = [
    categories[currentSlide * 2],
    categories[currentSlide * 2 + 1]
  ].filter(Boolean);

  return (
    <div className=" bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-16">
      <div className="max-w-5xl w-full text-center">
        {/* Badge */}
        <div className="inline-block mb-8">
          <span className="px-4 py-2 bg-red-50 text-red-600 rounded-full text-sm font-semibold border border-red-100">
            No. 1 Job Hunt Website
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Search, Apply &<br />
          Get Your <span className="text-purple-600">Dream Jobs</span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aspernatur temporibus nihil tempora dolor!
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Find your dream jobs"
              className="w-full px-6 py-4 pr-20 text-lg rounded-full border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition shadow-lg"
            />
            <button
              type="submit"
              className="absolute right-2 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full transition-all shadow-md hover:shadow-lg"
            >
              <Search className="w-6 h-6" />
            </button>
          </div>
        </form>

        {/* Category Slider */}
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-4">
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="p-2 rounded-full border-2 border-gray-300 hover:border-purple-500 hover:bg-purple-50 transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>

            {/* Category Pills */}
            <div className="flex gap-4 flex-1 justify-center">
              {visibleCategories.map((category, index) => (
                
                    <button  onClick={() => navigate("/browser", { state: { searchQuery: category } })}
                  key={index}
                  className="px-6 py-3 bg-white border-2 border-gray-200 rounded-full text-gray-800 font-medium hover:border-purple-500 hover:bg-purple-50 hover:text-purple-600 transition-all shadow-md"
                >
                  {category}
                </button>
    
                
                
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="p-2 rounded-full border-2 border-gray-300 hover:border-purple-500 hover:bg-purple-50 transition-all"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}