import { mergeTypeDefs } from "@graphql-tools/merge";
import userTypeDef from "./user.typedef.js";
import transactionTypeDef from "./transaction.typedef.js";

const rootTypeDefs = mergeTypeDefs([userTypeDef,transactionTypeDef]);

export default rootTypeDefs;