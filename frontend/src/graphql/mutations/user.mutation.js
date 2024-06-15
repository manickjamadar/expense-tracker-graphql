import { gql } from "@apollo/client";

export const SIGN_UP = gql`
    mutation SignupUser($payload: SignupPayload!){
        signUp(payload: $payload) {
            _id
            gender
            name
            password
            profilePicture
            username
        }
    }
`;
export const LOGIN = gql`
    mutation LoginUser($payload: LoginPayload!){
        login(payload: $payload) {
            _id
            name
            username
            profilePicture
            gender
        }
    }
`;
export const LOGOUT = gql`
    mutation LogoutUser{
        logout {
            message
        }
    }
`;