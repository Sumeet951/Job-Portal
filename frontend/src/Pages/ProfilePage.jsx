import React, { useEffect, useState } from "react";
import { Mail, Contact, Edit2 } from "lucide-react";
import Navbar from "../components/shared/Navbar";
import UpdateProfileModal from "../components/UpdateProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { getAllAppliedJob } from "../Redux/Slices/ApplicationSlice";
import { useNavigate } from "react-router-dom";

const appliedJobsData = [
  {
    id: 1,
    date: "17-07-2024",
    role: "Frontend Developer",
    company: "Google",
    status: "Selected",
  },
  {
    id: 2,
    date: "17-07-2024",
    role: "Frontend Developer",
    company: "Google",
    status: "Selected",
  },
  {
    id: 3,
    date: "15-07-2024",
    role: "Backend Developer",
    company: "Microsoft",
    status: "Pending",
  },
  {
    id: 4,
    date: "10-07-2024",
    role: "Full Stack Developer",
    company: "Amazon",
    status: "Rejected",
  },
];

// Profile Card Component
const ProfileCard = ({ profile, onEditClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start gap-6">
          {/* Avatar */}
          <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
            <svg
              className="w-16 h-16 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          {/* Profile Info */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              {profile.fullname}
            </h2>
            <p className="text-gray-600 leading-relaxed max-w-2xl">
              {profile?.profile?.bio}
            </p>
          </div>
        </div>

        {/* Edit Button */}
        <button
          onClick={onEditClick} // Yeh prop ProfileCard ko pass karna hai
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Edit2 className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Contact Info */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3 text-gray-700">
          <Mail className="w-5 h-5" />
          <span>{profile.email}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-700">
          <Contact className="w-5 h-5" />
          <span>{profile?.phoneNumber}</span>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {profile?.profile?.skills.map((skill, index) => (
            <span
              key={index}
              className="px-4 py-1.5 bg-black text-white text-sm rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Resume */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-2">Resume</h3>
        <a
          href={profile?.profile?.resume}
          className="text-blue-600 hover:text-blue-700 hover:underline"
        >
          {profile.profile?.resumeOriginalName}
        </a>
      </div>
    </div>
  );
};

// Applied Jobs Table Component
const AppliedJobsTable = () => {
  const job = useSelector((state) => state?.application?.allappliedjob);
  const dispatch = useDispatch();
  console.log(job);
  async function fetchjob() {
    const response = await dispatch(getAllAppliedJob());
    console.log(response);
  }
  useEffect(() => {
    fetchjob();
  }, [dispatch]);
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Applied Jobs
        </h2>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-4 text-gray-600 font-medium">
                  Date
                </th>
                <th className="text-left py-4 px-4 text-gray-600 font-medium">
                  Job Role
                </th>
                <th className="text-left py-4 px-4 text-gray-600 font-medium">
                  Company
                </th>
                <th className="text-right py-4 px-4 text-gray-600 font-medium">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {job.map((job) => (
                <tr
                  key={job.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4 text-gray-700">
                    {new Date(job?.job?.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="py-4 px-4 text-gray-700">{job?.job?.title}</td>
                  <td className="py-4 px-4 text-gray-700">
                    {job?.job?.companyId?.name}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span
                      className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium ${
                        job.status === "accepted"
                          ? "bg-black text-white"
                          : job.status === "rejected"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Main Profile Page Component
export default function ProfilePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const profileData = useSelector((state) => state.auth?.userProfile);
  console.log("Profile Data from Redux:", profileData);
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <ProfileCard
          profile={profileData}
          onEditClick={() => setIsModalOpen(true)}
        />
        <AppliedJobsTable />
        <UpdateProfileModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          profile={profileData}
        />
      </div>
    </div>
  );
}
