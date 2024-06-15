import dotenv from 'dotenv';
dotenv.config();
// npm install @apollo/server express graphql cors
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import rootTypeDefs from "./typeDefs/index.js";
import rootResolvers from "./resolvers/index.js";
import express from 'express';
import http from 'http';
import cors from 'cors';
import connectDb from './config/db.js';
import passport from 'passport';
import session from "express-session";
import connectMongo from "connect-mongodb-session";
import configurePassport from './config/passport.config.js';
import { buildContext } from 'graphql-passport';
configurePassport();


// Required logic for integrating with Express
const app = express();
// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);
const MongoDBStore = connectMongo(session);
const store = new MongoDBStore({
  url: process.env.MONGO_URI,
  collection:"sessions"
});
store.on("error", (err) => console.log(err));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized:false,
  cookie:{
    maxAge:1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  },
  store
}));
app.use(passport.initialize());
app.use(passport.session())
// Same ApolloServer initialization as before, plus the drain plugin
// for our httpServer.
const server = new ApolloServer({
  typeDefs: rootTypeDefs,
  resolvers: rootResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
// Ensure we wait for our server to start
await server.start();

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
  '/',
  cors({
		origin: "http://localhost:3000",
		credentials: true,
	}),
  express.json(),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
    context: async ({ req,res }) => buildContext({req,res}),
  }),
);

// Modified server startup
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/`);
await connectDb();