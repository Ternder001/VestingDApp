import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";

export const SUPPORTED_CHAIN = 11155111;

// Set chains
const sepolia = {
  chainId: SUPPORTED_CHAIN,
  name: "sepolia",
  currency: "ETH",
  explorerUrl: "https://https://sepolia.infura.io",
  rpcUrl: import.meta.env.VITE_rpc_url,
};

// Create a metadata object
const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "https://mywebsite.com", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};

// Create a Web3Modal instance
export const configureWeb3Modal = () => {
  createWeb3Modal({
    ethersConfig: defaultConfig({ metadata }),
    chains: [sepolia],
    projectId: import.meta.env.VITE_projectId,
    enableAnalytics: false, // Optional - defaults to your Cloud configuration
  });
};
