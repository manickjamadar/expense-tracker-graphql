import { gql } from "@apollo/client";

export const CREATE_TRANSACTION = gql`
    mutation CreateTransaction($payload: CreateTransactionPayload!) {
        createTransaction(payload: $payload) {
            _id
            amount
            category
            date
            description
            location
            location
            paymentType
            userId
        }
    }
`;
export const UPDATE_TRANSACTION = gql`
    mutation UpdateTransaction($transactionId:ID!,$payload:UploadTransactionPayload!){
        updateTransaction(transactionId:$transactionId,payload:$payload){
            _id
            amount
            category
            date
            description
            location
            paymentType
            userId
        }
    }
`;
export const DELETE_TRANSACTION = gql`
    mutation DeleteTransaction($transactionId:ID!){
        deleteTransaction(transactionId:$transactionId){
            _id
        }
    }
`;