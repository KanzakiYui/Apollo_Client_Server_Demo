import React from "react";
import { render } from "react-dom";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import AllDogsOptions from './all-dogs-options';

const client = new ApolloClient({
  uri: `http://localhost:4000/`
});

const App = () => (
    <ApolloProvider client={client}>
      <AllDogsOptions />
    </ApolloProvider>
);

render(<App />, document.getElementById("root"));
