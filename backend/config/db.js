import mongoose from "mongoose";

const connectDb = async()=>{
    try {
        const result = await mongoose.connect(process.env.MONGO_URI+"/expense-tracker");
        console.log(`Mongodb connected at ${result.connection.host}`);
    } catch (error) {
        console.error(`Mongodb Connection Error: ${error}`);
        process.exit(1);
    }
}
export default connectDb;