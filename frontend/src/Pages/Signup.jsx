import React, { useState } from 'react'
import Navbar from '../components/shared/Navbar';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { createAccount } from '../Redux/Slices/AuthSlice';

const Signup = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [signupData,setSignUpDetails]=useState({
         fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    })
    const [previewImage,setPreviewImage]=useState("");
    function handleUserInput(e){
        const {name,value}=e.target;
        setSignUpDetails({
            ...signupData,
            [name]:value
        })
    }
    //handle Image
    function handleImage(e){
        e.preventDefault();
        const uploadImage=e.target.files[0];
        if(!uploadImage) return;
        setSignUpDetails({
            ...signupData,
            file:uploadImage
            //profile:uploadImage
        })
        const fileReader=new FileReader();
          fileReader.readAsDataURL(uploadImage);
        fileReader.addEventListener("load", function () {
            setPreviewImage(this.result);
        });
    }
    async function onFormSubmit(e){
        e.preventDefault();
        if(!signupData.fullname || !signupData.email || !signupData.phoneNumber || !signupData.password || !signupData.role)
{
    toast.error("Please fill all the fields");
    return;
}
console.log(signupData.fullname);
     if(signupData.fullname.length<3){
            toast.error("Full name must be at least 3 characters long");
            return;
     }
     const formData=new FormData();
        formData.append("fullname",signupData.fullname);
        formData.append("email",signupData.email);
        formData.append("phoneNumber",signupData.phoneNumber);
        formData.append("password",signupData.password);
        formData.append("role",signupData.role);
        formData.append("file",signupData.file);
        console.log(formData.get("fullname"));
        // dispatch process
         const response =await dispatch(createAccount(formData));
         console.log(response);
         if(response?.payload?.data){
            navigate("/");
         }
         setSignUpDetails({
            fullname: "",
            email: "",
            phoneNumber: "",
            password: "",
            role: "",
            file: ""    
         })
    }

  return (
    <div>
      <Navbar/>
     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-6">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100 w-full max-w-2xl p-10 transform transition-all hover:shadow-3xl">
      <form onSubmit={onFormSubmit}>
        <div className="mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
           Create Account
          </h1>
        </div>
        
        <div className="space-y-6">
          {/* Full Name */}
          <div className="group">
            <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-purple-600">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullname"
              value={signupData.fullname}
              onChange={handleUserInput}
              placeholder="Enter your full name"
              className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-200 placeholder:text-gray-400"
            />
          </div>

          {/* Email */}
          <div className="group">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-purple-600">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={signupData.email}
              onChange={handleUserInput}
              placeholder="your.email@example.com"
              className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-200 placeholder:text-gray-400"
            />
          </div>

          {/* Phone Number */}
          <div className="group">
            <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-purple-600">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={signupData.phoneNumber}
              onChange={handleUserInput}
              placeholder="Enter your phone number"
              className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-200 placeholder:text-gray-400"
            />
          </div>

          {/* Password */}
          <div className="group">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-purple-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={signupData.password}
              onChange={handleUserInput}
              placeholder="Create a strong password"
              className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-200 placeholder:text-gray-400"
            />
          </div>

          {/* User Type and Profile Upload */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Radio Buttons */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Account Type
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl cursor-pointer transition-all hover:bg-purple-50 border-2 border-transparent has-[:checked]:border-purple-500 has-[:checked]:bg-purple-50">
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={signupData.role === 'student'}
                    onChange={handleUserInput}
                    className="w-5 h-5 text-purple-600 border-gray-300 focus:ring-purple-500"
                  />
                  <span className="text-sm font-medium text-gray-900">Student</span>
                </label>
                
                <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl cursor-pointer transition-all hover:bg-purple-50 border-2 border-transparent has-[:checked]:border-purple-500 has-[:checked]:bg-purple-50">
                  <input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={signupData.role === 'recruiter'}
                    onChange={handleUserInput}
                    className="w-5 h-5 text-purple-600 border-gray-300 focus:ring-purple-500"
                  />
                  <span className="text-sm font-medium text-gray-900">Recruiter</span>
                </label>
              </div>
            </div>

            {/* File Upload */}
            <div className="space-y-3">
              <label htmlFor="profile" className="block text-sm font-semibold text-gray-700 mb-3">
                Profile Picture
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="profile"
                  name="file"
                  onChange={handleImage}
                  className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 file:cursor-pointer cursor-pointer text-sm text-gray-600"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            // onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Create Account
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-600 hover:text-purple-700 font-semibold hover:underline transition-colors">
              Sign In
            </Link>
          </p>
        </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Signup
