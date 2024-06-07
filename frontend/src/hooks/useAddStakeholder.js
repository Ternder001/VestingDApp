import { useCallback } from "react";
import { isSupportedChain } from "../utils";
import { isAddress, ethers } from "ethers";
import { getProvider } from "../constants/providers";
import { getContract } from "../constants/contracts";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";

const useAddStakeholder = (address, stakeType, vestingPeriod) => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  return useCallback(async () => {
    if (!isSupportedChain(chainId)) return console.error("Wrong network");
    if (!isAddress(address)) return console.error("Invalid address");

    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();

    const contract = getContract(signer);
    try {
      const tx = await contract.addStakeholder(
        address,
        stakeType,
        vestingPeriod
        //ethers.utils.parseUnits(vestingPeriod, "wei")
      );
      await tx.wait();
      console.log("Stakeholder added successfully");
      alert("Stakeholder added successfully");
    } catch (error) {
      console.error("Error adding stakeholder", error);
    }
  }, [address, stakeType, vestingPeriod]);
};

export default useAddStakeholder;
