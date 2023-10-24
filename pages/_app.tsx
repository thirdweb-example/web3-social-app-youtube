import type { AppProps } from "next/app";
import { ThirdwebProvider, coinbaseWallet, embeddedWallet, metamaskWallet, rainbowWallet, smartWallet, trustWallet, walletConnect } from "@thirdweb-dev/react";
import "../styles/globals.css";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "mumbai";

function MyApp({ Component, pageProps }: AppProps) {
  //Set up smart wallet config
  const smartWalletConfig = {
    factoryAddress: "0xb073ab62195b46fd43ae74e86fb978f0a234d94b",
    gasless: true,
  };
  
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      activeChain={activeChain}
      supportedWallets={[
        smartWallet(embeddedWallet(), smartWalletConfig),
        metamaskWallet(),
        coinbaseWallet(),
        walletConnect(),
        rainbowWallet(),
        trustWallet(),
      ]}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
