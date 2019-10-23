import React from "react";
import { render } from "react-dom";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import Dog from './dog';

const client = new ApolloClient({
  uri: `http://localhost:4000/`
});

const App = () => (
    <ApolloProvider client={client}>
      <Dog />
    </ApolloProvider>
);

render(<App />, document.getElementById("root"));
