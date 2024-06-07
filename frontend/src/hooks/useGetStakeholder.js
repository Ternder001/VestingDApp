import { useCallback, useState } from "react";
import { isSupportedChain } from "../utils";
import { getProvider } from "../constants/providers";
import { getContract } from "../constants/contracts";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";

const useGetStakeholder = (orgOwner, stakeholderAddressInfo) => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  const [stakeTypeInfo, setStakeType] = useState(null);
  const [vestingPeriodInfo, setVestingPeriod] = useState(null);
  const [whitelistedInfo, setWhitelisted] = useState(null);

  const fetchStakeholder = useCallback(async () => {
    if (!isSupportedChain(chainId)) return console.error("Wrong network");
    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();

    try {
      const contract = getContract(signer);
      const info = await contract.getStakeholder(
        orgOwner,
        stakeholderAddressInfo
      );
      setStakeType(info.stakeType);
      setVestingPeriod(info.vestingPeriod);
      setWhitelisted(info.whitelisted);
    } catch (error) {
      console.error("Error fetching stakeholder info", error);
    }
  }, [orgOwner, stakeholderAddressInfo]);

  return {
    stakeTypeInfo,
    vestingPeriodInfo,
    whitelistedInfo,
    fetchStakeholder,
  };
};

export default useGetStakeholder;
