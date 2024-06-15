import { users } from "../data.js";

const userResolver = {
    Query:{
        users:()=>{
            return [...users]
        },
        user:(parent,args,context,info)=>{
            const {userId} = args;
            return users.find(user=>user._id === userId)
        }
    },
    Mutation:{}
}
export default userResolver;