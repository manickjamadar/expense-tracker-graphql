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
    }
    enum PaymentType{
        CASH
        CARD
    }
    type Query{
        transactions: [Transaction!]
        transaction(transactionId:ID!): Transaction!
    }
    type Mutation{
        createTransaction(payload:CreateTransactionPayload!): Transaction!
        updateTransaction(transactionId:ID!,payload:UploadTransactionPayload!): Transaction!
        deleteTransaction(transactionId:ID!): Transaction!
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