import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosInstance from '../../Helpers/axiosInstance';
import toast from 'react-hot-toast';
import Companies from '../../components/admin/Companies';
const initialState = {
    companies:[],
    company:[]
};
/* ================= REGISTER COMPANY ================= */
export const registerCompany=createAsyncThunk("/company/register",async(data)=>{
    try{
        const response=axiosInstance.post("/company/register",data);
        toast.promise(response,{
            loading:"Registering company",
            success:(data)=>{
                return data?.data?.message;
            },
            error:"Failed to register company"
        });
        return await response;
    }
    catch(error){
        toast.error(error?.response?.data?.message);
    }
});
/* ================= GET ALL COMPANIES ================= */
export const getCompanies=createAsyncThunk("/company/get",async()=>{
    try{
        const response= axiosInstance.get("/company/get");
        return await response;
    }
    catch(error){
        toast.error(error?.response?.data?.message);

    }
});
/* ================= GET COMPANY BY ID ================= */
export const getCompanyById=createAsyncThunk("/company/getById",async(id)=>{
    try{
        console.log(id);
        const response=await axiosInstance.get(`/company/get/${id}`);
        console.log(response.data)
        return  response.data;
    }
    catch(error){
        toast.error(error?.response?.data?.message);
    }
});
/* ================= UPDATE COMPANY ================= */
export const updateCompany=createAsyncThunk("/company/update",async({id,data})=>{
    try{
        console.log(id,data);
        const response=axiosInstance.put(`/company/update/${id}`,data);
        console.log(response)
        toast.promise(response,{
            loading: "Updating company...",
        success: (res) => res?.data?.message,
        error: "Failed to update company",
        });
        return await response;
    }
    catch(error){
        toast.error(error?.response?.data?.message);
    }
})

const CompanySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* get all companies */
      .addCase(getCompanies.fulfilled, (state, action) => {
        state.companies = action?.payload?.data?.companies;
      })
      /* get company by id */
      .addCase(getCompanyById.fulfilled, (state, action) => {
        state.company = action?.payload?.company;
      })
      /* update company */
      .addCase(updateCompany.fulfilled, (state, action) => {
        state.company = action?.payload?.company;
      });
  }
});
export default CompanySlice.reducer;