require("dotenv").config({ path: "./.env" });
const { app } = require("./app");
const { ConnectToDB } = require("./db/db");
const  { ApolloServer } = require("apollo-server-express");
const { expressMiddleware } = require("@apollo/server/express4");
const { typeDefs, resolvers } = require("./graphql/index");
const { authentication } = require("./middleware/auth.middleware");

const PORT = process.env.PORT || 8888;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }) => {
    const user = await authentication(req, res).catch((err) => console.log(err));
    return { req, res, user };
  },
});

ConnectToDB()
  .then(async () => {
    await server.start();
    server.applyMiddleware({ app });
    app.listen(PORT, () => {
      console.log(`Server is live on port no. ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Mongo DB Connection Failed", error);
  });
