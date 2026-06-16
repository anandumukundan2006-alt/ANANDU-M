import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true, minlength: 8 },
    dob: { type: String, required: false },
    phone: { type: String, required: false, minlength: 10, maxlength: 10 },
    username: { type: String, required: true }
})

const User = mongoose.model('users', userSchema)

export default User