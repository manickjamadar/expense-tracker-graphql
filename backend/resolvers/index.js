import { mergeResolvers } from "@graphql-tools/merge";
import userResolver from "./user.resolver.js";
import transactionResolver from "./transaction.resolver.js";

const rootResolvers = mergeResolvers([userResolver,transactionResolver]);
export default rootResolvers;