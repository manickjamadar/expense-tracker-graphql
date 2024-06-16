import { gql } from "@apollo/client";

export const GET_TRANSACTIONS = gql`
    query GetTransactions{
        transactions {
            _id
            amount
            category
            date
            description
            location
            paymentType
        }
    }
`;
export const GET_TRANSACTION = gql`
    query GetTransaction($transactionId: ID!){
        transaction(transactionId: $transactionId) {
            _id
            amount
            category
            date
            description
            location
            paymentType
        }
    }
`;
export const GET_CATEGORY_STATISTICS = gql`
    query GetCategoryStatistics {
        categoryStatistics {
            category
            totalAmount
        }
    }
`;