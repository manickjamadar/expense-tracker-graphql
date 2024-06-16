import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import passport from "passport";
import session from "express-session";
import connectMongo from "connect-mongodb-session";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import configurePassport from './config/passport.config.js';
import { buildContext } from "graphql-passport";
import rootTypeDefs from './typeDefs/index.js';
import rootResolvers from './resolvers/index.js';
import connectDB from './config/db.js';
import DataLoader from "dataloader";
import User from "./models/user.model.js";
import mongoose from "mongoose";
dotenv.config();
configurePassport();


// const __dirname = path.resolve();
const app = express();

const httpServer = http.createServer(app);

const MongoDBStore = connectMongo(session);

const store = new MongoDBStore({
	uri: process.env.MONGO_URI,
	collection: "sessions",
});

store.on("error", (err) => console.log(err));

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false, // this option specifies whether to save the session to the store on every request
		saveUninitialized: false, // option specifies whether to save uninitialized sessions
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 7,
			httpOnly: true, // this option prevents the Cross-Site Scripting (XSS) attacks
		},
		store: store,
	})
);

app.use(passport.initialize());
app.use(passport.session());

const server = new ApolloServer({
	typeDefs: rootTypeDefs,
	resolvers: rootResolvers,
	plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  formatError:(formattedError,error)=>{
    console.log(error.message);
    return {message:error.message || "Something went wrong"}
  },
});

// Ensure we wait for our server to start
await server.start();

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
	"/graphql",
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	}),
	express.json(),
	// expressMiddleware accepts the same arguments:
	// an Apollo Server instance and optional configuration options
	expressMiddleware(server, {
		context: async ({ req, res }) => {
			const userLoader = new DataLoader(async(userIds)=>{
				const users = await User.find({"_id":{$in:[...userIds]}});
				const usersMap = {};
				users.forEach(user=>{
					usersMap[user._id.toHexString()] = user;
				});
				console.log(usersMap);
				const resultUsers = userIds.map(userId=>usersMap[userId]);
				console.log("resultUsers: ",resultUsers);
				return resultUsers;
			});
			return buildContext({ req, res, userLoader });
		},
	})
);

// npm run build will build your frontend app, and it will the optimized version of your app
// app.use(express.static(path.join(__dirname, "frontend/dist")));

// app.get("*", (req, res) => {
// 	res.sendFile(path.join(__dirname, "frontend/dist", "index.html"));
// });

// Modified server startup
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
await connectDB();

console.log(`🚀 Server ready at http://localhost:4000/graphql`);