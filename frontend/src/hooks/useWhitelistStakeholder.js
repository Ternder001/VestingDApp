import { useCallback } from "react";
import { isSupportedChain } from "../utils";
import { isAddress } from "ethers";
import { getProvider } from "../constants/providers";
import { getContract } from "../constants/contracts";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";

const useWhitelistStakeholder = (address) => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  return useCallback(async () => {
    if (!isSupportedChain(chainId)) return console.error("Wrong network");
    if (!isAddress(address)) return console.error("Invalid address");
    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();

    try {
      const contract = getContract(signer);
      const tx = await contract.whitelistStakeholder(address);
      await tx.wait();
      console.log("Stakeholder whitelisted successfully");
      alert("Stakeholder whitelisted successfully");
    } catch (error) {
      console.error("Error whitelisting stakeholder", error);
    }
  }, [address]);
};

export default useWhitelistStakeholder;
