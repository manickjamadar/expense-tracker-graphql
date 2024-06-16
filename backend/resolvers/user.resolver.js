import { users } from "../data.js";
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import resolverErrorHandler from "../utils/resolverErrorHandler.js";
import Transaction from "../models/transaction.model.js";
const profilePictureTypeMap = {
    "MALE":"boy",
    "FEMALE":"girl"
}
const userResolver = {
    Query:{
        user:async (_,{userId})=>{
            try {
                return await User.findById(userId);
            } catch (error) {
                resolverErrorHandler(error,"user")
            }
        },
        authUser:async(_,__,context)=>{
           try {
             const user = await context.getUser();
             return user;
           } catch (error) {
            resolverErrorHandler(error,"authUser")
           }
        }
    },
    Mutation:{
        logout:async(_,__,context)=>{
            try {
                await context.logout();
                context.req.session.destroy(err=>{
                    if(err){
                        throw err;
                    }
                });
                context.res.clearCookie("connect-sid");
                return {message:"Loggged out successfully"}
            } catch (error) {
                resolverErrorHandler(error,"logout");
            }
          
        },
        login:async(_,{payload},context)=>{
            try {
                const {username,password} = payload;
                const {user} = await context.authenticate("graphql-local",{username,password});
                await context.login(user);
                return user;
            } catch (error) {
                resolverErrorHandler(error,"login")
            }
        },
        signUp:async(_,{payload},context)=>{
            try {
                const {username,name,gender,password} = payload;
                if (!username || !name || !password || !gender) {
                    throw new Error("All fields are required");
                }
                const existingUser = await User.findOne({username});
                if(existingUser){
                    throw new Error("User already exists");
                }
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password,salt);
                
                const profilePicture = `https://avatar.iran.liara.run/public/${profilePictureTypeMap[gender]}?username=${username}`;
                const newUser = new User({
                    username,
                    name,
                    gender,
                    profilePicture,
                    password:hashedPassword
                });
                await newUser.save();
                await context.login(newUser);
                return newUser;
            } catch (error) {
                resolverErrorHandler(error,"signUp");
            }
            
        }
    },
    User:{
        transactions:async(parent)=>{
            const transactions = await Transaction.find({userId:parent._id});
            return transactions;
        }
    }
}
export default userResolver;