import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate, useParams } from 'react-router-dom';
import { getJobById } from '../Redux/Slices/JobSlice';
import { getUserProfile } from '../Redux/Slices/AuthSlice';
import { applyjob } from '../Redux/Slices/ApplicationSlice';
import toast from 'react-hot-toast';
export default function JobDescription() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
 const user=useSelector((state)=>state?.auth?.userProfile);
 console.log(user);
  const {id}=useParams();
 
  async function fetchJob(){
    await dispatch(getJobById(id));
    await dispatch(getUserProfile());
  }
  useEffect(()=>{
    fetchJob();
  },[])
  const applyJobHandler = async (e) => {
  e.preventDefault();
  const response = await dispatch(applyjob(id));
  if (response?.payload?.data) {
   fetchJob() // refetch updated job info
  }
};
  const jobDetails=useSelector((state)=>state?.job?.job)
  console.log(jobDetails);
const isApplied = jobDetails?.application?.some(
  (application) => application?.applicant === user?._id
) || false;  
console.log(isApplied)

  // const jobDetails = {
  //   title: 'Frontend Developer',
  //   positions: '12 Positions',
  //   type: 'Part Time',
  //   salary: '24LPA',
  //   role: 'Frontend Developer',
  //   location: 'Hyderabad',
  //   description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium similique sed dolor!',
  //   experience: '2 yrs',
  //   salaryRange: '12LPA',
  //   totalApplicants: 4,
  //   postedDate: '17-07-2024',
  //   isApplied: true
  // };

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {jobDetails.title}
            </h1>
            <div className="flex flex-wrap gap-4 items-center">
              <span className="text-purple-600 font-semibold">
                {jobDetails.position}
              </span>
              <span className="text-red-600 font-semibold">
                {jobDetails.jobType}
              </span>
              <span className="text-purple-600 font-semibold">
                {jobDetails.salary}
              </span>
            </div>
          </div>
          
       <button onClick={isApplied?null:applyJobHandler}
  disabled={isApplied}
  className={`px-6 py-3 text-white rounded-lg font-semibold 
    ${isApplied ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
>
  {isApplied ? "Already Applied" : "Apply Now"}
</button>
        </div>

        {/* Job Description Section */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Job Description
          </h2>

          <div className="space-y-4">
            <div className="flex">
              <span className="font-semibold text-gray-900 w-48">Role:</span>
              <span className="text-gray-700">{jobDetails.role}</span>
            </div>

            <div className="flex">
              <span className="font-semibold text-gray-900 w-48">Location:</span>
              <span className="text-gray-700">{jobDetails.location}</span>
            </div>

            <div className="flex">
              <span className="font-semibold text-gray-900 w-48">Description:</span>
              <span className="text-gray-700">{jobDetails.description}</span>
            </div>

            <div className="flex">
              <span className="font-semibold text-gray-900 w-48">Experience:</span>
              <span className="text-gray-700">{jobDetails.experienceLevel}Years</span>
            </div>

            <div className="flex">
              <span className="font-semibold text-gray-900 w-48">Salary:</span>
              <span className="text-gray-700">{jobDetails.salary}LPA</span>
            </div>

            <div className="flex">
              <span className="font-semibold text-gray-900 w-48">Total Applicants:</span>
              <span className="text-gray-700">{jobDetails?.application?.length}</span>
            </div>

            <div className="flex">
              <span className="font-semibold text-gray-900 w-48">Posted Date:</span>
              <span className="text-gray-700">{jobDetails?.createdAt?.split("T")[0]}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}