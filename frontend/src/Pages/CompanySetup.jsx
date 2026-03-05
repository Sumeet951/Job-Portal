import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Navbar from "../components/shared/Navbar";
import { getCompanyById, updateCompany } from "../Redux/Slices/CompanySlice";
import { useDispatch, useSelector} from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const CompanySetup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
const company=useSelector((state)=>state?.company?.company);
console.log(company);
const id = useParams().id; // destructure to get the actual id string
console.log(id)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const [fileName, setFileName] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        file: file,
      }));
      setFileName(file.name);
    }
  };

  const handleBack = () => {
    console.log("Back clicked");
    navigate(-1);
    // Add your back navigation logic here
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("website", formData.website);
    data.append("location", formData.location);
    if (formData.file) {
      data.append("file", formData.file);
    }
    for (let [key, value] of data.entries()) {
  console.log(key, value);
}
    //dispatch function
    const response = await dispatch(updateCompany({id,data}));
    if (response.payload?.data?.success) {
      navigate("/admin/companies");
    }
    setFormData({
      name: "",
      description: "",
      website: "",
      location: "",
      file: null,
    });
  };
  
useEffect(() => {
  dispatch(getCompanyById(id));
}, [dispatch, id]);

useEffect(() => {
  if (company) {
    setFormData({
      name: company.name || "",
      description: company.description || "",
      website: company.website || "",
      location: company.location || "",
      file: null
    });
  }
}, [company]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <form onSubmit={submitHandler}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="flex items-center gap-8 mb-12">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Company Setup</h1>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Company Name and Description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="companyName"
                  className="block text-sm font-medium text-gray-900 mb-2"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-900 mb-2"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
            </div>

            {/* Website and Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="website"
                  className="block text-sm font-medium text-gray-900 mb-2"
                >
                  Website
                </label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-900 mb-2"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>
            </div>

            {/* Logo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Logo
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="logo"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <label
                  htmlFor="logo"
                  className="flex items-center w-full px-4 py-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <span className="text-gray-900 font-medium mr-4">
                    Choose File
                  </span>
                  <span className="text-gray-500">
                    {fileName || "No file chosen"}
                  </span>
                </label>
              </div>
            </div>

            {/* Update Button */}
            <button
              // onClick={submitHandler}
              className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium text-lg"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CompanySetup;
