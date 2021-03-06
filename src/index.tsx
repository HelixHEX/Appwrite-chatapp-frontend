import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import {
  Provider,
  subscriptionExchange,
  createClient,
  fetchExchange,
  dedupExchange,
  defaultExchanges,
} from "urql";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { cacheExchange } from '@urql/exchange-graphcache';

// chakra ui
import {
  CSSReset,
  ThemeProvider, 
  theme,
  ColorModeProvider,
} from "@chakra-ui/core";

const { REACT_APP_SERVER_URL, REACT_APP_SERVER_SUBSCRIPTIONS } = process.env;
const subscriptionClient = new SubscriptionClient(
  REACT_APP_SERVER_SUBSCRIPTIONS!,
  {
    reconnect: true,
  }
);
const client = createClient({
  url: "http://localhost:5000/graphql",
  exchanges: [
    cacheExchange(),
    dedupExchange,
    fetchExchange,
    subscriptionExchange({
      forwardSubscription: (operation) => subscriptionClient.request(operation),
    }),
  ],
});

ReactDOM.render(
  <React.StrictMode>
    <Provider value={client}>
      <ThemeProvider theme={theme}>
        <ColorModeProvider>
          <App />
          <CSSReset />
        </ColorModeProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
