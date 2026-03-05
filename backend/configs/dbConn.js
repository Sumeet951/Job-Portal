import mongoose from "mongoose";
const connectToDB=async()=>{
    try{
        const{connection}=await mongoose.connect(
           process.env.MONGO_URI || `mongodb://127.0.0.1:27017/jobPortal` 
        )
       if (connection) {
      console.log(`Connected to MongoDB: ${connection.host}`);
    } 
    }
    catch(err){
        console.log(error);
        process.exit(1);
    }
}
export default connectToDB;