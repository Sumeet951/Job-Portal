import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosInstance from '../../Helpers/axiosInstance';
import toast from 'react-hot-toast';
const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: (localStorage.getItem("data") || "{}"),
    userProfile: {},
};
export const createAccount=createAsyncThunk("/auth/signup",async(data)=>{
    try{
        const response=axiosInstance.post("user/register",data);
        console.log(response);
        toast.promise(response,{
            loading:"Creating Account...",
            success:(data)=>{
                return data?.data?.message;
            },
            error:'Failed to create account'


        });
        return await response;
    }
    catch(error){
        toast.error(error?.response?.data?.message);
    }
})
export const loginUser=createAsyncThunk("/auth/login",async(data)=>{
    try{
        const response=axiosInstance.post("user/login",data);
        toast.promise(response,{
            loading:"Logging In...",
            success:(data)=>{
                return data?.data?.message;
            },
            error:'Failed to login'
        });
        return await response;
    }
    catch(error){
        toast.error(error?.response?.data?.message);
    }
})
export const updateProfile = createAsyncThunk("auth/updateProfile", async (data, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.put("user/profile/update", data, {
      headers: {
        "Content-Type": "multipart/form-data", // ✔ important
      },
      withCredentials: true,
    });

    toast.promise(Promise.resolve(response), {
      loading: "Updating Profile...",
      success: response.data?.message || "Updated!",
      error: "Failed to update profile",
    });

    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return rejectWithValue(error.response.data);
  }
});

export const getUserProfile=createAsyncThunk("/auth/getUserProfile",async()=>{
    
        const response=axiosInstance.get("user/profile");
        return await response;
})
export const logoutUser=createAsyncThunk("/auth/logout",async()=>{
    try{
        const response=axiosInstance.get("user/logout");
        toast.promise(response,{
            loading:"Logging Out...",
            success:(data)=>{
                return data?.data?.message;
            },
            error:'Failed to logout'
        })
        return await response;
    }
    catch(error){
        toast.error(error?.response?.data?.message);
    }
})
const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(loginUser.fulfilled,(state,action)=>{
            localStorage.setItem("data",JSON.stringify(action?.payload?.data?.user));
            localStorage.setItem("isLoggedIn",true);
            localStorage.setItem("role",action?.payload?.data?.user?.role);
            state.isLoggedIn=true;
            state.role=action?.payload?.data?.user?.role;
            state.data=action?.payload?.data?.user;
        })
        .addCase(updateProfile.fulfilled,(state,action)=>{
       if(!action?.payload?.data?.user) return;
         localStorage.setItem("data",JSON.stringify(action?.payload?.data));
          localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", action?.payload?.user?.role);
            state.isLoggedIn = true;
            state.role = action?.payload?.data?.user?.role;
            state.data = action?.payload?.data?.user;
        })
        .addCase(logoutUser.fulfilled,(state)=>{
            localStorage.removeItem("data");
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("role");
            state.isLoggedIn=false;
            state.role="";
            state.data={};
            state.userProfile={};
        })
        .addCase(getUserProfile.fulfilled,(state,action)=>{
            state.userProfile=action?.payload?.data?.user;
        })
        
        
    }
});
export default authSlice.reducer;
