import React, { useEffect, useState } from "react";
import { User, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUserProfile, logoutUser } from "../../Redux/Slices/AuthSlice";
import { getAllJobs } from "../../Redux/Slices/JobSlice";

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const {isLoggedIn} = useSelector((state) => state.auth);
  console.log(isLoggedIn);
    const user = useSelector((state) => state.auth?.userProfile);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  
 async function handleLogout() {
  await dispatch(logoutUser());
  navigate("/");
}
  async function fetchUserProfile(){
    await dispatch(getUserProfile());

  }
  async function fetchAlljobs(){
    await dispatch(getAllJobs(""));
  }
    
  useEffect(() =>{
    fetchUserProfile();
    fetchAlljobs()
  },[dispatch]);

  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="text-2xl font-bold">
          <span className="text-black">Job</span>
          <span className="text-orange-500">Portal</span>
        </div>

        {/* Menu */}
        <ul className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
         {
          user && user.role=='recruiter'?(
            <>
             <Link to="/admin/companies"><li className="hover:text-black cursor-pointer">Companies</li></Link>
          <Link to="/admin/jobs"><li className="hover:text-black cursor-pointer">Jobs</li></Link>
          
            </>
          ):(
            <>
             <Link to="/"><li className="hover:text-black cursor-pointer">Home</li></Link>
          <Link to="/jobs"><li className="hover:text-black cursor-pointer">Jobs</li></Link>
          <Link onClick={fetchAlljobs} to="/browser"><li className="hover:text-black cursor-pointer">Browse</li></Link>
            </>
          )
         }
        </ul>

        {/* Auth Buttons or Profile */}
        <div className="flex items-center space-x-4">
          {!isLoggedIn ? (
            <>
              <button className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition">
               <Link to="/login">Login</Link>
              </button>
              <button className="px-5 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition cursor-pointer">
               <Link to="/signup">Signup</Link>
              </button>
            </>
          ) : (
            <div className="relative">
              {/* Profile Avatar */}
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-12 h-12 rounded-full overflow-hidden border-2 border-purple-500 hover:border-purple-600 transition cursor-pointer"
              >
                <img
                  src={user?.profile?.profilePhoto}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 py-4 px-4 z-50">
                  {/* Profile Header */}
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-purple-500">
                      <img
                        src={user?.profile?.profilePhoto}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{user?.fullname}</h3>
                      <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet.</p>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="space-y-2">
                    {user && user.role==='student' && (
                      <><button className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition">
                      <User className="w-5 h-5" />
                      <span className="font-medium"><Link to="/profile">View Profile</Link></span>
                    </button>
                      </>
                    )}
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md transition">
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;