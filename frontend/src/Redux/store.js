import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/AuthSlice";
import jobReducer from"./Slices/JobSlice";
import applicationReducer from "./Slices/ApplicationSlice"
import companyReducer from "./Slices/CompanySlice"
const store=configureStore({
    reducer:{
        auth:authReducer,
        job:jobReducer,
        application:applicationReducer,
        company:companyReducer

    },
    devTools:true
});
export default store;