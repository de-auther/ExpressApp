import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
id: {
    type: mongoose.Schema.Types.ObjectId,
},
username: {
    type: String,
    required:true,
    minlength:3,
    maxlength:30,
    unique:true
},
email: {
    type: String,
    required:true,
    unique:true,
    match:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
},
password: {
    type: String,
    required:true,
    minlenght:6
},
phone_number: {
    type: Number,
    required:true,
    unique:true
}
});


const User = mongoose.model("User", userSchema);


export default User;