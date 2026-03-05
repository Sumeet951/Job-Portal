import React, { useEffect, useState } from "react";
import { MoreVertical, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/shared/Navbar";
import { getAdminJobs } from "../Redux/Slices/JobSlice";
import { UserPlus } from "lucide-react"; // import applicant-style icon


const Adminjobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  const companies = useSelector((state) => state.company?.companies || []);
  const adminjobs = useSelector((state) => state.job?.adminJob);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function fetchAdminJobs() {
    await dispatch(getAdminJobs());
  }

  useEffect(() => {
    fetchAdminJobs();
  }, [dispatch]);

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <input
            type="text"
            placeholder="Filter by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={() => navigate("/admin/jobs/post")}
            className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800"
          >
            New Jobs
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left">Company Name</th>
                <th className="px-6 py-4 text-left">Role</th>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {adminjobs.map((company) => (
                <tr key={company._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <img
                      src={company?.companyId?.logo}
                      alt={company?.companyId?.name}
                      className="w-10 h-10 rounded-lg"
                    />
                  </td>

                  <td className="px-6 py-4">{company.title}</td>

                  <td className="px-6 py-4 text-gray-600">
                    {company.createdAt.split("T")[0]}
                  </td>

                  {/* ✅ FIXED ACTION SECTION */}
                  <td className="px-6 py-4 relative">
                    <button
                      onClick={() => toggleMenu(company._id)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>

                    {openMenuId === company._id && (
                      <>
                        <div
                          className="fixed inset-0"
                          onClick={() => setOpenMenuId(null)}
                        />

                        <div className="absolute right-8 top-1/2 -translate-y-1/2 w-28 bg-white border rounded-lg shadow z-50">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/admin/companies/${company._id}`);
                              setOpenMenuId(null);
                            }}
                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                          >
                            <Pencil className="w-4 h-4" />
                            Edit
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/admin/jobs/${company._id}/applicants`);
                              setOpenMenuId(null);
                            }}
                            className="w-full  pl-3 pb-3 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                          >
                            <UserPlus className="w-4 h-4" />{" "}
                            {/* applicant icon */}
                            Applicants
                          </button>
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredCompanies.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No companies found
            </div>
          )}
        </div>

        <div className="text-center mt-8 text-gray-500 text-sm">
          A list of your recent registered companies
        </div>
      </div>
    </div>
  );
};

export default Adminjobs;
