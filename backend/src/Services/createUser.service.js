import User from "../Model/userSchema.js"
import { ConflictError } from "../Utils/errorHandler.js";
import jsonwebtoken from "jsonwebtoken";

export const createUser = async(username, email, password) => {

    const user = await User.findOne({email});

    if(user) throw new ConflictError("Email already in use.")

    const newUser = new User({
        username, email, password
    });
    await newUser.save();
    const token = jsonwebtoken.sign({ email: newUser.email, id: newUser._id }, process.env.JWT_SECRET, {expiresIn: "5m"});
    
    return token;
}