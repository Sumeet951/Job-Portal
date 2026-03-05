import { useEffect, useState } from "react";
import Navbar from "../components/shared/Navbar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getApplicants, updateStatus } from "../Redux/Slices/ApplicationSlice";

export default function Applicants() {
  const sampleApplicant = useSelector(
    (state) => state.application?.getapplicant
  );
  console.log(sampleApplicant)

  const [applicants, setApplicants] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const param = useParams();
  const dispatch = useDispatch();

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  async function fetchAllApplications() {
    await dispatch(getApplicants(param.id));
  }
  // async function handleupdate()=>{

  // }

  useEffect(() => {
    fetchAllApplications();
  }, [dispatch]);

  useEffect(() => {
    if (sampleApplicant) setApplicants(sampleApplicant);
  }, [sampleApplicant]);

   const handleAction = async (id, action) => {
    setApplicants((prev) =>
      prev.map((a) => (a._id === id ? { ...a, status: action } : a))
    );
    setOpenDropdown(null);
    const response=await dispatch(updateStatus({data:{status:action},id:id}))
    console.log(response);
  };

  const toggleDropdown = (id, e) => {
    e.stopPropagation();
    setOpenDropdown(openDropdown === id ? null : id);
  };

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen bg-gray-50 p-8"
        onClick={() => setOpenDropdown(null)}
      >
        <div className="max-w-6xl mx-auto">

          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            Applicants ({applicants.length})
          </h1>
          <p className="text-sm text-gray-400 mb-6">
            A list of your recent applied users
          </p>

          {/* overflow-visible so dropdown is not clipped */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-visible">

            {/* Table Head */}
            <div className="grid grid-cols-6 px-6 py-3 bg-gray-50 border-b border-gray-100 rounded-t-xl">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">FullName</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Email</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Contact</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Resume</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Date</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 text-right">Action</span>
            </div>

            {/* Table Rows */}
            {applicants.map((applicant, idx) => (
              <div
                key={applicant._id}
                className={`grid grid-cols-6 px-6 py-4 items-center relative overflow-visible hover:bg-gray-50 transition-colors ${
                  idx !== applicants.length - 1 ? "border-b border-gray-100" : ""
                }`}
                onClick={(e) => e.stopPropagation()}
              >

                {/* Full Name */}
                <span className="text-sm font-medium text-gray-800">
                  {applicant.applicant?.fullname}
                </span>

                {/* Email */}
                <span className="text-sm text-gray-500">
                  {applicant.applicant?.email}
                </span>

                {/* Contact */}
                <span className="text-sm text-gray-500">
                  {applicant.applicant?.phoneNumber}
                </span>

                {/* Resume */}
                <a
                  href={applicant.applicant?.profile?.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-red-500 bg-red-50 border border-red-100 px-3 py-1.5 rounded-md w-fit hover:bg-red-100 transition-colors"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  View
                </a>

                {/* Date */}
                <span className="text-sm text-gray-400">
                  {formatDate(applicant?.createdAt)}
                </span>

                {/* Action */}
                <div className="flex justify-end relative">

                  {applicant.status === "accepted" && (
                    <span  className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-3 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                      Accepted
                    </span>
                  )}

                  {applicant.status === "rejected" && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
                      Rejected
                    </span>
                  )}

                  {applicant.status === "pending" && (
                    <>
                      <button
                        onClick={(e) => toggleDropdown(applicant._id, e)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <circle cx="4" cy="10" r="1.5" />
                          <circle cx="10" cy="10" r="1.5" />
                          <circle cx="16" cy="10" r="1.5" />
                        </svg>
                      </button>

                      {openDropdown === applicant._id && (
                        <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden w-36">
                          <button
                            onClick={() => handleAction(applicant._id, "accepted")}
                            className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-green-600 font-medium hover:bg-green-50 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            Accepted
                          </button>
                          <div className="h-px bg-gray-100" />
                          <button
                            onClick={() => handleAction(applicant._id, "rejected")}
                            className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-500 font-medium hover:bg-red-50 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                            Rejected
                          </button>
                        </div>
                      )}
                    </>
                  )}

                </div>
              </div>
            ))}

            {/* Empty state */}
            {applicants.length === 0 && (
              <div className="text-center py-16 text-gray-300 text-sm">
                No applicants found.
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
}