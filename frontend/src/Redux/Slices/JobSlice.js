import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosInstance from '../../Helpers/axiosInstance';
import toast from 'react-hot-toast';
const initialState ={
    jobs: [],
    adminJob: [],
    job:[],
    searchQuery:""
};
export const postJob=createAsyncThunk("/job/postJob",async(data)=>{
    try{
        const response=axiosInstance.post("/job/post",data);
        console.log(data);
        toast.promise(response,{
            loading:"Posting Job...",
            success:(data)=>{
                return data?.data?.message;
            },
            error:'Failed to post job'

        })
        return await response;
    }
    catch(error){
        toast.error(error?.response?.data?.message);
    }
})
export const getAllJobs=createAsyncThunk("/job/getAllJobs",async(searchQuery="")=>{
    try{
        const response=axiosInstance.get(`/job/get?keyword=${searchQuery}`);
        console.log(await response);
        return await response;
    }
    catch(error){
        toast.error(error?.response?.data?.message);
    }
})
export const getAdminJobs=createAsyncThunk("/job/getAdminJobs",async()=>{
    try{
        const response= axiosInstance.get("/job/getadmin");
        console.log(await response);
        return await response;
    }
    catch(error){
        toast.error(error?.response?.data?.message);
    }
})
export const getJobById=createAsyncThunk("/job/getJobById",async(id)=>{
    try{
        const response=axiosInstance.get(`/job/${id}`);
        return await response;
    }
    catch(error){
        toast.error(error?.response?.data?.message);
    }
})
const JobSlice=createSlice({
    name:"job",
    initialState,
    reducers:{
        setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },

    },
    extraReducers:(builder)=>{
        builder
        .addCase(getAllJobs.fulfilled,(state,action)=>{
            console.log(action);
            state.jobs=action.payload.data.jobs;
        })
        .addCase(getAdminJobs.fulfilled,(state,action)=>{
            state.adminJob=action.payload?.data?.jobs;
        })
        .addCase(getJobById.fulfilled,(state,action)=>{
            state.job=action.payload.data.job;
        })
    }
})
export default JobSlice.reducer;