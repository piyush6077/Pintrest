import mongoose, { Connection } from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MongoURI || "");
        console.log(`MONGO-DB : Started at ${conn.connection.host}`);
    } catch (err) {
        console.error(err);
    }
};

export default connectDB;
