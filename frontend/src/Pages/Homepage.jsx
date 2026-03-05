import React, { useEffect } from 'react'
import Navbar from '../components/shared/Navbar'
import CategoryCaroucscale from '../components/CategoryCarouscale'
import LatestJobs from '../components/LatestJob'
import HeroSection from '../components/Herosection'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'



const Homepage = () => {
    const user=useSelector((state)=>state?.auth?.userProfile);
    const navigate=useNavigate();
    useEffect(()=>{
      if(user && user?.role==='recruiter'){
        navigate("/admin/companies");
      }
    })


  
  return (
    <div>
      <Navbar/>
    <HeroSection/>
    <CategoryCaroucscale/>
    <LatestJobs />
    </div>
  )
}

export default Homepage
