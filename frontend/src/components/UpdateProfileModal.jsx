import React, { useState, useEffect } from "react";
import { X, Upload } from "lucide-react";
import { getUserProfile, updateProfile } from "../Redux/Slices/AuthSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const UpdateProfileModal = ({ isOpen, onClose, profile }) => {
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    bio: "",
    skills: "",
    resume: null,
  });

  useEffect(() => {
    if (profile && isOpen) {
      setFormData({
        fullname: profile.fullname || "",
        email: profile.email || "",
        phoneNumber: profile.phoneNumber || "",
        bio: profile.profile?.bio || "",
        skills: profile.profile?.skills?.join(", ") || "",
        resume: null,
      });
    }
  }, [profile, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, resume: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdatas = new FormData();
    formdatas.append("fullname", formData.fullname);
    formdatas.append("email", formData.email);
    formdatas.append("phoneNumber", formData.phoneNumber);
    formdatas.append("bio", formData.bio);
    formdatas.append("skills", formData.skills);
    if (formData.resume) formdatas.append("file", formData.resume);

    const response = await dispatch(updateProfile(formdatas));
    if (response.payload?.success) {
      
      setTimeout(()=>{
        navigate(0);
      },1000)
    }
  
    else toast.error(response.payload?.message || "Update Failed");

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md animate-fadeIn">

        {/* HEADER */}
        <div className="flex items-center justify-between p-5 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* FORM BODY */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">

          {/* NAME */}
          <div>
            <label className="text-sm font-semibold text-gray-600">Full Name</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="mt-1 w-full p-3 border rounded-xl focus:ring-2 focus:ring-black outline-none"
              placeholder="Your name"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-semibold text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full p-3 border rounded-xl focus:ring-2 focus:ring-black outline-none"
              placeholder="example@mail.com"
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="text-sm font-semibold text-gray-600">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="mt-1 w-full p-3 border rounded-xl focus:ring-2 focus:ring-black outline-none"
              placeholder="+91 00000 00000"
            />
          </div>

          {/* BIO */}
          <div>
            <label className="text-sm font-semibold text-gray-600">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="3"
              className="mt-1 w-full p-3 border rounded-xl focus:ring-2 focus:ring-black outline-none resize-none"
              placeholder="Tell something about yourself..."
            />
          </div>

          {/* SKILLS */}
          <div>
            <label className="text-sm font-semibold text-gray-600">Skills</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="mt-1 w-full p-3 border rounded-xl focus:ring-2 focus:ring-black outline-none"
              placeholder="React, Node, ML, etc..."
            />
          </div>

          {/* RESUME UPLOAD */}
          <div>
            <label className="text-sm font-semibold text-gray-600">Resume</label>
            <div className="mt-2 flex items-center justify-between border rounded-xl p-3 bg-gray-50">
              <label htmlFor="resume-upload" className="flex items-center gap-2 cursor-pointer text-gray-700">
                <Upload className="w-5 h-5" />
                <span>{formData.resume ? formData.resume.name : "Upload resume"}</span>
              </label>
              <input type="file" id="resume-upload" className="hidden" onChange={handleFileChange} />
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button className="w-full bg-black text-white py-3 rounded-xl font-medium hover:opacity-90 transition">
            Save Changes
          </button>

        </form>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
