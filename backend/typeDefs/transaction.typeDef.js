const transactionTypeDef = `#graphql
    type Transaction{
        _id: ID!
        userId: ID!
        description: String!
        paymentType: PaymentType!
        category: String!
        amount: Float!
        location: String!
        date: String!
        user:User!
        age:String!
    }
    enum PaymentType{
        CASH
        CARD
    }
    type CategoryStatistic{
        category:String!
        totalAmount:Float!
    }
    type TransactionsResult{
        items: [Transaction!]!
        count: Int
    }
    type Query{
        transactions(skip:Int,limit:Int): TransactionsResult!
        transaction(transactionId:ID!): Transaction
        categoryStatistics: [CategoryStatistic!]
    }
    type Mutation{
        createTransaction(payload:CreateTransactionPayload!): Transaction!
        updateTransaction(transactionId:ID!,payload:UploadTransactionPayload!): Transaction
        deleteTransaction(transactionId:ID!): Transaction
    }
    input CreateTransactionPayload{
        description: String!
        paymentType: PaymentType!
        category: String!
        amount: Float!
        location: String!
        date: String!
    }
    input UploadTransactionPayload{
        description: String
        paymentType: PaymentType
        category: String
        amount: Float
        location: String
        date: String
    }
`;
export default transactionTypeDef;