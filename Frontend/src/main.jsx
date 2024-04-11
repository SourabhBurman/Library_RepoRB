import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./Context/ContextProvider.jsx";
import {ApolloClient,InMemoryCache, ApolloProvider} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://fantastic-apron-bat.cyclic.app/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ApolloProvider>
  </BrowserRouter>
);
