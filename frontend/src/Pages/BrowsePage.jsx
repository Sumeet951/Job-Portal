import React, { useEffect, useState } from "react";
// import { Bookmark } from 'lucide-react';
import JobCard from "../components/JobCard"
import Navbar from "../components/shared/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobs } from "../Redux/Slices/JobSlice";
import { useLocation } from "react-router-dom";
export default function BrowsePage() {
  const [savedJobs, setSavedJobs] = useState([]);
  const jobs = useSelector((state) => state?.job?.jobs);
  const location=useLocation();
  const {searchQuery}=location.state || {};
  console.log(jobs);
  const dispatch = useDispatch();
  async function fetchjobs() {
    const response = await dispatch(getAllJobs(searchQuery));
    console.log(response);
  }
  useEffect(() => {
    fetchjobs();
  }, [dispatch]);

  const toggleSaveJob = (jobId) => {
    setSavedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId],
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Results Header */}
        <h1 className="text-2xl font-bold mb-8">
          Search Results ({jobs.length})
        </h1>

        {/* Job Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              isSaved={savedJobs.includes(job.id)}
              onToggleSave={toggleSaveJob}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
