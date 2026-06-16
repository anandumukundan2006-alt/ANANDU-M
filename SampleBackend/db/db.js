import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const connection = await mongoose.connect('mongodb://localhost:27017/tracker')
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;