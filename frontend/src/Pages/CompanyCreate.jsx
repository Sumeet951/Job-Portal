import React, { useEffect, useState } from 'react';
import Navbar from '../components/shared/Navbar';
import { useDispatch} from 'react-redux';
import { getCompanies, getCompanyById, registerCompany } from '../Redux/Slices/CompanySlice';
import { useNavigate } from 'react-router-dom';

const CompanyCreate = () => {
  const [companyName, setCompanyName] = useState({
    name:"",
  });
  const dispatch=useDispatch();
  const navigate=useNavigate();


  // const handleCancel = () => {
  //   console.log('Cancel clicked');
  //   // Add your cancel logic here
  // };

  const handleContinue = async () => {
    console.log('Company name:', companyName);
    // Add your continue logic here
    const response=await dispatch(registerCompany(companyName));
    console.log(response);
    if(response.payload?.data?.success){
      const companyId=response.payload?.data?.company?._id
      dispatch(getCompanyById(companyId));
      navigate(`/admin/companies/${companyId}`);
    }
    setCompanyName("");
  };
  const onHandleChange=(e)=>{
    const {name,value}=e.target;
        setCompanyName({
            ...companyName,
            [name]:value
        })
  }
  async function fetchCompanies() {
    await dispatch(getCompanies());
    
  }
  useEffect(()=>{
    fetchCompanies();

  },[dispatch]);
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar/>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your Company Name
          </h1>
          <p className="text-gray-500">
            What would you like to give your company name? you can change this later.
          </p>
        </div>

        {/* Form */}
       
        <div className="max-w-3xl">
          <div className="mb-6">
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-900 mb-2">
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="name"
              value={companyName.name}
              onChange={onHandleChange}
              placeholder="JobHunt, Microsoft etc."
              className="w-full px-4 py-3 border-2 border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button onClick={()=>navigate(-1)} className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button onClick={handleContinue} className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
              Continue
            </button>
          </div>
          {/* Buuton end */}
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;