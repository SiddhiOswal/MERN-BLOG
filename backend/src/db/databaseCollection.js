import mongoose from 'mongoose';
const DB_Name = "blogApplication";


const connectDB = async() => {
    try {
      const connect = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_Name}`);
      console.log("mongodb connected successfully");
    }catch(error) {
        console.log("mongodb error", error);
    }
}

export default connectDB;


