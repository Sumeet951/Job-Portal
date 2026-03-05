import React from 'react'
import Navbar from '../components/shared/Navbar';
import  { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Briefcase, GraduationCap } from 'lucide-react';
import toast from 'react-hot-toast';
import { loginUser } from '../Redux/Slices/AuthSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginData,setLoginData]=useState({
    email:"",
    password:"",
    role:""
  })
   function handleUserInput(e){
        const {name,value}=e.target;
        setLoginData({
            ...loginData,
            [name]:value
        })
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!loginData.email || !loginData.password){
      toast.error("Please fill all the fields");
      return;
    }
    //api call
    // dispatch process
    console.log(loginData);
    const response=await dispatch(loginUser(loginData));
    if(response.payload?.data){
      navigate("/");
    }
    setLoginData({
      email:"",
      password:"",
      role:""
    })
    // Handle login logic here
  };

  return (
    <div>
      <Navbar/>
       <div className="min-h-screen   flex items-center justify-center p-4">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
    <form onSubmit={handleSubmit}>
      {/* Login Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 transform transition-all duration-300 hover:shadow-purple-500/20">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl mb-4 shadow-lg">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-500 mt-2">Sign in to continue to JobPortal</p>
          </div>

          <div className="space-y-6">
            {/* Email Input */}
           
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleUserInput}
                  placeholder="patel@gmail.com"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:bg-white focus:outline-none transition-all duration-200"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={loginData.password}
                  onChange={handleUserInput}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:bg-white focus:outline-none transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* User Type Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">I am a</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setLoginData({...loginData, role: 'student'})}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                    loginData.role === 'student'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <GraduationCap className="w-5 h-5" />
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => setLoginData({...loginData, role: 'recruiter'})}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                    loginData.role === 'recruiter'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Briefcase className="w-5 h-5" />
                  Recruiter
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              // onClick={handleSubmit}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Login
            </button>

            {/* Signup Link */}
            <div className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="/signup" className="font-semibold text-purple-600 hover:text-purple-700 transition-colors">
                Sign up
              </a>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-20 blur-2xl"></div>
      </div>
    </form>
    </div>
    </div>
  )
}

export default Login
