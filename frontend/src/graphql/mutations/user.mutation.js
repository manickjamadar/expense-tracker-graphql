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