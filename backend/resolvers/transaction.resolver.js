import Transaction from "../models/transaction.model.js";
import resolverErrorHandler from "../utils/resolverErrorHandler.js";
import User from "../models/user.model.js";
import calculateAge from "../utils/calculateAge.js";
const transactionResolver = {
  Query: {
    transactions: async (_, { skip, limit }, context, info) => {
      // console.log("transactionsInfo: ",info);
      //TODO: add aggregation to lookup user
      const user = await context.getUser();
      if (!user) {
        throw new Error("Unauthorized Request");
      }
      const transactions = await Transaction.find({ userId: user._id })
        .skip(skip || 0)
        .limit(limit || 10);
      return { items: transactions, count: transactions.length };
    },
    transaction: async (_, { transactionId }, context) => {
      //TODO: add aggregation to lookup user
      const user = await context.getUser();
      if (!user) {
        throw new Error("Unauthorized Request");
      }
      const transaction = await Transaction.findById(transactionId);
      return transaction;
    },
    categoryStatistics: async (_, __, context) => {
      //TODO: Do it by aggregation
      const user = await context.getUser();
      if (!user) {
        throw new Error("Unauthorized Request");
      }
      const obj = await Transaction.aggregate([
        {
          $group: {
            _id: "$category",
            totalAmount: {
              $sum: "$amount",
            },
          },
        },
        {
          $addFields: {
            category: "$_id",
          },
        },
        {
          $project: {
            _id: 0,
          },
        },
      ]);
      console.log(obj);
      return obj;
    },
  },
  Mutation: {
    createTransaction: async (_, { payload }, context) => {
      try {
        const user = await context.getUser();
        if (!user) {
          throw new Error("Unauthorized Request");
        }
        const newTransaction = new Transaction({
          ...payload,
          userId: user._id,
        });
        await newTransaction.save();
        return newTransaction;
      } catch (error) {
        resolverErrorHandler(error, "createTransaction");
      }
    },
    updateTransaction: async (_, { transactionId, payload }, context) => {
      try {
        const user = await context.getUser();
        if (!user) {
          throw new Error("Unauthorized Request");
        }
        const updatedTransaction = await Transaction.findByIdAndUpdate(
          transactionId,
          { ...payload },
          { new: true }
        );
        return updatedTransaction;
      } catch (error) {
        resolverErrorHandler(error, "updateTransaction");
      }
    },
    deleteTransaction: async (_, { transactionId }, context) => {
      try {
        const user = await context.getUser();
        if (!user) {
          throw new Error("Unauthorized Request");
        }
        const deletedTransaction = await Transaction.findByIdAndDelete(
          transactionId
        );
        return deletedTransaction;
      } catch (error) {
        resolverErrorHandler(error, "deleteTransaction");
      }
    },
  },
  Transaction: {
    user: async (parent, _, context) => {
      return context.userLoader.load(parent.userId);
    },
    age: async (parent) => {
      return calculateAge(new Date(+parent.date));
    },
  },
};
export default transactionResolver;
