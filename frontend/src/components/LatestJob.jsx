import React, { useEffect } from 'react';
import { MapPin, Briefcase, Clock } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllJobs } from '../Redux/Slices/JobSlice';
import { useNavigate } from 'react-router-dom';


export default function LatestJobs() {
  const dispatch = useDispatch();
    const jobs = useSelector((state) => state?.job?.jobs);
    const navigate=useNavigate();
  
    console.log(jobs);
  
    async function fetchJobs() {
      await dispatch(getAllJobs());
    }
  
    useEffect(() => {
      fetchJobs();   // ✅ call the function
    }, []);
 

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-bold mb-12">
          <span className="text-purple-600">Latest & Top</span>{' '}
          <span className="text-gray-900">Job Openings</span>
        </h2>

        {/* Job Cards Grid */}
        <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {jobs.map((job) => (
            <div 
              onClick={()=>navigate(`/jobs/description/${job._id}`)}
              key={job._id}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border cursor-pointer border-gray-100"
            >
              {/* Company Info */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {job?.companyId?.name}
                </h3>
                <p className="text-gray-500 text-sm flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </p>
              </div>

              {/* Job Title */}
              <h4 className="text-lg font-bold text-gray-800 mb-3">
                {job.title}
              </h4>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {job.description}
              </p>

              {/* Job Details */}
              <div className="flex flex-wrap gap-3 items-center">
                <span className="text-purple-600 font-semibold text-sm">
                  {job.positions} 
                </span>
                <span className="text-red-600 font-semibold text-sm">
                  {job.Type}
                </span>
                <span className="text-purple-600 font-semibold text-sm">
                  {job.salary}LPA
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Brand */}
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-900">Job Hunt</h3>
          <div className="flex gap-4">
            <button className="p-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
            <button className="p-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </button>
            <button className="p-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}