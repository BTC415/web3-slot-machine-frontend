import React from "react";
import "tailwindcss/tailwind.css";
import "../components/custom.scss";
import AppProvider from "../context/AppContext";
import { Mainnet, ChainId, DAppProvider } from "@usedapp/core";
function MyApp({ Component, pageProps }) {
  const config = {
    readOnlyChainId: Mainnet.chainId,
  };
  return (
    <>
      <DAppProvider config={config}>
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
      </DAppProvider>
    </>
  );
}

export default MyApp;
