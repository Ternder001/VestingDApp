import { useCallback } from "react";
import { isSupportedChain } from "../utils";
import { getProvider } from "../constants/providers";
import { getContract } from "../constants/contracts";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";

const useClaimTokens = (orgOwner) => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  return useCallback(async () => {
    if (!isSupportedChain(chainId)) return console.error("Wrong network");
    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();

    try {
      const contract = getContract(signer);
      const tx = await contract.claimTokens(orgOwner);
      await tx.wait();
      console.log("Tokens claimed successfully");
      alert("Tokens claimed successfully");
    } catch (error) {
      console.error("Error claiming tokens", error);
    }
  }, [orgOwner]);
};

export default useClaimTokens;
