import Transaction from '../models/transaction.model.js';
import resolverErrorHandler from "../utils/resolverErrorHandler.js";

const transactionResolver = {
    Query:{
        transactions:async(_,__,context)=>{
                const user = await context.getUser();
                if(!user){
                    throw new Error("Unauthorized Request");
                }
                const transactions = await Transaction.find({userId:user._id});
                return transactions;
        },
        transaction:async(_,{transactionId},context)=>{
                const user = await context.getUser();
            if(!user){
                throw new Error("Unauthorized Request");
            }
            const transaction = await Transaction.findById(transactionId);
            return transaction;
        }
    },
    Mutation:{
        createTransaction:async(_,{payload},context)=>{
            try {
                const user = await context.getUser();
                if(!user){
                    throw new Error("Unauthorized Request");
                }
                const newTransaction = new Transaction({
                    ...payload,
                    userId: user._id
                })
                await newTransaction.save();
                return newTransaction;
            } catch (error) {
                resolverErrorHandler(error,"createTransaction");
            }
        },
        updateTransaction:async(_,{transactionId,payload},context)=>{
            try {
                const user = await context.getUser();
                if(!user){
                    throw new Error("Unauthorized Request");
                }
                const updatedTransaction = await Transaction.findByIdAndUpdate(transactionId,{...payload},{new:true});
                return updatedTransaction;
            } catch (error) {
                resolverErrorHandler(error,"updateTransaction");
            }
        },
        deleteTransaction:async(_,{transactionId},context)=>{
            try {
                const user = await context.getUser();
                if(!user){
                    throw new Error("Unauthorized Request");
                }
                const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);
                return deletedTransaction;
            } catch (error) {
                resolverErrorHandler(error,"deleteTransaction")
            }
        }
    }
}
export default transactionResolver;