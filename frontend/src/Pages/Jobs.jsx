import React, { useEffect, useState } from "react";
import Navbar from "../components/shared/Navbar";
import JobListings from "../components/JobListings";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobs } from "../Redux/Slices/JobSlice";

const locationsData = ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"];
const industriesData = [
  "Frontend Developer",
  "Backend Developer",
  "FullStack Developer",
];
const salariesData = ["0-40k", "42-1lakh", "1lakh to 5lakh"];


// ================= FILTER SIDEBAR =================

const FilterSidebar = ({
  selectedLocation,
  setSelectedLocation,
  selectedIndustries,
  toggleIndustry,
  selectedSalary,
  setSelectedSalary,
}) => {
  return (
    <div className="w-64 flex-shrink-0">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-6">Filter Jobs</h2>

        {/* LOCATION */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Location</h3>
          <div className="space-y-2">
            {locationsData.map((location) => (
              <label key={location} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="location"
                  checked={selectedLocation === location}
                  onChange={() => setSelectedLocation(location)}
                  className="w-4 h-4 text-purple-600"
                />
                <span className="ml-2 text-gray-700">{location}</span>
              </label>
            ))}
          </div>
        </div>

        {/* INDUSTRY */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Industry</h3>
          <div className="space-y-2">
            {industriesData.map((industry) => (
              <label key={industry} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedIndustries.includes(industry)}
                  onChange={() => toggleIndustry(industry)}
                  className="w-4 h-4 text-purple-600 rounded"
                />
                <span className="ml-2 text-gray-700">{industry}</span>
              </label>
            ))}
          </div>
        </div>

        {/* SALARY */}
        <div>
          <h3 className="font-semibold mb-3">Salary</h3>
          <div className="space-y-2">
            {salariesData.map((salary) => (
              <label key={salary} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="salary"
                  checked={selectedSalary === salary}
                  onChange={() => setSelectedSalary(salary)}
                  className="w-4 h-4 text-purple-600"
                />
                <span className="ml-2 text-gray-700">{salary}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


// ================= MAIN JOB PAGE =================

export default function Jobs() {
  const dispatch = useDispatch();

  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const [selectedSalary, setSelectedSalary] = useState("");
  const [savedJobs, setSavedJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const jobsData = useSelector((state) => state?.job?.jobs);

  // ================= FETCH JOBS =================

  const fetchJobs = async () => {
    setIsLoading(true);

    let keyword = "";

    if (selectedLocation) keyword += selectedLocation + " ";

    if (selectedIndustries.length > 0)
      keyword += selectedIndustries.join(" ") + " ";

    if (selectedSalary) keyword += selectedSalary;

    await dispatch(getAllJobs(keyword));

    setIsLoading(false);
  };

  // ================= FILTER WATCH =================

  useEffect(() => {
    fetchJobs();
  }, [selectedLocation, selectedIndustries, selectedSalary]);

  // ================= SAVE JOB =================

  const toggleSaveJob = (jobId) => {
    setSavedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };

  // ================= INDUSTRY TOGGLE =================

  const toggleIndustry = (industry) => {
    setSelectedIndustries((prev) =>
      prev.includes(industry)
        ? prev.filter((i) => i !== industry)
        : [...prev, industry]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">

          {/* SIDEBAR */}
          <FilterSidebar
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
            selectedIndustries={selectedIndustries}
            toggleIndustry={toggleIndustry}
            selectedSalary={selectedSalary}
            setSelectedSalary={setSelectedSalary}
          />

          {/* JOB LIST */}
          {isLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading jobs...</p>
              </div>
            </div>
          ) : (
            <JobListings
              jobs={jobsData}
              savedJobs={savedJobs}
              onToggleSave={toggleSaveJob}
            />
          )}

        </div>
      </div>
    </div>
  );
}