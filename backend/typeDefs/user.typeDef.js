const userTypeDef = `#graphql
    type User{
        _id: ID!
        username: String!
        name: String!
        password: String!
        profilePicture: String
        gender: String!
    }
    type Query{
        users: [User!]
        authUser: User
        user(userId: ID!): User
    }
    type Mutation{
        signUp(payload:SignupPayload!): User!
        login(payload:LoginPayload!): User!
        logout: LogoutResponse
    }
    input SignupPayload{
        username: String!
        name: String!
        gender: String!
        profilePicture:String
        password:String!
    }
    input LoginPayload{
        username: String!
        password: String!
    }
    type LogoutResponse{
        message: String!
    }
`;

export default userTypeDef;