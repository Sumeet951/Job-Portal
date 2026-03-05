import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosInstance from '../../Helpers/axiosInstance';
import toast from 'react-hot-toast';
const initialState = {
    appliedjob:[],
    allappliedjob:[],
    getapplicant:[],
};
export const applyjob=createAsyncThunk("/job/apply",async(id)=>{
    try{
        const response=axiosInstance.get(`application/apply/${id}`);
        toast.promise(response,{
            loading:"Applied Job",
             success:(data)=>{
                return data?.data?.message;
            }
        })
        return await response;
    }
    catch(error){
        toast.error(error?.response?.data?.message);

    }

})
export const getAllAppliedJob=createAsyncThunk("/job/get",async()=>{
    try{
        const response=axiosInstance.get(`/application/get`);
        toast.promise(response,{
            loading:"loading..",
            // success:(data)=>{
            //     return data?.data?.message;
            // }
        })
        return await response;

    }
    catch(error){
        toast.error(error?.response?.data?.message);
    }
})
export const getApplicants=createAsyncThunk("/job/get/applicant",async (id)=>{
    try{
        const response=axiosInstance.get(`/application/${id}/applicants`);
        toast.promise(response,{
            loading:"loading...",
            success:(data)=>{
                return data?.data?.message
            }
        })
        return await response;
    }
    catch(error){
        toast.error(error?.response?.data?.message);
    }
})
export const updateStatus=createAsyncThunk("/job/updates",async ({data,id})=>{
    console.log(data);
    try{
        const response=axiosInstance.post(`/application/status/${id}/update`,data);
        toast.promise(response,{
            loading:"loading...",
            success:(data)=>{
                return data?.data?.message;
            }
        })
        return await response;

    }
    catch(error){
        toast.error(error?.response?.data?.message);
    }
})
const ApplicationSlice=createSlice({
    name:'application',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(applyjob.fulfilled,(state,action)=>{
                    state.appliedjob=action?.payload?.data?.user;
                })
        .addCase(getAllAppliedJob.fulfilled,(state,action)=>{
            state.allappliedjob=action?.payload?.data?.application;
        })
        .addCase(getApplicants.fulfilled,(state,action)=>{
            state.getapplicant=action?.payload?.data?.job?.application;
        })
        
        
    }
});
export default ApplicationSlice.reducer