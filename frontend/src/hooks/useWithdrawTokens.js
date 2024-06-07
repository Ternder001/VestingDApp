import { useCallback } from "react";
import { isSupportedChain } from "../utils";
import { getProvider } from "../constants/providers";
import { getContract } from "../constants/contracts";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";

const useWithdrawTokens = (amount) => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  return useCallback(async () => {
    if (!isSupportedChain(chainId)) return console.error("Wrong network");
    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();

    try {
      const contract = getContract(signer);
      const tx = await contract.withdraw(
        ethers.utils.parseUnits(amount, "wei")
      );
      await tx.wait();
      console.log("Tokens withdrawn successfully");
      alert("Tokens withdrawn successfully");
    } catch (error) {
      console.error("Error withdrawing tokens", error);
    }
  }, [amount]);
};

export default useWithdrawTokens;
